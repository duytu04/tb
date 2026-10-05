export default function Gallery() {
  return (
    <section id="gallery" className="section" style={{ backgroundColor: "var(--color-bg-alt)" }}>
        <div className="container">
          <div className="section-title-wrap reveal-on-scroll">
            <div className="section-subtitle">KHOẢNH KHẮC YÊU THƯƠNG</div>
            <h2 className="section-title">Album Ảnh Cưới</h2>
            <img src="/assets/a-c179cc81.svg" alt="Ornament" className="ornament-divider" />
          </div>
    
          
          <div className="gallery-slider-wrapper film-reel reveal-on-scroll">
            
            <button id="gallery-prev" className="slider-nav-btn prev" aria-label="Xem ảnh trước">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
    
            
            <div id="gallery-slider" className="gallery-slider-track">
              
              <div className="gallery-slide-card" data-index="0">
                <img src="/assets/a-2f791d8d.webp" alt="Trọn vẹn tình yêu • Lễ Thành Hôn" loading="lazy" decoding="async" />
                <div className="gallery-overlay">
                  <span className="gallery-caption">Trọn vẹn tình yêu • Lễ Thành Hôn</span>
                </div>
              </div>
    
              
              <div className="gallery-slide-card" data-index="1">
                <img src="/assets/a-327ba9cf.webp" alt="Ánh hoàng hôn bên em" loading="lazy" decoding="async" />
                <div className="gallery-overlay">
                  <span className="gallery-caption">Ánh hoàng hôn bên em</span>
                </div>
              </div>
    
              
              <div className="gallery-slide-card" data-index="2">
                <img src="/assets/a-fc9c5802.webp" alt="Duyên nợ trăm năm • Áo dài truyền thống" loading="lazy" decoding="async" />
                <div className="gallery-overlay">
                  <span className="gallery-caption">Duyên nợ trăm năm • Áo dài truyền thống</span>
                </div>
              </div>
    
              
              <div className="gallery-slide-card" data-index="3">
                <img src="/assets/a-40380709.webp" alt="Nụ cười hạnh phúc ngày trọng đại" loading="lazy" decoding="async" />
                <div className="gallery-overlay">
                  <span className="gallery-caption">Nụ cười hạnh phúc ngày trọng đại</span>
                </div>
              </div>
    
              
              <div className="gallery-slide-card" data-index="4">
                <img src="/assets/a-9f085cf3.webp" alt="Tay trong tay trọn đời bình yên" loading="lazy" decoding="async" />
                <div className="gallery-overlay">
                  <span className="gallery-caption">Tay trong tay trọn đời bình yên</span>
                </div>
              </div>
    
              
              <div className="gallery-slide-card" data-index="5">
                <img src="/assets/a-d91643ec.webp" alt="Hạnh phúc đong đầy" loading="lazy" decoding="async" />
                <div className="gallery-overlay">
                  <span className="gallery-caption">Hạnh phúc đong đầy</span>
                </div>
              </div>
            </div>
    
            
            <button id="gallery-next" className="slider-nav-btn next" aria-label="Xem ảnh kế tiếp">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
    
          
          <p id="gallery-film-caption" className="film-caption" aria-live="polite" />
          <div id="gallery-dots" className="slider-dots-container" />
        </div>
      </section>
  )
}
