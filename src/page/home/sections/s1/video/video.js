export default class HeaderVideo {
  constructor(elem) {
    this.video = elem;
  }

  show() {
    this.video.style.transition = 'opacity 1s';
    this.video.style.opacity = 1;
  }
  hide() {
    this.video.style.transition = 'opacity 1s';
    this.video.style.opacity = 0;
  }
  get isPaused() {
    return this.video.paused;
  }
  get isReady() {
    return this.video.readyState >= 3;
  }

  play() {
    this.video.play();
  }
  stop() {
    this.video.pause();
  }
  toggle() {
    if (this.isPaused) {
      return this.play();
    }
    this.stop();
  }
}
