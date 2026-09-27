"""Portfolio 3D 갤러리용 텍스처 생성.

public/images/portfolio/scr_XX.jpg(전체 페이지 스크린샷)의 상단을 16:10으로 잘라
1024x640으로 축소해 public/images/portfolio/gallery/에 저장한다.
원본을 그대로 텍스처로 쓰면 GPU 메모리가 과도해져 모바일에서 문제가 된다.

사용법: python3 scripts/make-gallery-thumbs.py  (Pillow 필요)
"""
from pathlib import Path
from PIL import Image

SRC = Path(__file__).resolve().parent.parent / "public/images/portfolio"
OUT = SRC / "gallery"
SIZE = (1024, 640)

OUT.mkdir(exist_ok=True)
for src in sorted(SRC.glob("scr_[0-9][0-9].jpg")):
    im = Image.open(src).convert("RGB")
    w = im.width
    im = im.crop((0, 0, w, round(w * SIZE[1] / SIZE[0]))).resize(SIZE, Image.LANCZOS)
    im.save(OUT / src.name, quality=82, optimize=True, progressive=True)
    print(src.name)
