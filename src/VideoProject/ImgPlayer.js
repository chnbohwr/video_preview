/**
 * 把圖片的播放 api 仿照 video 的 api 建立一份
 */
export default class ImgPlayer {
  constructor(interval) {
    this.currentTime = 0;
    this.interval = interval;
    this.intervalId = 0;
  }

  play = () => {
    if (this.intervalId) { clearInterval(this.intervalId); this.intervalId = 0; }
    this.intervalId = setInterval(() => {
      if (this.currentTime >= this.interval) {
        clearInterval(this.intervalId);
        this.onended();
      } else {
        this.ontimeupdate(this.currentTime);
        this.currentTime += 0.1;
      }
    }, 100);
  }

  pause = () => {
    clearInterval(this.intervalId);
  }

  onended = () => { }
  ontimeupdate = () => { }
}
