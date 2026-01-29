import { useEffect } from 'react';

/**
 * Custom hook that creates a smooth color-shifting effect by rotating through
 * the entire color spectrum. Shifts to a new hue every 5 seconds.
 */
export const useColorShift = () => {
  useEffect(() => {
    let currentHue = 310; // Start with pink
    let animationFrameId: number;
    let lastTimestamp = 0;
    const hueShiftDuration = 5000; // 5 seconds per color transition
    const fullCycleDuration = 360 * hueShiftDuration / 60; // Time to complete full spectrum (360 degrees)

    const updateColors = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;

      // Calculate hue increment based on elapsed time
      // We want to shift 60 degrees (to next major color) every 5 seconds
      const hueIncrement = (60 / hueShiftDuration) * elapsed;
      currentHue = (currentHue + hueIncrement) % 360;
      lastTimestamp = timestamp;

      // Update CSS variables with new hue values
      // Primary color (main pink/accent)
      const primaryHue = currentHue;
      // Accent color (shifted 20 degrees for variety)
      const accentHue = (currentHue - 20 + 360) % 360;
      // Portfolio accent (shifted -10 degrees)
      const portfolioAccentHue = (currentHue - 10 + 360) % 360;

      const root = document.documentElement;

      // Update all color variables while maintaining their saturation and lightness
      root.style.setProperty('--background', `${primaryHue} 25% 6%`);
      root.style.setProperty('--foreground', `${primaryHue} 10% 95%`);
      root.style.setProperty('--card', `${primaryHue} 20% 9%`);
      root.style.setProperty('--card-foreground', `${primaryHue} 10% 95%`);
      root.style.setProperty('--popover', `${primaryHue} 20% 9%`);
      root.style.setProperty('--popover-foreground', `${primaryHue} 10% 95%`);
      root.style.setProperty('--primary', `${primaryHue} 70% 70%`);
      root.style.setProperty('--primary-foreground', `${primaryHue} 10% 95%`);
      root.style.setProperty('--secondary', `${primaryHue} 15% 16%`);
      root.style.setProperty('--secondary-foreground', `${primaryHue} 10% 95%`);
      root.style.setProperty('--muted', `${primaryHue} 15% 16%`);
      root.style.setProperty('--muted-foreground', `${primaryHue} 8% 62%`);
      root.style.setProperty('--accent', `${accentHue} 65% 75%`);
      root.style.setProperty('--accent-foreground', `${primaryHue} 10% 95%`);
      root.style.setProperty('--border', `${primaryHue} 15% 16%`);
      root.style.setProperty('--input', `${primaryHue} 15% 16%`);
      root.style.setProperty('--ring', `${primaryHue} 70% 70%`);

      // Portfolio specific colors
      root.style.setProperty('--portfolio-glow', `${primaryHue} 70% 70%`);
      root.style.setProperty('--portfolio-accent', `${accentHue} 65% 75%`);
      root.style.setProperty('--portfolio-cta', `${portfolioAccentHue} 60% 65%`);
      root.style.setProperty('--portfolio-section', `${primaryHue} 20% 8%`);

      // Sidebar colors
      root.style.setProperty('--sidebar-background', `${primaryHue} 20% 9%`);
      root.style.setProperty('--sidebar-foreground', `${primaryHue} 10% 95%`);
      root.style.setProperty('--sidebar-primary', `${primaryHue} 70% 70%`);
      root.style.setProperty('--sidebar-primary-foreground', `${primaryHue} 10% 95%`);
      root.style.setProperty('--sidebar-accent', `${primaryHue} 15% 16%`);
      root.style.setProperty('--sidebar-accent-foreground', `${primaryHue} 10% 95%`);
      root.style.setProperty('--sidebar-border', `${primaryHue} 15% 16%`);
      root.style.setProperty('--sidebar-ring', `${primaryHue} 70% 70%`);

      // Update gradients
      root.style.setProperty(
        '--gradient-primary',
        `linear-gradient(135deg, hsl(${primaryHue} 70% 70%), hsl(${accentHue} 65% 75%))`
      );
      root.style.setProperty(
        '--gradient-card',
        `linear-gradient(145deg, hsl(${primaryHue} 20% 9%), hsl(${primaryHue} 20% 8%))`
      );
      root.style.setProperty(
        '--gradient-text',
        `linear-gradient(120deg, hsl(${primaryHue} 70% 70%), hsl(${accentHue} 65% 75%))`
      );
      root.style.setProperty(
        '--shadow-glow',
        `0 0 40px hsl(${primaryHue} 70% 70% / 0.3)`
      );

      animationFrameId = requestAnimationFrame(updateColors);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(updateColors);

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
};
