/**
 * Multi-Brand Theme Switcher
 * 
 * This script handles theme switching by toggling CSS classes on the <html> element.
 * All CSS files are loaded once, and switching happens instantly via class changes.
 * 
 * Architecture:
 * - Headless-base: Always applied (provides base token values)
 * - Brand-*-Mode: One active at a time (overrides base tokens)
 * 
 * Persistence:
 * - Selections are saved to localStorage
 * - Restored on page load
 */

(function() {
  'use strict';

  // Storage keys
  const STORAGE_KEY_BRAND = 'ds-theme-brand';
  const STORAGE_KEY_MODE = 'ds-theme-mode';
  
  // DOM elements
  const htmlElement = document.documentElement;
  const brandSelect = document.getElementById('brand-select');
  const modeSelect = document.getElementById('mode-select');
  const classesDisplay = document.getElementById('current-classes-display');

  /**
   * Get the current theme class name from brand and mode
   * @param {string} brand - e.g., "Brand-A"
   * @param {string} mode - e.g., "Lightmode"
   * @returns {string} - e.g., "Brand-A-Lightmode"
   */
  function getThemeClass(brand, mode) {
    return `${brand}-${mode}`;
  }

  /**
   * Update the HTML element's classes
   * Always keeps Headless-base and one brand-mode combination
   * @param {string} brand - Selected brand
   * @param {string} mode - Selected mode
   */
  function applyTheme(brand, mode) {
    const themeClass = getThemeClass(brand, mode);
    
    // Remove all existing brand-mode classes
    // Keep only Headless-base and the new theme class
    const classList = htmlElement.className.split(' ').filter(cls => {
      return cls === 'Headless-base' || cls === themeClass;
    });
    
    // Ensure both required classes are present
    if (!classList.includes('Headless-base')) {
      classList.unshift('Headless-base');
    }
    if (!classList.includes(themeClass)) {
      classList.push(themeClass);
    }
    
    // Apply the updated class list
    htmlElement.className = classList.join(' ');
    
    // Update the display
    updateClassDisplay();
    
    // Update color values in swatches
    updateSwatchValues();
    
    // Update component-level token values
    updateComponentTokenValues();
  }

  /**
   * Update the display showing current classes
   */
  function updateClassDisplay() {
    if (classesDisplay) {
      classesDisplay.textContent = htmlElement.className;
    }
  }

  /**
   * Update color values in the swatch grid
   * Shows the computed CSS variable values
   */
  function updateSwatchValues() {
    const swatchValues = document.querySelectorAll('.swatch-value[data-var]');
    const computedStyle = getComputedStyle(htmlElement);
    
    swatchValues.forEach(element => {
      const varName = element.getAttribute('data-var');
      const value = computedStyle.getPropertyValue(varName).trim();
      element.textContent = value;
    });
  }

  /**
   * Update component-level token values in the showcase section
   * Displays key tokens that differ between brands
   */
  function updateComponentTokenValues() {
    const computedStyle = getComputedStyle(htmlElement);
    
    // Map of element IDs to their CSS variable names
    const tokenMap = {
      'btn-radius-value': '--button-border-radius',
      'btn-font-value': '--button-font-family',
      'btn-border-width-value': '--button-border-width',
      'heading-font-value': '--heading-sans-serif-font-family',
      'body-font-value': '--body-sans',
      'heading-size-value': '--heading-m-font-size',
      'tag-radius-value': '--tag-border-radius',
      'tag-font-value': '--tag-font-family',
      'tag-weight-value': '--tag-font-weight'
    };
    
    Object.entries(tokenMap).forEach(([elementId, varName]) => {
      const element = document.getElementById(elementId);
      if (element) {
        const value = computedStyle.getPropertyValue(varName).trim();
        element.textContent = value;
      }
    });
  }

  /**
   * Save current selections to localStorage
   * @param {string} brand - Selected brand
   * @param {string} mode - Selected mode
   */
  function saveToStorage(brand, mode) {
    try {
      localStorage.setItem(STORAGE_KEY_BRAND, brand);
      localStorage.setItem(STORAGE_KEY_MODE, mode);
    } catch (error) {
      console.warn('Failed to save theme preferences:', error);
    }
  }

  /**
   * Load saved selections from localStorage
   * @returns {Object} - Object with brand and mode properties
   */
  function loadFromStorage() {
    try {
      return {
        brand: localStorage.getItem(STORAGE_KEY_BRAND),
        mode: localStorage.getItem(STORAGE_KEY_MODE)
      };
    } catch (error) {
      console.warn('Failed to load theme preferences:', error);
      return { brand: null, mode: null };
    }
  }

  /**
   * Handle brand selection change
   */
  function handleBrandChange() {
    const brand = brandSelect.value;
    const mode = modeSelect.value;
    
    applyTheme(brand, mode);
    saveToStorage(brand, mode);
  }

  /**
   * Handle mode selection change
   */
  function handleModeChange() {
    const brand = brandSelect.value;
    const mode = modeSelect.value;
    
    applyTheme(brand, mode);
    saveToStorage(brand, mode);
  }

  /**
   * Initialize the theme system
   */
  function init() {
    // Load saved preferences or use defaults
    const saved = loadFromStorage();
    const brand = saved.brand || 'Brand-A';
    const mode = saved.mode || 'Lightmode';
    
    // Set select values
    brandSelect.value = brand;
    modeSelect.value = mode;
    
    // Apply initial theme
    applyTheme(brand, mode);
    
    // Attach event listeners
    brandSelect.addEventListener('change', handleBrandChange);
    modeSelect.addEventListener('change', handleModeChange);
    
    // Log initial state for debugging
    console.log('Theme system initialized:', {
      brand,
      mode,
      themeClass: getThemeClass(brand, mode),
      htmlClasses: htmlElement.className
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

