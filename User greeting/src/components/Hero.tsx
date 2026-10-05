export default function Hero() {
  return (
    <section id="hero" className="hero-section">
        <div className="container hero-layout">
          <div className="hero-copy">
            <img src="/assets/a-b554616e.svg" alt="Monogram AT" className="hero-monogram-top reveal-on-scroll" />
            <div className="hero-pretitle reveal-on-scroll">SAVE THE DATE</div>
            <div className="hero-ceremony-type reveal-on-scroll">LỄ THÀNH HÔN</div>
    
            <img src="/assets/a-c179cc81.svg" alt="Ornament" className="ornament-divider reveal-on-scroll" style={{ marginBottom: 25 }} />
    
            <div className="hero-names-display reveal-on-scroll">
              <span className="hero-name">Tuấn Anh</span>
              <span className="hero-ampersand" aria-hidden="true">&amp;</span>
              <span className="hero-name">Hoàng Thúy</span>
            </div>
    
            <p className="hero-time-notice reveal-on-scroll">
              ĐƯỢC TỔ CHỨC VÀO HỒI 11 GIỜ 00 PHÚT
            </p>
    
            
            <div className="hero-date-box reveal-on-scroll">
              <span className="date-day-text">THỨ BA</span>
              <div className="date-circle-wreath">
                <img src="/assets/a-5b380264.svg" alt="Vòng Nguyệt Quế Ngày Cưới" width="85" height="85" />
                <span className="date-number">20</span>
              </div>
              <span className="date-year-text">10 . 2026</span>
            </div>
    
            <div className="hero-lunar-date reveal-on-scroll">(Tức ngày 11 tháng 09 năm Bính Ngọ)</div>
          </div>
    
          
          <div className="hero-visual">
            <div className="hero-photo-wrapper reveal-on-scroll">
              <div className="hero-photo-ambient-glow" aria-hidden="true" />
              <img src="/assets/a-713aefaa.svg" alt="" className="hero-floral-left" aria-hidden="true" />
              <img src="/assets/a-713aefaa.svg" alt="" className="hero-floral-right" aria-hidden="true" />
              <div className="hero-photo-frame">
                <div className="hero-photo-inner">
                  <img src="/assets/a-1638929a.webp" alt="Ảnh Cưới Tuấn Anh & Hoàng Thúy" decoding="async" fetchPriority="high" />
                </div>
              </div>
            </div>
    
            
            <div className="countdown-box reveal-on-scroll">
              <div className="countdown-title">Đếm ngược đến ngày chung đôi</div>
              <div className="countdown-grid">
                <div className="countdown-item">
                  <span id="count-days" className="countdown-num">00</span>
                  <span className="countdown-label">Ngày</span>
                </div>
                <div className="countdown-item">
                  <span id="count-hours" className="countdown-num">00</span>
                  <span className="countdown-label">Giờ</span>
                </div>
                <div className="countdown-item">
                  <span id="count-mins" className="countdown-num">00</span>
                  <span className="countdown-label">Phút</span>
                </div>
                <div className="countdown-item">
                  <span id="count-secs" className="countdown-num">00</span>
                  <span className="countdown-label">Giây</span>
                </div>
              </div>
            </div>
          </div>
    
        </div>
      </section>
  )
}
