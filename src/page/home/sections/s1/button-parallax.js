const playButtonParallax = {
  rootElem: document.querySelector('#small-video'),
  button: document.querySelector('.parallax-button'),

  calcPosition({ x, y }) {
    const ratio = 0.05;

    const centerX = this.rootElem.offsetWidth / 2;
    const centerY = this.rootElem.offsetHeight / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;

    const buttonX = (deltaX * ratio).toFixed(1);
    const buttonY = (deltaY * ratio).toFixed(1);

    return { buttonX, buttonY };
  },

  updatePosition({ x, y }) {
    const { buttonX, buttonY } = this.calcPosition({ x, y });

    this.button.style.setProperty('--x', `${buttonX}px`);
    this.button.style.setProperty('--y', `${buttonY}px`);
  },

  watchCursor() {
    if (!this.rootElem || !this.button) return;

    // On mouse enter:
    this.rootElem.onmouseenter = ({ target }) => {
      // show btn-arrow
      this.button.style.opacity = 1;

      // On mouse move:
      target.onmousemove = ({ offsetX: x, offsetY: y }) => {
        if (this.button.matches('.paused')) return;
        this.updatePosition({ x, y });
      };
    };

    // On leave container: hide btn-arrow
    this.rootElem.onmouseleave = () => {
      if (this.button.matches('.playing')) return;
      this.button.style.opacity = 0;
    };
  },
};

playButtonParallax.watchCursor();
