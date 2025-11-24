# Yum Plushies Waitlist Website

A beautiful, responsive product launch waitlist website for Yum Plushies - where Foods are Friends! 🥟💕

![Yum Plushies](assets/images/logo.png)

## ✨ Features

- **Email Capture Form** - Required field for waitlist signup
- **Optional Plushie Selection** - Let customers choose their favorite from 4 adorable plushies:
  - Tofu Cube
  - Spicy Tofu
  - Lychee
  - Rambutan
- **Responsive Design** - Works beautifully on all devices
- **Interactive UI** - Smooth animations and hover effects
- **Form Validation** - Real-time email validation
- **Success Message** - Friendly confirmation after signup
- **Local Storage** - Stores waitlist data for demo purposes

## 🎨 Design

- **Color Palette:** Warm pinks, creams, and green accents
- **Fonts:** Fredoka (headings) and Quicksand (body)
- **Style:** Cute, friendly, and professional
- **Mobile-First:** Fully responsive layout

## 📁 Project Structure

```
yum-plushies-waitlist/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # All styling
│   ├── js/
│   │   └── script.js       # Form handling & interactivity
│   └── images/
│       ├── logo.png        # Your logo (add this)
│       ├── plushie1.jpg    # Tofu Cube photo (add this)
│       ├── plushie2.jpg    # Spicy Tofu photo (add this)
│       ├── plushie3.jpg    # Lychee photo (add this)
│       ├── plushie4.jpg    # Rambutan photo (add this)
│       └── README.md       # Image placement instructions
├── .github/
│   └── copilot-instructions.md
└── README.md               # This file
```

## 🚀 Getting Started

### Option 1: Open Directly in Browser

1. Simply open `index.html` in your web browser
2. The website will work immediately!

### Option 2: Use Live Server (Recommended)

1. Install the Live Server extension in VS Code (if not already installed)
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The site will open at `http://127.0.0.1:5500`

### Option 3: Use Python HTTP Server

```bash
# Navigate to the project directory
cd yum-plushies-waitlist

# Start a simple HTTP server
python3 -m http.server 8000

# Open http://localhost:8000 in your browser
```

## 📸 Adding Your Images

Your product images are ready to be added! Follow these steps:

1. Open the `assets/images/` folder
2. Add your images with these exact filenames:
   - `logo.png` - Your Yum Plushies logo
   - `plushie1.jpg` - Tofu Cube photo
   - `plushie2.jpg` - Spicy Tofu photo
   - `plushie3.jpg` - Lychee photo
   - `plushie4.jpg` - Rambutan photo

See `assets/images/README.md` for detailed image requirements.

## 💡 How It Works

### Email Capture
- Required field with real-time validation
- Checks for valid email format
- Shows error messages for invalid inputs

### Plushie Selection
- Optional dropdown menu
- Click on any plushie card to auto-select it
- Smooth scroll to form after selection

### Form Submission
1. User enters email (required)
2. User selects favorite plushie (optional)
3. Clicks "Notify Me! 🎉" button
4. Form validates and shows loading state
5. Success message displays
6. Data stored in localStorage (for demo)

## 🔧 Customization

### Update Colors

Edit the CSS variables in `assets/css/style.css`:

```css
:root {
    --primary-color: #FFB7B2;  /* Main pink */
    --accent-green: #98D8AA;   /* Green accent */
    /* ... more colors */
}
```

### Add Backend Integration

Replace the `simulateApiCall` function in `assets/js/script.js` with your actual API endpoint:

```javascript
async function submitToBackend(data) {
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

### Modify Plushie Names

Update both `index.html` and `assets/js/script.js` to change plushie names or add/remove options.

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Next Steps

### For Launch:
1. **Add your actual images** to the `assets/images/` folder
2. **Set up backend** to store email submissions (use services like:
   - Google Forms
   - Mailchimp API
   - ConvertKit
   - Custom backend with database)
3. **Add analytics** (Google Analytics, Plausible, etc.)
4. **Set up email automation** for welcome emails
5. **Deploy** to:
   - GitHub Pages (free)
   - Netlify (free)
   - Vercel (free)
   - Your own hosting

### Optional Enhancements:
- Add social sharing buttons
- Include countdown timer to launch date
- Add email verification
- Integrate with Mailchimp/ConvertKit
- Add newsletter signup
- Include FAQ section
- Add "Share with friends" feature

## 🌐 Deployment

### Deploy to GitHub Pages:

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin YOUR_REPO_URL
git push -u origin main

# Enable GitHub Pages in repository settings
# Your site will be live at: https://yourusername.github.io/yum-plushies-waitlist
```

### Deploy to Netlify:

1. Drag and drop the `yum-plushies-waitlist` folder onto Netlify
2. Your site is live instantly!

## 📄 License

© 2025 Yum Plushies. All rights reserved.

## 🤝 Support

For questions or issues with the website, please contact [your-email@example.com]

---

**Made with 💖 for plushie lovers everywhere!**

*Foods are Friends* 🥟✨