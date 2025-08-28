#!/bin/bash
# Requirements:
# - WebP:   brew install webp        (macOS) or apt-get install webp (Linux)
# - AVIF:   brew install libavif     (macOS) or apt-get install libavif-bin (Linux)
#           Provides `avifenc`. If unavailable, ImageMagick `magick` or ffmpeg (libaom-av1) can be used.

avif() {
  in="$1"; out="$2"; q="${3:-28}"
  if command -v avifenc >/dev/null 2>&1; then
    avifenc --min 20 --max "$q" --speed 6 "$in" "$out"
  elif command -v magick >/dev/null 2>&1; then
    magick "$in" -quality "$q" "$out"
  elif command -v ffmpeg >/dev/null 2>&1; then
    ffmpeg -y -i "$in" -pix_fmt yuv420p -c:v libaom-av1 -crf "$q" -b:v 0 "$out"
  else
    echo "No AVIF encoder found (avifenc/magick/ffmpeg). Skipping $out" >&2
  fi
}

webp() {
  cwebp -quiet -q "${3:-85}" "$1" -o "$2"
}

# Hero images (home)
webp assets/Images/HERO-BANNER.png assets/Images/HERO-BANNER.webp 85 || true
# Mobile hero conversions (target ~1080px width)
if command -v magick >/dev/null 2>&1; then
  if [ -f assets/Images/HERO-BANNER-mobile.png ]; then
    magick assets/Images/HERO-BANNER-mobile.png -resize 1080x -quality 75 assets/Images/HERO-BANNER-mobile.webp 2>/dev/null || true
    magick assets/Images/HERO-BANNER-mobile.png -resize 1080x -quality 45 assets/Images/HERO-BANNER-mobile.avif 2>/dev/null || true
  elif [ -f assets/Images/HERO-BANNER-mobile.webp ]; then
    magick assets/Images/HERO-BANNER-mobile.webp -resize 1080x -quality 75 assets/Images/HERO-BANNER-mobile.webp 2>/dev/null || true
    magick assets/Images/HERO-BANNER-mobile.webp -resize 1080x -quality 45 assets/Images/HERO-BANNER-mobile.avif 2>/dev/null || true
  fi
else
  if [ -f assets/Images/HERO-BANNER-mobile.png ]; then
    webp assets/Images/HERO-BANNER-mobile.png assets/Images/HERO-BANNER-mobile.webp 75 || true
    avif assets/Images/HERO-BANNER-mobile.png assets/Images/HERO-BANNER-mobile.avif 45 || true
  elif [ -f assets/Images/HERO-BANNER-mobile.webp ]; then
    avif assets/Images/HERO-BANNER-mobile.webp assets/Images/HERO-BANNER-mobile.avif 45 || true
  fi
fi
avif assets/Images/HERO-BANNER.png assets/Images/HERO-BANNER.avif 28 || true

# Product images
webp assets/Images/CABANA-BOXERS-FRONT.png assets/Images/CABANA-BOXERS-FRONT.webp 90 || true
webp assets/Images/CABANA-BOXERS-SIDE.png assets/Images/CABANA-BOXERS-SIDE.webp 90 || true
webp assets/Images/CABANA-BOXERS-BACK.png assets/Images/CABANA-BOXERS-BACK.webp 90 || true
webp assets/Images/CABANA-WOMEN.PNG assets/Images/CABANA-WOMEN.webp 90 || true
avif assets/Images/CABANA-BOXERS-FRONT.png assets/Images/CABANA-BOXERS-FRONT.avif 28 || true
avif assets/Images/CABANA-BOXERS-SIDE.png assets/Images/CABANA-BOXERS-SIDE.avif 28 || true
avif assets/Images/CABANA-BOXERS-BACK.png assets/Images/CABANA-BOXERS-BACK.avif 28 || true
avif assets/Images/CABANA-WOMEN.PNG assets/Images/CABANA-WOMEN.avif 28 || true

# Create poster frame for towel video (needs ffmpeg)
if command -v ffmpeg >/dev/null 2>&1; then
  ffmpeg -y -i assets/Images/TowelTease.mp4 -ss 00:00:01 -frames:v 1 assets/Images/towel-poster.jpg
  webp assets/Images/towel-poster.jpg assets/Images/towel-poster.webp 85
  avif assets/Images/towel-poster.jpg assets/Images/towel-poster.avif 28
fi

# Also produce 960px variants for extra-small devices/perf
if command -v magick >/dev/null 2>&1; then
  if [ -f assets/Images/HERO-BANNER-mobile.png ]; then
    magick assets/Images/HERO-BANNER-mobile.png -resize 960x540^ -gravity center -extent 960x540 -quality 70 assets/Images/HERO-BANNER-mobile-960.webp 2>/dev/null || true
    magick assets/Images/HERO-BANNER-mobile.png -resize 960x540^ -gravity center -extent 960x540 -quality 28 assets/Images/HERO-BANNER-mobile-960.avif 2>/dev/null || true
  elif [ -f assets/Images/HERO-BANNER-mobile.webp ]; then
    magick assets/Images/HERO-BANNER-mobile.webp -resize 960x540^ -gravity center -extent 960x540 -quality 70 assets/Images/HERO-BANNER-mobile-960.webp 2>/dev/null || true
    magick assets/Images/HERO-BANNER-mobile.webp -resize 960x540^ -gravity center -extent 960x540 -quality 28 assets/Images/HERO-BANNER-mobile-960.avif 2>/dev/null || true
  fi
else
  if [ -f assets/Images/HERO-BANNER-mobile.png ]; then
    webp assets/Images/HERO-BANNER-mobile.png assets/Images/HERO-BANNER-mobile-960.webp 70 || true
    avif assets/Images/HERO-BANNER-mobile.png assets/Images/HERO-BANNER-mobile-960.avif 28 || true
  elif [ -f assets/Images/HERO-BANNER-mobile.webp ]; then
    avif assets/Images/HERO-BANNER-mobile.webp assets/Images/HERO-BANNER-mobile-960.avif 28 || true
  fi
fi

# Produce 900px variants for very small devices
if command -v magick >/dev/null 2>&1; then
  if [ -f assets/Images/HERO-BANNER-mobile.png ]; then
    magick assets/Images/HERO-BANNER-mobile.png -resize 900x506^ -gravity center -extent 900x506 -quality 68 assets/Images/HERO-BANNER-mobile-900.webp 2>/dev/null || true
    magick assets/Images/HERO-BANNER-mobile.png -resize 900x506^ -gravity center -extent 900x506 -quality 28 assets/Images/HERO-BANNER-mobile-900.avif 2>/dev/null || true
  elif [ -f assets/Images/HERO-BANNER-mobile.webp ]; then
    magick assets/Images/HERO-BANNER-mobile.webp -resize 900x506^ -gravity center -extent 900x506 -quality 68 assets/Images/HERO-BANNER-mobile-900.webp 2>/dev/null || true
    magick assets/Images/HERO-BANNER-mobile.webp -resize 900x506^ -gravity center -extent 900x506 -quality 28 assets/Images/HERO-BANNER-mobile-900.avif 2>/dev/null || true
  fi
else
  if [ -f assets/Images/HERO-BANNER-mobile.png ]; then
    webp assets/Images/HERO-BANNER-mobile.png assets/Images/HERO-BANNER-mobile-900.webp 68 || true
    avif assets/Images/HERO-BANNER-mobile.png assets/Images/HERO-BANNER-mobile-900.avif 28 || true
  elif [ -f assets/Images/HERO-BANNER-mobile.webp ]; then
    avif assets/Images/HERO-BANNER-mobile.webp assets/Images/HERO-BANNER-mobile-900.avif 28 || true
  fi
fi
echo "Image conversion complete!"


