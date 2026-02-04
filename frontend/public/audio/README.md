# Audio Assets

This directory will contain your background music and audio files.

## Required Audio

### Background Music
**File**: `smells-like-teen-spirit.mp3`  
**Format**: MP3 (recommended)  
**Usage**: Landing page background music

**Used in**:
- `frontend/components/AudioPlayer.js`

## Supported Formats
- MP3 (recommended - best browser support)
- WAV (larger file size)
- OGG (good alternative)

## Adding Your Audio
1. Save your music file as `smells-like-teen-spirit.mp3` in this directory
2. Or use a different filename and update the path in `AudioPlayer.js`:

```javascript
// In frontend/components/AudioPlayer.js
<audio ref={audioRef} loop>
  <source src="/audio/your-music-file.mp3" type="audio/mpeg" />
</audio>
```

3. Update the display name:
```javascript
<p className="text-xs ...">
  Your Song Name
</p>
```

## Audio Guidelines
- **File Size**: Keep under 10MB for faster loading
- **Bitrate**: 128-192 kbps is sufficient for web
- **Length**: Consider using shorter loops (30-120 seconds)
- **Volume**: Normalize audio to avoid being too loud

## Multiple Audio Files (Optional)
You can add multiple tracks and create a playlist:

```
frontend/public/audio/
├── smells-like-teen-spirit.mp3
├── track-2.mp3
├── track-3.mp3
└── sound-effects/
    ├── notification.mp3
    └── message-sent.mp3
```

## Copyright Notice
⚠️ **Important**: Ensure you have the rights to use any audio files.
- Use royalty-free music
- Get proper licenses for copyrighted material
- Credit artists as required

## Recommended Sources for Royalty-Free Music
- YouTube Audio Library
- Free Music Archive
- Incompetech
- Bensound
- Epidemic Sound (paid)

## Audio Player Features
The current player includes:
- ✅ Play/Pause toggle
- ✅ Loop functionality
- ✅ Visual feedback
- ✅ Animated controls
- ✅ Top-center positioning

---

**Current Status**: ⚠️ Placeholder directory - Add your music here!
