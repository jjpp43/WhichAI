# 📸 Blog Images

This folder contains images for blog posts.

## 📁 How to Add Images

1. **Add your image** to this folder (e.g., `ai-tools.jpg`)
2. **Update your blog post** in `src/data/blog-posts.ts`:
   ```typescript
   {
     // ... other fields
     image: "/images/your-image.jpg",
   }
   ```

## 🎯 Image Guidelines

### **Recommended Specifications:**

- **Format**: JPG, PNG, or WebP
- **Size**: 1200x630px (16:9 ratio) for featured images
- **File size**: Under 500KB for optimal loading
- **Quality**: High quality but optimized for web

### **Image Types:**

- **Featured images**: Display at the top of blog posts
- **Inline images**: Can be added in the content HTML
- **Social sharing**: Automatically used for Open Graph

### **Naming Convention:**

- Use descriptive names: `ai-tools-guide.jpg`
- Use lowercase and hyphens: `chatgpt-vs-claude.jpg`
- Include the post slug: `getting-started-ai-tools.jpg`

## 🚀 Optimization Tips

1. **Compress images** before uploading
2. **Use WebP format** for better performance
3. **Provide alt text** in your blog post data
4. **Consider responsive sizes** for different devices

## 📝 Example Usage

```typescript
// In src/data/blog-posts.ts
{
  id: "my-blog-post",
  title: "My Blog Post",
  // ... other fields
  image: "/images/my-blog-post.jpg", // Add this line
}
```

The image will automatically appear in:

- Blog listing page (thumbnail)
- Individual blog post (featured image)
- Social media shares (Open Graph)
