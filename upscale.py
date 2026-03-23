from PIL import Image, ImageFilter
import os

images = ["parallax_hero.png", "parallax_about.png", "parallax_portfolio.png"]
base_dir = "src/assets/images"

for img_name in images:
    path = os.path.join(base_dir, img_name)
    if os.path.exists(path):
        with Image.open(path) as img:
            print(f"Original size of {img_name}: {img.size}")
            # Upscale 4x or to 3840x3840
            new_size = (3840, 3840)
            upscaled = img.resize(new_size, resample=Image.Resampling.LANCZOS)
            # Apply subtle sharpening
            sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
            sharpened.save(path)
            print(f"Upscaled {img_name} to 3840x3840")
    else:
        print(f"File not found: {path}")

