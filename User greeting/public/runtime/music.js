
/**
 * Wedding Background Music Controller
 * Song: "I Do (Em Đồng Ý)" - 911 x Đức Phúc
 * Plays local high-quality MP3 with seamless loop and volume fade-in.
 */

class WeddingMusicPlayer {
  constructor() {
    const audioSrc = window.WEDDING_CONFIG?.music?.audioSrc || '/assets/a-1b693d1d.mp3';
    this.audio = new Audio(audioSrc);
    this.audio.loop = true;
    this.audio.preload = 'none';
    this.audio.volume = 0.6; // comfortable background volume
    this.isPlaying = false;

    // Listen to play/pause state from the audio element
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updateBtnState(true);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updateBtnState(false);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.updateBtnState(false);
    });
  }

  updateBtnState(playing) {
    const musicBtn = document.getElementById('floating-music-btn');
    if (musicBtn) {
      if (playing) {
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('aria-pressed', 'true');
      } else {
        musicBtn.classList.remove('playing');
        musicBtn.setAttribute('aria-pressed', 'false');
      }
    }

    const dockMusicBtn = document.getElementById('dock-music-btn');
    if (dockMusicBtn) {
      const musicText = dockMusicBtn.querySelector('.dock-music-text');
      if (playing) {
        dockMusicBtn.classList.add('playing');
        dockMusicBtn.setAttribute('aria-pressed', 'true');
        if (musicText) musicText.textContent = 'Đang phát';
      } else {
        dockMusicBtn.classList.remove('playing');
        dockMusicBtn.setAttribute('aria-pressed', 'false');
        if (musicText) musicText.textContent = 'Nhạc';
      }
    }
  }

  play() {
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.updateBtnState(true);
        })
        .catch((err) => {
          console.warn('Autoplay was prevented or audio waiting for interaction:', err);
          this.isPlaying = false;
          this.updateBtnState(false);
        });
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updateBtnState(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}

window.weddingMusic = new WeddingMusicPlayer();

