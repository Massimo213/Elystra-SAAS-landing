#!/bin/bash

###############################################################################
# Generate Placeholder Videos for VideoMaskedHero
# Creates 3 solid-color test videos for development
###############################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}================================${NC}"
echo -e "${YELLOW}VideoMaskedHero Placeholder Gen${NC}"
echo -e "${YELLOW}================================${NC}"
echo

# Check for FFmpeg
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}❌ FFmpeg not found!${NC}"
    echo
    echo "Install FFmpeg:"
    echo "  macOS:   brew install ffmpeg"
    echo "  Linux:   sudo apt install ffmpeg"
    echo "  Windows: choco install ffmpeg"
    echo
    exit 1
fi

# Create videos directory
mkdir -p public/videos
cd public/videos

echo -e "${GREEN}✓${NC} Creating placeholder videos..."
echo

# Generate hero1.mp4 - Orange gradient (OUTCOMPETING)
echo "  → hero1.mp4 (orange gradient)..."
ffmpeg -f lavfi -i \
  "color=c=0xfb923c:s=1280x720:d=10,format=yuv420p" \
  -vcodec libx264 \
  -profile:v baseline \
  -pix_fmt yuv420p \
  -crf 23 \
  -movflags +faststart \
  -y hero1.mp4 -loglevel error

# Generate hero2.mp4 - Pink/Rose gradient (MADE)
echo "  → hero2.mp4 (pink gradient)..."
ffmpeg -f lavfi -i \
  "color=c=0xf43f5e:s=1280x720:d=10,format=yuv420p" \
  -vcodec libx264 \
  -profile:v baseline \
  -pix_fmt yuv420p \
  -crf 23 \
  -movflags +faststart \
  -y hero2.mp4 -loglevel error

# Generate hero3.mp4 - Purple gradient (SIMPLE)
echo "  → hero3.mp4 (purple gradient)..."
ffmpeg -f lavfi -i \
  "color=c=0xa855f7:s=1280x720:d=10,format=yuv420p" \
  -vcodec libx264 \
  -profile:v baseline \
  -pix_fmt yuv420p \
  -crf 23 \
  -movflags +faststart \
  -y hero3.mp4 -loglevel error

echo
echo -e "${GREEN}✓ Successfully generated placeholder videos!${NC}"
echo
echo "Location: public/videos/"
echo "  - hero1.mp4 ($(du -h hero1.mp4 | cut -f1))"
echo "  - hero2.mp4 ($(du -h hero2.mp4 | cut -f1))"
echo "  - hero3.mp4 ($(du -h hero3.mp4 | cut -f1))"
echo
echo -e "${YELLOW}⚠️  These are PLACEHOLDER videos${NC}"
echo "Replace with real footage before production deploy!"
echo

# Create a .gitignore entry suggestion
if ! grep -q "hero1.mp4" ../../.gitignore 2>/dev/null; then
    echo -e "${YELLOW}💡 Tip:${NC} Add to .gitignore:"
    echo "  public/videos/hero*.mp4"
    echo
fi

echo -e "${GREEN}✓ Ready to test VideoMaskedHero component!${NC}"
echo "Run: npm run dev"

