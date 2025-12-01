# ShoreSquad 🌊

**Rally your crew, track weather, and hit the next beach cleanup with our dope map app!**

## Overview

ShoreSquad is a mobile-first web application designed to mobilize young people to clean beaches by combining interactive mapping, real-time weather tracking, and social features. The platform makes eco-action fun, connected, and easy to organize with your crew.

## Features

### 🗺️ Interactive Map
- Real-time beach cleanup site markers
- Leaflet-powered map with OpenStreetMap data
- Geolocation support for "use my location" functionality
- Event filtering and search

### 🌤️ Weather Integration
- Live tide & wind conditions
- 7-day forecast for cleanup planning
- Location-specific weather alerts
- Hazard condition warnings

### 👥 Social Features
- Real-time crew member notifications
- Event attendance counting
- Gamification with cleanup stats (lbs collected)
- Share to social media integration
- Invite crew functionality

### 📱 Progressive Web App (PWA)
- Offline functionality
- Add to home screen capability
- Push notifications
- Service worker caching

### ♿ Accessibility First
- WCAG AA compliance
- ARIA labels throughout
- Keyboard navigation
- Dark mode support
- Reduced motion preferences

## Brand Identity

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Ocean Blue | `#0066CC` | Primary CTA, headers |
| Sand Beige | `#F4E4C1` | Backgrounds, accents |
| Coral | `#FF6B5B` | Alerts, highlights |
| Fresh Green | `#2DB67B` | Success states, eco-messaging |
| Dark Navy | `#001F3F` | Text, footer |
| Light Gray | `#F8F9FA` | Card backgrounds |

### Typography
- **Primary Font**: Segoe UI / System Stack
- **Scale**: Responsive, mobile-first design
- **Hierarchy**: Clear visual distinction between sections

### UX Principles
- **Mobile-First Design**: Optimized for on-the-go access
- **Dark Mode Support**: Reduced eye strain at the beach
- **Minimal Friction**: <2 taps to join an event
- **Social Proof**: Visible active participant counts
- **Gamification**: Leaderboards and achievement tracking

## Tech Stack

### Frontend
- **HTML5**: Semantic markup, accessibility
- **CSS3**: CSS Variables, Grid, Flexbox, animations
- **JavaScript**: Vanilla JS, no heavy frameworks
- **Leaflet.js**: Interactive mapping
- **OpenStreetMap**: Map tile provider

### Performance
- Lazy loading for images
- Service workers for offline support
- Optimized bundle size
- Responsive imagery

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android Chrome)

## Project Structure

```
ShoreSquad/
├── index.html              # HTML5 boilerplate & semantic structure
├── css/
│   └── styles.css         # Complete design system with CSS variables
├── js/
│   └── app.js             # Interactive features & functionality
├── sw.js                  # Service Worker for PWA
├── manifest.json          # PWA manifest for app installation
├── package.json           # Dependencies & scripts
├── .gitignore            # Git ignore rules
├── .vscode/
│   ├── launch.json       # Debug configuration
│   └── tasks.json        # Live Server task
└── assets/               # Images, icons (future)
```

## Getting Started

### Prerequisites
- Node.js 14+ (for Live Server)
- Modern web browser
- Git

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd ShoreSquad
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Live Server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5500`
   - The site will auto-reload on file changes

### Development

Run the development server with file watching:
```bash
npm run dev
```

Press `F5` in VS Code to launch with debugger attached.

## Features in Detail

### JavaScript Interactivity

#### 1. **Geolocation & Map**
```javascript
// Auto-detect user location and center map
navigator.geolocation.getCurrentPosition(position => {
    app.userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    initializeMap();
});
```

#### 2. **Event Management**
- Dynamic event card rendering
- Modal dialogs for event details
- Join event functionality
- Stat tracking (attendees, lbs collected)

#### 3. **Dark Mode Toggle**
```javascript
// Persists preference in localStorage
app.darkMode = localStorage.getItem('darkMode') === 'true';
toggleDarkMode(); // Updates CSS color scheme
```

#### 4. **Mobile Navigation**
- Hamburger menu toggle
- Auto-close on navigation
- Accessible keyboard support

#### 5. **Service Worker**
- Cache-first strategy for app shell
- Network-first for API calls
- Push notification support
- Offline fallback page

## Accessibility Features

- **Semantic HTML**: `<nav>`, `<main>`, `<section>`, `<article>`
- **ARIA Labels**: All buttons and regions labeled
- **Keyboard Navigation**: Tab through all interactive elements
- **Focus Indicators**: Clear 2px outlines on focus
- **Color Contrast**: WCAG AA compliant ratios
- **Dark Mode**: Automatic based on system preferences
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Screen Readers**: Proper announcements and live regions

## Performance Optimizations

1. **Lazy Loading**: Intersection Observer for images/cards
2. **Service Workers**: Offline caching & instant loading
3. **Minimal Dependencies**: No heavy frameworks
4. **Responsive Images**: Mobile-first design
5. **Code Splitting**: Modular JavaScript
6. **CSS Variables**: Efficient theming

## Future Enhancements

- [ ] Real weather API integration (OpenWeatherMap, Weather.com)
- [ ] Real map data from cleanup organizations
- [ ] User authentication & profiles
- [ ] Photo upload for cleanup results
- [ ] Leaderboard & achievements
- [ ] Push notifications for nearby events
- [ ] Social sharing with impact metrics
- [ ] Multi-language support
- [ ] Offline event creation
- [ ] Team/crew management

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Code Standards

- Mobile-first CSS
- Semantic HTML5
- Vanilla JavaScript (no jQuery)
- Accessibility first
- Performance conscious
- Comments for complex logic

## Browser DevTools Tips

1. **Lighthouse**: Audit for PWA, performance, accessibility
2. **Network Tab**: Monitor API calls and caching
3. **Mobile Emulation**: Test responsive design
4. **Service Workers**: Debug cache strategies
5. **Console**: Watch for performance warnings

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or suggestions:
- Open a GitHub Issue
- Check existing documentation
- Review accessibility guidelines

---

**Made with 🌊 by the ShoreSquad Team**

*Mobilizing young people to keep beaches clean, one crew at a time.*
