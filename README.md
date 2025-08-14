# RCCG Sweden Content Studio

Welcome to the RCCG Sweden Sanity Content Studio - a real-time content management system for managing church content including events, Facebook posts, Bible verses, banners, blog posts, and image galleries.

## Features

- **Events Management** - Create and manage church events with dates, images, and CTA links
- **Facebook Integration** - Embed Facebook posts using iframe codes  
- **Bible Verses Library** - Manage and organize Bible verses with book, chapter, and verse references
- **Banners** - Create promotional banners with background images and call-to-action buttons
- **Blog Posts** - Manage church blog posts and articles
- **Image Gallery** - Upload and manage individual images with custom names for identification

## Getting Started

1. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Fill in your Sanity project credentials

2. **Development**
   ```bash
   pnpm install
   pnpm run dev
   ```

3. **Deploy Studio**
   ```bash
   pnpm run deploy
   ```

## Content Types

- `event` - Church events and activities (sorted by creation date)
- `facebook` - Facebook post embeds (iframe only)
- `verse` - Bible verses with references 
- `banner` - Promotional banners
- `post` - Blog posts and articles
- `gallery` - Individual images with custom names

## Data Protection

All content types include automatic timestamp fields (`publishedAt`/`uploadedAt`) that are:
- ✅ **Hidden from editors** - Cannot be seen in the Studio interface
- ✅ **Read-only** - Cannot be modified by users
- ✅ **Automatically set** - Timestamp captured on creation
- ✅ **Available for queries** - Can be used for sorting and filtering

## GROQ Queries

### Events (by creation date)
```groq
*[_type == "event"] | order(publishedAt desc) {
  _id,
  title,
  date,
  image,
  ctaLink,
  publishedAt
}
```

### Facebook Posts
```groq
*[_type == "facebook"] | order(publishedAt desc) {
  _id,
  iframeCode,
  publishedAt
}
```

### Bible Verses
```groq
*[_type == "verse"] | order(publishedAt desc) {
  _id,
  text,
  book,
  chapter,
  verse,
  publishedAt
}
```

### Gallery Images
```groq
*[_type == "gallery"] | order(uploadedAt desc) {
  _id,
  name,
  image {
    asset->{
      _id,
      url
    }
  },
  uploadedAt
}
```

### Banners
```groq
*[_type == "banner"] | order(publishedAt desc) {
  _id,
  mainHeading,
  supportingText,
  ctaText,
  ctaLink,
  backgroundImage {
    asset->{
      _id,
      url
    }
  },
  publishedAt
}
```

### Blog Posts
```groq
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  image {
    asset->{
      _id,
      url
    }
  },
  body,
  publishedAt
}
```
