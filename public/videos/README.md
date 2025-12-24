# Hero Video Assets

## 📍 Place Your Videos Here

This directory should contain:
- `hero1.mp4` - Background video for "OUTCOMPETING"
- `hero2.mp4` - Background video for "MADE"
- `hero3.mp4` - Background video for "SIMPLE"

## 🎬 Video Specs

**CRITICAL**: Each video must meet these specs:
- **Format**: MP4 (H.264 baseline)
- **Resolution**: 1280x720 (720p)
- **Duration**: 8-12 seconds (looping)
- **Frame Rate**: 24fps
- **File Size**: < 5MB each
- **Audio**: None (remove audio track)

## 🚀 Quick Start (Temporary Placeholder)

Until you have final videos, use stock footage from:

### Option 1: Pexels (Free)
```bash
# Download these or similar:
# 1. Corporate/business footage
curl -o hero1.mp4 "https://www.pexels.com/download/video/[VIDEO_ID]"

# 2. Tech/developer footage  
curl -o hero2.mp4 "https://www.pexels.com/download/video/[VIDEO_ID]"

# 3. Minimalist/clean footage
curl -o hero3.mp4 "https://www.pexels.com/download/video/[VIDEO_ID]"
```

### Option 2: Local Test Videos
Create solid color test videos (for development only):
```bash
# Requires FFmpeg
ffmpeg -f lavfi -i color=c=orange:s=1280x720:d=10 -pix_fmt yuv420p hero1.mp4
ffmpeg -f lavfi -i color=c=pink:s=1280x720:d=10 -pix_fmt yuv420p hero2.mp4
ffmpeg -f lavfi -i color=c=purple:s=1280x720:d=10 -pix_fmt yuv420p hero3.mp4
```

## 🎨 Recommended Footage Types

### hero1.mp4 (OUTCOMPETING)
- Corporate boardroom
- Handshake/business deal
- People collaborating
- High-energy office environment
**Mood**: Aggressive, competitive, winning

### hero2.mp4 (MADE)
- Developer coding
- UI animations
- Product being built
- Creative process
**Mood**: Craftsmanship, precision, creation

### hero3.mp4 (SIMPLE)
- Clean workspace
- Minimalist office
- Satisfied customer
- Easy workflow
**Mood**: Effortless, elegant, refined

## 🛠️ Optimization Command

Once you have source videos, optimize them:

```bash
# Run this for each video
ffmpeg -i input.mp4 \
  -vcodec libx264 \
  -profile:v baseline \
  -pix_fmt yuv420p \
  -crf 28 \
  -b:v 2M \
  -vf "scale=1280:720,fps=24" \
  -movflags +faststart \
  -an \
  hero1.mp4

# Repeat for hero2.mp4 and hero3.mp4
```

## 📦 CDN Deployment (Production)

For production, upload to CDN:

### Cloudflare R2 (Recommended)
```bash
# After uploading to R2
# Update VideoMaskedHero.tsx video paths to:
# https://your-domain.r2.dev/hero1.mp4
```

### AWS S3
```bash
aws s3 cp hero1.mp4 s3://your-bucket/videos/
# Set public-read ACL
```

## ✅ Validation Checklist

Before deploying:
- [ ] All 3 videos present
- [ ] Each video < 5MB
- [ ] Videos loop seamlessly (start/end frames match)
- [ ] High contrast/bright content (for text masking)
- [ ] No audio track (reduces file size)
- [ ] Tested on iOS Safari (muted autoplay works)

---

**Status**: 🚨 VIDEOS REQUIRED - Component will show gradient fallback until videos are added

