#!/bin/bash

###############################################################################
# Optimize Videos for Web - Battle-Tested Compression
# Reduces 20-30MB videos to <2MB while maintaining quality
###############################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}================================${NC}"
echo -e "${YELLOW}Video Optimization for Web${NC}"
echo -e "${YELLOW}================================${NC}"
echo

# Check for FFmpeg
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}❌ FFmpeg not found!${NC}"
    echo
    echo "Install FFmpeg:"
    echo "  macOS:   brew install ffmpeg"
    exit 1
fi

cd public/videos

echo -e "${GREEN}Optimizing videos for web delivery...${NC}"
echo

# Backup originals
echo "  → Creating backups..."
cp Video1.mp4 Video1-original.mp4 2>/dev/null || true
cp Video2.mp4 Video2-original.mp4 2>/dev/null || true
cp Video3.mp4 Video3-original.mp4 2>/dev/null || true

# Optimize Video1.mp4
echo "  → Compressing Video1.mp4..."
ffmpeg -i Video1-original.mp4 \
  -vcodec libx264 \
  -profile:v baseline \
  -level 3.0 \
  -pix_fmt yuv420p \
  -crf 28 \
  -preset slow \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=24" \
  -movflags +faststart \
  -an \
  -y Video1.mp4 -loglevel error

# Optimize Video2.mp4
echo "  → Compressing Video2.mp4..."
ffmpeg -i Video2-original.mp4 \
  -vcodec libx264 \
  -profile:v baseline \
  -level 3.0 \
  -pix_fmt yuv420p \
  -crf 28 \
  -preset slow \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=24" \
  -movflags +faststart \
  -an \
  -y Video2.mp4 -loglevel error

# Optimize Video3.mp4
echo "  → Compressing Video3.mp4..."
ffmpeg -i Video3-original.mp4 \
  -vcodec libx264 \
  -profile:v baseline \
  -level 3.0 \
  -pix_fmt yuv420p \
  -crf 28 \
  -preset slow \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=24" \
  -movflags +faststart \
  -an \
  -y Video3.mp4 -loglevel error

echo
echo -e "${GREEN}✓ Optimization complete!${NC}"
echo
echo "Before → After:"
echo "  Video1: $(du -h Video1-original.mp4 | cut -f1) → $(du -h Video1.mp4 | cut -f1)"
echo "  Video2: $(du -h Video2-original.mp4 | cut -f1) → $(du -h Video2.mp4 | cut -f1)"
echo "  Video3: $(du -h Video3-original.mp4 | cut -f1) → $(du -h Video3.mp4 | cut -f1)"
echo
echo -e "${GREEN}✓ Videos ready for web!${NC}"
echo "Original backups saved as Video*-original.mp4"

