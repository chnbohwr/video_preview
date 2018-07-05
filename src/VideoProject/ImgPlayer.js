export default class ImgPlayer {
  constructor(ontimeupdate, onended, interval) {
    this.onended = onended;
    this.ontimeupdate = ontimeupdate;
    this.currentTime = 0;
    this.interval = interval;
    this.id = 0;
  }

  play = () => {
    console.log(this.currentTime);
    this.id = setInterval(() => {
      if (this.currentTime / 10 === this.interval) {
        clearInterval(this.id);
        this.onended();
      } else {
        this.ontimeupdate(this.currentTime / 10);
        this.currentTime += 1;
      }
    }, 100);
  };

  pause = () => {
    clearInterval(this.id);
  };

  reset = (currentTime, interval = this.interval) => {
    this.pause();
    this.currentTime = currentTime * 10;
    this.interval = interval;
    this.play();
  };
}
