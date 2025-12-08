# VideoMaskedHero Integration Guide

## 🎬 Video Setup

### Video Requirements (CRITICAL)
- **Format**: MP4 (H.264 baseline profile for compatibility)
- **Resolution**: 1280x720 (720p) - balance quality/file size
- **Duration**: 8-12 seconds loop
- **Frame Rate**: 24fps (cinematic feel)
- **Bitrate**: 2-3 Mbps (keep under 5MB per video)
- **Codec Settings**:
  - Profile: Baseline (iOS compatibility)
  - No B-frames (faster decode)
  - Keyframe every 2s

### Recommended Footage Types
1. **OUTCOMPETING**: Corporate meeting, handshake, boardroom dynamics
2. **MADE**: Developer working, UI animations, product screens
3. **SIMPLE**: Clean workspace, minimalist setup, satisfied user

### Video Compression (FFmpeg)
```bash
# Optimize for web - each video under 5MB
ffmpeg -i input.mp4 -vcodec libx264 -profile:v baseline \
  -pix_fmt yuv420p -crf 28 -b:v 2M -vf scale=1280:720 \
  -movflags +faststart -r 24 -an output.mp4
```

## 📁 File Structure
```
/public/videos/
  ├── hero1.mp4  (OUTCOMPETING)
  ├── hero2.mp4  (MADE)
  └── hero3.mp4  (SIMPLE)
```

## 🔧 Integration into Hero.tsx

### Option A: Replace Demo Section (Recommended)
Comment out lines 452-562 in Hero.tsx and add VideoMaskedHero:

```tsx
// After your CTA button (around line 449), replace demo section with:

{/* VIDEO MASKED HERO - Cinematic Text Masking */}
{/* 
  OLD DEMO SECTION COMMENTED OUT (lines 452-562)
  Will restore when new demo video is ready
*/}

<VideoMaskedHero />
```

### Option B: Use as Separate Landing Section
Import at top of Hero.tsx:
```tsx
import VideoMaskedHero from './VideoMaskedHero';
```

Then insert where desired in your layout.

## 🎨 Customization Points

### 1. Video Sources
Edit in `VideoMaskedHero.tsx` (line 155):
```tsx
const words = [
  { text: 'YOUR_WORD', video: '/videos/your-video.mp4' },
  // ...
];
```

### 2. Text Content
- **Words**: Change at line 155
- **Subtitle**: Edit line 187
- **Trust badge**: Edit line 241

### 3. CTA Actions
- **Primary CTA** (line 209): Links to `/sign-up`
- **Secondary CTA** (line 233): Scrolls to `#demo-video`

### 4. Colors/Style
All Tailwind classes can be tweaked:
- Text gradient: `from-white via-slate-100 to-slate-300`
- Button gradient: `from-orange-500 to-rose-500`

## 🚀 Performance Checklist

- [ ] Videos compressed under 5MB each
- [ ] Use CDN for video delivery (Cloudflare R2, AWS S3)
- [ ] Add `poster` attribute for initial frame
- [ ] Test autoplay on iOS Safari (muted + playsInline required)
- [ ] Verify GPU usage in Chrome DevTools Performance tab
- [ ] Add `loading="lazy"` if below fold

## 🧪 Testing Protocol

### Desktop
1. Chrome: Open DevTools → Performance → Record → Check GPU rasterization
2. Safari: Verify video mask rendering (WebKit can be finicky)
3. Firefox: Test mix-blend-mode fallback

### Mobile
1. iOS Safari: Autoplay requires muted + playsInline (already set)
2. Android Chrome: Verify hardware decode (check battery usage)
3. Low bandwidth: Test with Network throttling (Fast 3G)

## 🛠️ Troubleshooting

### Video Not Playing
- Check browser console for CORS errors
- Verify video codec (use baseline H.264)
- Ensure `muted` and `playsInline` attributes set

### Text Masking Not Working
- Verify video has high contrast/bright content
- Adjust `brightness()` filter in VideoTextWord component
- Try increasing video saturation

### Performance Issues
- Reduce video resolution to 480p
- Decrease video duration to 6-8s
- Use Intersection Observer to lazy-load

## 📊 Expected Metrics

### Lighthouse Scores (with optimized videos)
- Performance: 85-95
- LCP: < 2.5s (with proper CDN)
- CLS: 0 (videos use aspect-ratio)
- FID: < 100ms

### File Sizes
- Total payload: ~10-15MB (3 videos)
- Lazy-load reduces initial: ~3-5MB
- With CDN cache: Sub-second on repeat visits

## 🎯 A/B Test Hypothesis

**Control**: Current demo section
**Treatment**: VideoMaskedHero

**Primary Metric**: Sign-up conversion rate
**Expected Lift**: +15-30% (based on premium positioning)

**Secondary Metrics**:
- Time on page (expect +40%)
- Bounce rate (expect -20%)
- Scroll depth (expect +25%)

---

## 🚨 URGENT: Video Sourcing

You need to provide 3 videos or I can suggest stock video sources:

### Stock Video Options
1. **Pexels Videos** (free, commercial-use)
   - Search: "corporate meeting", "developer working", "minimalist office"
   
2. **Artgrid** (premium, $29/mo)
   - High-quality, cinematic footage
   
3. **Envato Elements** ($16.50/mo)
   - Unlimited downloads

### DIY Option
Record iPhone footage (ProRes → transcode to H.264):
- Clean backgrounds
- High contrast lighting
- Steady/gimbal shots

Let me know if you need help sourcing or processing videos!

