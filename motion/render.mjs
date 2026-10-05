// hero-typo.html을 프레임 단위로 캡처해 메인 비주얼 영상(mp4)과 포스터(jpg)를 만든다.
//
// 준비: 렌더링용 도구는 프로젝트 의존성에 넣지 않고 별도 폴더에 설치
//   mkdir -p /tmp/render-deps && cd /tmp/render-deps && npm i playwright-core ffmpeg-static
// 실행:
//   RENDER_DEPS=/tmp/render-deps node motion/render.mjs            (4종 전부)
//   RENDER_DEPS=/tmp/render-deps node motion/render.mjs dark landscape   (일부만)
// 결과: public/videos/hero-{light|dark}-{landscape|portrait}.mp4 / .jpg
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const require = createRequire(path.join(process.env.RENDER_DEPS ?? process.cwd(), 'package.json'));
const { chromium } = require('playwright-core');
const ffmpegPath = require('ffmpeg-static');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public/videos');
const PAGE = pathToFileURL(path.join(ROOT, 'motion/hero-typo.html')).href;
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const DURATION = 12;
const FPS = 30;
const POSTER_TIME = 3.6; // DESIGN × CODE가 완성된 장면
const SIZES = {
  landscape: { width: 1920, height: 1080, crf: 26 },
  portrait: { width: 1080, height: 1920, crf: 27 },
};

const [themeArg, orientArg] = process.argv.slice(2);
const themes = themeArg ? [themeArg] : ['light', 'dark'];
const orients = orientArg ? [orientArg] : ['landscape', 'portrait'];

// ffmpeg 프로세스와 종료 Promise를 함께 반환 (stdin으로 PNG 프레임을 넣음)
const startFfmpeg = (args) => {
  const proc = spawn(ffmpegPath, args, { stdio: ['pipe', 'ignore', 'pipe'] });
  let log = '';
  proc.stderr.on('data', (d) => { log += d; });
  const done = new Promise((resolve, reject) => {
    proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(log.slice(-2000)))));
  });
  return { proc, done };
};

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME });

for (const theme of themes) {
  for (const orient of orients) {
    const { width, height, crf } = SIZES[orient];
    const name = `hero-${theme}-${orient}`;
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(`${PAGE}?render&theme=${theme}`);
    // 가변 폰트(본문)와 정적 폰트(윤곽선 글자) 모두 로드될 때까지 대기
    await page.evaluate(() => Promise.all([
      document.fonts.load('900 80px "Pretendard Variable"'),
      document.fonts.load('900 80px "Pretendard"'),
    ]));
    const fontOk = await page.evaluate(() =>
      document.fonts.check('900 80px "Pretendard Variable"') && document.fonts.check('900 80px "Pretendard"'));
    if (!fontOk) throw new Error('Pretendard 폰트를 불러오지 못했습니다 (네트워크 확인)');

    // 포스터: 영상을 못 쓰는 환경(동작 줄이기 등)에서 보여줄 정지 화면
    await page.evaluate((t) => window.renderAt(t), POSTER_TIME);
    await page.screenshot({ path: path.join(OUT, `${name}.jpg`), type: 'jpeg', quality: 85 });

    const { proc: ffmpeg, done } = startFfmpeg([
      '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-tune', 'animation',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
      path.join(OUT, `${name}.mp4`),
    ]);

    const total = DURATION * FPS;
    for (let f = 0; f < total; f++) {
      await page.evaluate((t) => window.renderAt(t), f / FPS);
      const png = await page.screenshot({ type: 'png' });
      if (!ffmpeg.stdin.write(png)) await new Promise((r) => ffmpeg.stdin.once('drain', r));
      if (f % 60 === 0) process.stdout.write(`\r${name}: ${f}/${total}`);
    }
    ffmpeg.stdin.end();
    await done;
    process.stdout.write(`\r${name}: 완료 (${total}프레임)\n`);
    await page.close();
  }
}

await browser.close();
