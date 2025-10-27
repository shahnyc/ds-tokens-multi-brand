# Multi-Brand Design Token Demo

This demo showcases a white-label design system that supports multiple brands with light and dark modes, all powered by CSS custom properties and class-based theme switching.




---
## 🎨 Component-Level Tokens: Real Brand Differentiation

This demo uses **component-level design tokens** (not just semantic color tokens) to create **real visual variety** between brands:

| Brand | Button Radius | Font Family | Border Width | Visual Style |
|-------|--------------|-------------|--------------|--------------|
| **Brand A** | `100px` | Satoshi Variable | `2px` | Pill-shaped, modern |
| **Brand B** | `0px` | Zodiak Variable | `1px` | Sharp, editorial |
| **Brand C** | `4px` | IBM Plex Sans | `1px` | Subtle, technical |
| **Brand I** | `8px` | Inter / IBM Plex | `1px` | Moderate, balanced |

**Component tokens used:**
- `--button-border-radius`, `--button-font-family`, `--button-border-width`
- `--heading-sans-serif-font-family`, `--body-sans`
- `--tag-border-radius`, `--tag-font-family`

**Switch between brands to see dramatic visual differences** - buttons morph from pills to squares, fonts change completely, and the entire UI personality transforms!

---
## Demo: https://shahnyc.github.io/ds-tokens-multi-brand/
## Quick Start
Follow these 5 steps to run the demo locally:

### 1. **Navigate to the project root**
```bash
cd ds-tokens-multi-brand
```

### 2. **Ensure CSS files are built**
```bash
npm run build
```

### 3. **Start a local server**
```bash
npx http-server -p 8080
```

### 4. **Open the demo in your browser**
```
http://localhost:8080
```

### 5. **Test theme switching**
- Use the **Brand** dropdown to switch between Brand A, B, C, and I
- Use the **Mode** dropdown to toggle between Light and Dark
- Watch the UI update instantly without page reload
- **Notice font changes:** Satoshi → Zodiak → IBM Plex Sans → Inter

---

## How It Works

### Architecture Overview

This design system uses a **layered CSS architecture** with class-based scoping to enable instant theme switching without CSS file reloading.

#### CSS Loading Strategy

All CSS files are loaded once on initial page load:

```html
<link rel="stylesheet" href="../dist/css/Headless-base.css">
<link rel="stylesheet" href="../dist/css/Brand-A-Lightmode.css">
<link rel="stylesheet" href="../dist/css/Brand-A-Darkmode.css">
<link rel="stylesheet" href="../dist/css/Brand-B-Lightmode.css">
<!-- ... and so on -->
```

#### Class-Based Scoping

Each CSS file defines its variables inside a **scoped class selector**:

**Headless-base.css:**
```css
.Headless-base {
  --border-radius-0: 0px;
  --border-radius-1: 1px;
  --color-slate-50: #f8fafc;
  /* ... base tokens ... */
}
```

**Brand-A-Lightmode.css:**
```css
.Brand-A-Lightmode {
  --semantic-fg-default: #334155;
  --semantic-bg-surface: #ffffff;
  --semantic-cta-default: #2563eb;
  /* ... brand-specific overrides ... */
}
```

**Brand-A-Darkmode.css:**
```css
.Brand-A-Darkmode {
  --semantic-fg-default: #e2e8f0;
  --semantic-bg-surface: #1e293b;
  --semantic-cta-default: #3b82f6;
  /* ... dark mode overrides ... */
}
```

#### Theme Switching Mechanism

When you select a brand and mode, JavaScript updates the `<html>` element's class attribute:

```javascript
// Example: Switching to Brand B Dark Mode
document.documentElement.className = "Headless-base Brand-B-Darkmode";
```

The CSS cascade works as follows:
1. **Headless-base** provides all base token values
2. **Brand-X-Mode** overrides specific tokens for that brand/mode combination
3. Components reference tokens via `var(--token-name)`, which resolves to the active theme's values

### Token Inheritance Flow

```
┌─────────────────────────────────────────────────┐
│ Headless-base (always applied)                 │
│ • Core tokens (colors, spacing, typography)    │
│ • Component tokens (default values)            │
│ • Semantic tokens (base definitions)           │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│ Brand-X-Lightmode / Brand-X-Darkmode            │
│ • Overrides semantic tokens (fg, bg, cta)       │
│ • Overrides component-specific values           │
│ • Brand-specific customizations                 │
└─────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│ Components use CSS variables                    │
│ • color: var(--semantic-fg-default)             │
│ • background: var(--semantic-bg-surface)        │
│ • Variables resolve to active theme values      │
└─────────────────────────────────────────────────┘
```

### Why This Approach Works

#### ✅ **No CSS Reloading**
- All themes loaded once upfront
- Switching happens via class changes (instant, no network requests)

#### ✅ **Headless Base**
- Headless-base provides a consistent foundation
- Each brand inherits base tokens and overrides as needed
- New brands can be added without touching existing ones

#### ✅ **Light/Dark Mode Support**
- Each brand can define unique light and dark themes
- Mode switching is just another class toggle
- No need for `prefers-color-scheme` media queries

---

## File Structure

```
demo/
├── index.html          # Main demo page with component showcase
├── fonts.css           # Local font declarations (@font-face rules)
├── theme-toggle.js     # Theme switching logic with localStorage persistence
├── preview.css         # Demo-specific UI styles (toolbar, cards, swatches)
├── COMPONENT-TOKENS.md # Detailed guide on component-level token usage
└── README.md           # This file

fonts/
├── satoshi/            # Satoshi Variable (Brand A)
├── zodiak/             # Zodiak Variable (Brand B)
└── general-sans/       # General Sans Variable (optional)

dist/css/
├── Headless-base.css           # Base token definitions
├── Brand-A-Lightmode.css       # Brand A light theme
├── Brand-A-Darkmode.css        # Brand A dark theme
├── Brand-B-Lightmode.css       # Brand B light theme
├── Brand-B-Darkmode.css        # Brand B dark theme
├── Brand-C-Lightmode.css       # Brand C light theme
├── Brand-C-Darkmode.css        # Brand C dark theme
├── Brand-I-Lightmode.css       # Brand I light theme
└── Brand-I-Darkmode.css        # Brand I dark theme
```

---

## Key Features Demonstrated

### 1. **Component-Level Token Variations**
- Live display of component tokens (border-radius, fonts, weights)
- Interactive samples showing real brand differences
- Buttons change from pill-shaped (Brand A) to sharp corners (Brand B)
- Typography changes between Satoshi, Zodiak, IBM Plex, and Inter fonts

### 2. **Component Preview**
- Cards with headers using `--heading-*` tokens
- Buttons styled with `--button-*` component tokens
- Tags using `--tag-*` component tokens
- Status indicators (info, warning, error)

### 3. **Color Swatch Grid**
- Real-time display of CSS variable values
- Shows how semantic tokens change across brands/modes
- Organized by semantic categories (foreground, background, CTA, status)

### 4. **Persistence**
- Selected brand and mode saved to `localStorage`
- Preferences restored on page reload
- Fallback to defaults if storage unavailable

### 5. **Developer Experience**
- Clear class names visible in toolbar
- Live token value inspection
- Console logging for debugging
- Well-commented code


---

## Learn More

- **Style Dictionary**: [https://amzn.github.io/style-dictionary/](https://amzn.github.io/style-dictionary/)
- **CSS Custom Properties**: [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- **Design Tokens**: [Design Tokens Community Group](https://www.w3.org/community/design-tokens/)

---

## License

MIT

