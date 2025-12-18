# AutoClip - Automotive News Video Platform

A modern, responsive video platform for automotive news delivered in quick 3-second clips. Built with vanilla HTML, CSS, and JavaScript, inspired by modern portfolio designs.

## 🚗 Features

- **3-Second Video Clips**: Quick, engaging automotive news content
- **Category Filtering**: Electric, Racing, Luxury, Tech, Classic, and Industry news
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Video Modal**: Full-screen video player with details
- **Modern UI**: Clean, professional design with smooth animations
- **GitHub Pages Ready**: Deployable to GitHub Pages instantly

## 🎨 Design

The design is inspired by modern portfolio websites with:
- Clean, professional aesthetic
- Blue gradient color scheme
- Smooth animations and transitions
- Card-based layout
- Mobile-first responsive design

## 📁 Project Structure

```
vsp/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Getting Started

### Local Development

1. Clone this repository
2. Open `index.html` in your browser
3. That's it! No build process required.

### Deploy to GitHub Pages

1. Push this code to a GitHub repository
2. Go to Settings > Pages
3. Select the main branch as source
4. Your site will be live at `https://yourusername.github.io/repository-name/`

## 📝 Adding Your Own Videos

To add real videos, edit the `videosData` array in `script.js`:

```javascript
{
    id: 1,
    title: "Your Video Title",
    description: "Video description",
    category: "electric", // electric, racing, luxury, tech, classic, industry
    thumbnail: "path/to/thumbnail.jpg",
    videoUrl: "path/to/video.mp4",
    date: "2025-12-18",
    duration: "3s"
}
```

### Hosting Videos on GitHub

For small video files (under 100MB), you can host them directly in your repository:

1. Create a `videos/` folder
2. Add your MP4 files
3. Update the `videoUrl` to point to the relative path: `videos/your-video.mp4`

For larger files, consider using:
- GitHub Releases (for larger files)
- External CDN services
- YouTube/Vimeo embeds

## 🎯 Categories

- **Electric Vehicles**: Latest EV innovations and launches
- **Racing & Sports**: F1, NASCAR, and motorsports
- **Luxury Cars**: Premium and exotic automobiles
- **Tech & Innovation**: Autonomous driving, AI, and car tech
- **Classic Cars**: Vintage restorations and classics
- **Industry News**: Market updates and business news

## 🛠️ Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #3b82f6;
    /* ... */
}
```

### Layout

All sections are modular and can be rearranged in `index.html`.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Free to use for personal and commercial projects.

## 👤 Author

Built with ❤️ for automotive enthusiasts

## 🤝 Contributing

Feel free to fork, modify, and use this project for your own purposes!

---

**Note**: This platform uses placeholder images and videos. Replace them with actual automotive content for production use.
