# Asset Placeholders

This directory will contain your developer images and other visual assets.

## Required Assets

### Developer Image
**File**: `developer-placeholder.png`  
**Dimensions**: Recommended 400x400px or higher (square)  
**Format**: PNG, JPG, or WebP  
**Usage**: Displayed in Developer Modal and Developer Page

**Used in**:
- `frontend/components/DeveloperModal.js`
- `frontend/app/dashboard/developer/page.js`

### Adding Your Image
1. Save your image as `developer-placeholder.png` in this directory
2. Or use a different filename and update the paths in the files above

### Optional Assets
You can also add:
- Guild logo
- Banner images
- Background images
- Member avatars

## Example Structure
```
frontend/public/images/
├── developer-placeholder.png   (Your developer photo)
├── guild-logo.png              (Optional)
├── banner.png                  (Optional)
└── backgrounds/                (Optional)
    ├── landing-bg.jpg
    └── dashboard-bg.jpg
```

## Image Guidelines
- **Profile Pictures**: 400x400px minimum, square
- **Logos**: Transparent PNG, 512x512px
- **Banners**: 1920x400px for full-width headers
- **Backgrounds**: 1920x1080px or higher

## Optimization Tips
- Compress images before uploading
- Use WebP format for better performance
- Keep file sizes under 500KB when possible
- Use lazy loading for large images

---

**Current Status**: ⚠️ Placeholder directory - Add your images here!
