export default function MapModal() {
  return (
    <div id="map-modal" className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="map-modal-title" aria-hidden="true">
        <div className="map-modal-card" tabIndex={-1}>
          <button id="btn-close-map" className="btn-close-modal" aria-label="Đóng bản đồ">×</button>
    
          <div style={{ textAlign: "center" }}>
            <div className="section-subtitle">CHỈ ĐƯỜNG &amp; VỊ TRÍ</div>
            <h3 id="map-modal-title" className="section-title" style={{ fontSize: "1.8rem", marginBottom: 5 }}>Chọn Bản Đồ Sự
              Kiện</h3>
            <img src="/assets/a-c179cc81.svg" alt="" className="ornament-divider" style={{ width: 120, height: 16, margin: "4px auto 14px" }} aria-hidden="true" />
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              Vui lòng chọn địa điểm gia đình bạn muốn tới để xem bản đồ và nhận chỉ đường:
            </p>
          </div>
    
          
          <div className="map-modal-tabs" role="tablist">
            <button className="map-modal-tab-btn active" role="tab" data-target="modal-tab-groom" aria-controls="modal-tab-groom" aria-selected="true">
              Nhà Trai (Hà Nội)
            </button>
            <button className="map-modal-tab-btn" role="tab" data-target="modal-tab-bride" aria-controls="modal-tab-bride" aria-selected="false">
              Nhà Gái (Thanh Hóa)
            </button>
          </div>
    
          
          <div id="modal-tab-groom" className="map-modal-tab-content active" role="tabpanel">
            <div className="map-modal-info-box">
              <div className="map-modal-event">LỄ THÀNH HÔN &amp; TIỆC CƯỚI</div>
              <div className="map-modal-venue">Nhà Văn Hóa Thôn Ngãi Cầu</div>
              <div className="map-modal-addr">Thôn Ngãi Cầu, xã An Khánh, huyện Hoài Đức, TP. Hà Nội</div>
              <div className="map-modal-time">11:00 Trưa • Thứ Ba, 20/10/2026</div>
            </div>
    
            <div className="map-modal-iframe-wrap">
              <iframe src="https://maps.google.com/maps?q=Nh%C3%A0+v%C4%83n+h%C3%B3a+th%C3%B4n+Ng%C3%A3i+C%E1%BA%A7u+An+Kh%C3%A1nh+Ho%C3%A0i+%C4%90%E1%BB%A9c+H%C3%A0+N%E1%BB%99i&t=&z=15&ie=UTF8&iwloc=&output=embed" title="Bản đồ Nhà Trai" loading="lazy" allowFullScreen>
              </iframe>
            </div>
    
            <a href="https://www.google.com/maps/search/?api=1&query=Nh%C3%A0+v%C4%83n+h%C3%B3a+th%C3%B4n+Ng%C3%A3i+C%E1%BA%A7u+An+Kh%C3%A1nh+Ho%C3%A0i+%C4%90%E1%BB%A9c+H%C3%A0+N%E1%BB%99i" target="_blank" rel="noopener noreferrer" className="btn-modal-maps">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Mở Google Maps Chỉ Đường Nhà Trai
            </a>
          </div>
    
          
          <div id="modal-tab-bride" className="map-modal-tab-content" role="tabpanel">
            <div className="map-modal-info-box">
              <div className="map-modal-event">LỄ NẠP TÀI</div>
              <div className="map-modal-venue">Tại Tư Gia Nhà Gái</div>
              <div className="map-modal-addr">TDP Hải Châu, phường Ngọc Sơn, thị xã Nghi Sơn, tỉnh Thanh Hóa</div>
              <div className="map-modal-time">08:00 Sáng • Chủ Nhật, 18/10/2026</div>
            </div>
    
            <div className="map-modal-iframe-wrap">
              <iframe src="https://maps.google.com/maps?q=TDP+H%E1%BA%A3i+Ch%C3%A2u+Ng%E1%BB%8Dc+S%C6%A1n+Nghi+S%C6%A1n+Thanh+H%C3%B3a&t=&z=15&ie=UTF8&iwloc=&output=embed" title="Bản đồ Nhà Gái" loading="lazy" allowFullScreen>
              </iframe>
            </div>
    
            <a href="https://www.google.com/maps/search/?api=1&query=TDP+H%E1%BA%A3i+Ch%C3%A2u+Ng%E1%BB%8Dc+S%C6%A1n+Nghi+S%C6%A1n+Thanh+H%C3%B3a" target="_blank" rel="noopener noreferrer" className="btn-modal-maps">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Mở Google Maps Chỉ Đường Nhà Gái
            </a>
          </div>
        </div>
      </div>
  )
}
