# RCCG Sweden Content Studio

Welcome to the RCCG Sweden Sanity Content Studio - a real-time content management system for managing church content including events, Facebook posts, Bible verses, banners, and blog posts.

## Features

- **Events Management** - Create and manage church events with dates, images, and CTA links
- **Facebook Integration** - Embed Facebook posts using iframe codes
- **Bible Verses Library** - Manage and organize Bible verses with book, chapter, and verse references
- **Banners** - Create promotional banners with background images and call-to-action buttons
- **Blog Posts** - Manage church blog posts and articles

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

- `event` - Church events and activities
- `facebook` - Facebook post embeds
- `verse` - Bible verses with references
- `banner` - Promotional banners
- `post` - Blog posts and articles

## GROQ Queries

### Events (by date added)
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

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Community](https://www.sanity.io/community/join)Clean Content Studio
