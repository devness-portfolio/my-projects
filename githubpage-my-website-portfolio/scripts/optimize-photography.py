"""Regenerate gallery assets: python -m pip install Pillow, then run this file."""
from pathlib import Path
from PIL import Image, ImageFilter, ImageOps

root = Path(__file__).resolve().parents[1] / 'portfolio/assets/img/photography'
output = root / 'responsive'
output.mkdir(exist_ok=True)
for source in sorted(root.glob('*.jpg')):
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        for width in (480, 800, 1200, 1600):
            height = round(image.height * width / image.width)
            image.resize((width, height), Image.Resampling.LANCZOS).save(
                output / f'{source.stem}-{width}.webp', quality=78, method=6)
        # Blur once during asset generation instead of filtering a full-size layer on scroll.
        backdrop = image.resize((48, 38), Image.Resampling.LANCZOS)
        backdrop.filter(ImageFilter.GaussianBlur(3)).save(
            output / f'{source.stem}-backdrop.webp', quality=60, method=6)
