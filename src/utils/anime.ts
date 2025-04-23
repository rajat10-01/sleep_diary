// Utility for consistent anime.js usage
import animeBase from 'animejs';

// Export anime as a properly typed module with all features
const anime = animeBase;

// Add CSS styles for 3D transformations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .perspective-1000 {
      perspective: 1000px;
    }
    .transform-style-3d {
      transform-style: preserve-3d;
    }
  `;
  document.head.appendChild(style);
}

export default anime; 