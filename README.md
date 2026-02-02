# Justin Cordova's Portfolio

My portfolio website.

**[Visit Live Site](https://justincordova.vercel.app/)**

## Features

- **Dynamic Photo Gallery** - Click to enlarge images with keyboard-accessible lightbox
- **Theme Selector** - Switch between Catppuccin variants (Mocha, Macchiato, Frappe, Latte)
- **Fully Accessible** - WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Optimized Performance** - Images compressed by 90% (13MB total), lazy loading, focus management
- **Responsive Design** - Mobile-first approach with smooth animations

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with Catppuccin theme
- **Routing:** React Router
- **Icons:** Lucide React
- **Accessibility:** react-focus-lock for modal management

## Theme

Built with [Catppuccin](https://catppuccin.com/) color palette, featuring four theme variants:
- **Mocha** (default) - Warm dark theme
- **Macchiato** - Balanced dark theme
- **Frappe** - Cool dark theme
- **Latte** - Light theme

## Project Structure

```
src/
├── components/
│   ├── home/          # Homepage sections
│   ├── layout/        # Navigation, Footer, ThemeSelector
│   ├── projects/      # Project cards
│   └── shared/        # Reusable components
├── pages/             # Route pages (Home, About, Projects, Pics)
├── lib/               # Utilities and theme logic
└── assets/            # Images and static assets
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Photography

The Pics page features a dynamic image gallery that automatically loads all photos from `src/assets/pics/`. Images are optimized for web delivery and include:
- Hover effects with smooth transitions
- Click-to-enlarge lightbox with loading states
- Keyboard navigation (ESC to close, Tab for focus management)
- ARIA labels for screen readers

## Contact

**Email:** [justinavodroc@gmail.com](mailto:justinavodroc@gmail.com)
**LinkedIn:** [justinalolorcordova](https://www.linkedin.com/in/justinalolorcordova/)
**GitHub:** [justincordova](https://github.com/justincordova)

---

Built with React, TypeScript, and Tailwind CSS
