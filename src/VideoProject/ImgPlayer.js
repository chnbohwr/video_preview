/**
 * 把圖片的播放 api 仿照 video 的 api 建立一份
 */
export default class ImgPlayer {
  constructor(interval) {
    this.currentTime = 0;
    this.interval = interval;
    this.id = 0;
  }

  play = () => {
    this.id = setInterval(() => {
      if (this.currentTime >= this.interval) {
        clearInterval(this.id);
        this.onended();
      } else {
        this.ontimeupdate(this.currentTime);
        this.currentTime += 0.1;
      }
    }, 100);
  }

  pause = () => {
    clearInterval(this.id);
  }

  onended = () => { }
  ontimeupdate = () => { }
}
