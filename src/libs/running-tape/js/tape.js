import DOMmanager from './modules/dom-manager.js';
import Animator from './modules/animator.js';
import Observer from './modules/observer.js';

const { log } = console;

export default class Tape {
  #rootElem;
  #domManager;
  #animator;
  #observer;
  #options;

  constructor({ rootElem, cssGap = 0, speed = 1.3 }) {
    this.isValidRoot = rootElem instanceof Element;
    if (!this.isValidRoot) return;

    cssGap = Number.parseFloat(cssGap);
    this.#rootElem = rootElem;
    this.#domManager = new DOMmanager(this.#rootElem, { cssGap });
    this.#domManager.init();
    this.#domManager.fitScreen();

    this.#animator = new Animator({
      container: this.#domManager.groupsContainer,
      stepSize: speed,
    });

    this.#observer = new Observer(this.#handleIntersection.bind(this), {
      root: this.#rootElem,
      threshold: 0,
    });
    this.#observe();

    this.#options = { cssGap };
  }

  start() {
    if (!this.isValidRoot) return;
    this.#animator.start();
  }
  stop() {
    if (!this.isValidRoot) return;
    this.#animator.stop();
  }
  toggleDirection() {
    if (!this.isValidRoot) return;
    this.#animator.toggleDirection();
  }

  #handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting === false) {
        const groupWidth = entry.boundingClientRect.width;

        if (this.#animator.direction === 'left') {
          this.#animator.positionX = groupWidth * -1;
        }
        if (this.#animator.direction === 'right') {
          this.#animator.positionX =
            this.#animator.positionX - (groupWidth + this.#options.cssGap);
        }
      }
    });
  }

  #observe() {
    const middleGroup = this.#domManager.groupsContainer.children[1]; // 2nd from 3
    this.#observer.observe(middleGroup);
  }
}
