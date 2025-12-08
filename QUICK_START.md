# 🚀 Quick Start - Video Hero

## TL;DR

```bash
# 1. Generate test videos (requires FFmpeg)
./scripts/generate-placeholder-videos.sh

# 2. Start dev server
npm run dev

# 3. Check http://localhost:5173 - scroll to hero
```

## What You'll See

**OUTCOMPETING**
**MADE** 
**SIMPLE**

Each word has a video playing inside the text. Premium AF.

## Replace Videos (Before Production)

```bash
# Place your videos here:
public/videos/
├── hero1.mp4  # OUTCOMPETING
├── hero2.mp4  # MADE
└── hero3.mp4  # SIMPLE

# Each must be:
# - 1280x720 resolution
# - < 5MB file size
# - 8-12 seconds loop
# - H.264 codec
```

## Customize Text

Edit `src/components/VideoMaskedHero.tsx`:

```tsx
// Line 155
const words = [
  { text: 'YOUR_WORD', video: '/videos/hero1.mp4' },
  { text: 'NEXT_WORD', video: '/videos/hero2.mp4' },
  { text: 'LAST_WORD', video: '/videos/hero3.mp4' },
];
```

## Files Modified

- ✅ `Hero.tsx` - Old demo commented out
- ✅ `VideoMaskedHero.tsx` - New component added
- ✅ `VideoMaskedHero.css` - Masking styles

## Need Help?

Read:
1. `VIDEO_HERO_IMPLEMENTATION.md` - Full implementation details
2. `INTEGRATION_GUIDE.md` - Video sourcing & optimization
3. `public/videos/README.md` - Video specifications

---

**Status**: 🟡 Waiting for videos - Using placeholders

