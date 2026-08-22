import React, { createContext, useContext, useState, useEffect } from 'react';

export const LIGHT_THEMES = [
  {
    id: 'white',
    name: 'Pure White',
    description: 'Clean, crisp, ultra-minimalist white',
    primary: '#ffffff',
    secondary: '#f8fafc',
    card: '#ffffff',
    cardHover: '#f1f5f9',
    border: '#e2e8f0',
    accent: '#0284c7',
    swatch: '#ffffff',
  },
  {
    id: 'cloud',
    name: 'Soft Cloud',
    description: 'Calm cool slate & airy grey tones',
    primary: '#f8fafc',
    secondary: '#f1f5f9',
    card: '#ffffff',
    cardHover: '#f8fafc',
    border: '#e2e8f0',
    accent: '#2563eb',
    swatch: '#f1f5f9',
  },
  {
    id: 'sand',
    name: 'Warm Sand',
    description: 'Earthy cream & cozy warm stone',
    primary: '#faf8f5',
    secondary: '#f3efe6',
    card: '#ffffff',
    cardHover: '#faf8f5',
    border: '#e6ded3',
    accent: '#d97706',
    swatch: '#f3efe6',
  },
  {
    id: 'mint',
    name: 'Pale Mint',
    description: 'Fresh soothing green botanic hue',
    primary: '#f2faf5',
    secondary: '#e5f6ec',
    card: '#ffffff',
    cardHover: '#f2faf5',
    border: '#cbebd7',
    accent: '#059669',
    swatch: '#e5f6ec',
  },
  {
    id: 'sky',
    name: 'Sky Mist',
    description: 'Refreshing light cerulean ocean breeze',
    primary: '#f0f7ff',
    secondary: '#e0f0fe',
    card: '#ffffff',
    cardHover: '#f0f7ff',
    border: '#bae0fd',
    accent: '#0284c7',
    swatch: '#e0f0fe',
  },
  {
    id: 'rose',
    name: 'Blush Rose',
    description: 'Delicate light petal and blush glow',
    primary: '#fff5f6',
    secondary: '#ffe8ea',
    card: '#ffffff',
    cardHover: '#fff5f6',
    border: '#fcd0d5',
    accent: '#e11d48',
    swatch: '#ffe8ea',
  },
  {
    id: 'lavender',
    name: 'Lavender Dew',
    description: 'Graceful pastel violet & lilac aura',
    primary: '#f6f4fe',
    secondary: '#ece7fd',
    card: '#ffffff',
    cardHover: '#f6f4fe',
    border: '#dfd6fb',
    accent: '#7c3aed',
    swatch: '#ece7fd',
  },
  {
    id: 'honey',
    name: 'Warm Honey',
    description: 'Sun-drenched golden cream sunlight',
    primary: '#fefcf3',
    secondary: '#fbf5df',
    card: '#ffffff',
    cardHover: '#fefcf3',
    border: '#f5e7ba',
    accent: '#d97706',
    swatch: '#fbf5df',
  }
];

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    return localStorage.getItem('gt_theme_id') || 'white';
  });

  const [customColor, setCustomColor] = useState(() => {
    return localStorage.getItem('gt_theme_custom') || '#f5f7fa';
  });

  const [themeModalOpen, setThemeModalOpen] = useState(false);

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;

    if (currentThemeId === 'custom') {
      root.style.setProperty('--bg-primary', customColor);
      root.style.setProperty('--bg-secondary', adjustBrightness(customColor, -5));
      root.style.setProperty('--bg-card', '#ffffff');
      root.style.setProperty('--bg-card-hover', adjustBrightness(customColor, -3));
      root.style.setProperty('--border-subtle', adjustBrightness(customColor, -15));
      root.style.setProperty('--bg-nav', adjustAlpha(customColor, 0.94));
    } else {
      const selected = LIGHT_THEMES.find((t) => t.id === currentThemeId) || LIGHT_THEMES[0];
      root.style.setProperty('--bg-primary', selected.primary);
      root.style.setProperty('--bg-secondary', selected.secondary);
      root.style.setProperty('--bg-card', selected.card);
      root.style.setProperty('--bg-card-hover', selected.cardHover);
      root.style.setProperty('--border-subtle', selected.border);
      root.style.setProperty('--bg-nav', adjustAlpha(selected.primary, 0.94));
      root.style.setProperty('--accent-cyan', selected.accent);
    }

    localStorage.setItem('gt_theme_id', currentThemeId);
    if (currentThemeId === 'custom') {
      localStorage.setItem('gt_theme_custom', customColor);
    }
  }, [currentThemeId, customColor]);

  const selectTheme = (themeId) => {
    setCurrentThemeId(themeId);
  };

  const applyCustomColor = (hex) => {
    setCustomColor(hex);
    setCurrentThemeId('custom');
  };

  return (
    <ThemeContext.Provider
      value={{
        currentThemeId,
        selectTheme,
        customColor,
        applyCustomColor,
        themeModalOpen,
        setThemeModalOpen,
        themes: LIGHT_THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Utility helpers for custom color manipulation
function adjustBrightness(hex, percent) {
  let num = parseInt(hex.replace('#', ''), 16);
  if (isNaN(num)) return '#f1f5f9';
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * (percent / 100));
  let b = (num & 0x00ff) + Math.round(255 * (percent / 100));
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function adjustAlpha(hex, alpha) {
  let num = parseInt(hex.replace('#', ''), 16);
  if (isNaN(num)) return `rgba(255, 255, 255, ${alpha})`;
  let r = num >> 16;
  let g = (num >> 8) & 0x00ff;
  let b = num & 0x00ff;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
