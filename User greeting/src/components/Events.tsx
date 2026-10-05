export default function Events() {
  return (
    <section id="events" className="section" style={{ backgroundColor: "var(--color-bg-alt)" }}>
        <div className="container">
          <div className="section-title-wrap reveal-on-scroll">
            <div className="section-subtitle">THỜI GIAN &amp; ĐỊA ĐIỂM</div>
            <h2 className="section-title">Lịch Trình Sự Kiện</h2>
            <img src="/assets/a-c179cc81.svg" alt="Ornament" className="ornament-divider" />
          </div>
    
          <div className="events-grid">
            
            <div className="event-card reveal-on-scroll stagger-1">
              <span className="event-highlight-tag">TẠI TƯ GIA NHÀ GÁI</span>
    
              <div className="event-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                  </path>
                </svg>
              </div>
    
              <h3 className="event-title">LỄ NẠP TÀI</h3>
              <div className="event-host">Gia Đình Nhà Gái</div>
    
              <div className="event-datetime-box">
                <span className="event-time">08:00 SÁNG</span>
                <div className="event-date">Chủ Nhật, ngày 18 - 10 - 2026</div>
                <div className="event-lunar">(Tức ngày 09 tháng 09 năm Bính Ngọ)</div>
              </div>
    
              <div className="event-location">
                <div className="location-name">Tại Tư Gia Nhà Gái</div>
                <div className="location-address">TDP Hải Châu, phường Ngọc Sơn, thị xã Nghi Sơn, tỉnh Thanh Hóa</div>
              </div>
    
              <div className="event-actions">
                <button type="button" className="btn-event btn-event-primary btn-open-map-modal" data-tab-target="modal-tab-bride" aria-label="Xem bản đồ chỉ đường Nhà Gái">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Xem Bản Đồ
                </button>
                <button onClick={event => { (window as any).addToCalendar('Lễ Nạp Tài - Tuấn Anh & Hoàng Thúy', 'TDP Hải Châu, phường Ngọc Sơn, TX Nghi Sơn, Thanh Hóa', '20261018T080000', '20261018T120000', 'Lễ Nạp Tài tại gia đình nhà gái'); }} className="btn-event btn-event-outline">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Lưu Lịch
                </button>
              </div>
            </div>
    
            
            <div className="event-card reveal-on-scroll stagger-2">
              <span className="event-highlight-tag">TẠI GIA ĐÌNH NHÀ TRAI</span>
    
              <div className="event-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
    
              <h3 className="event-title">LỄ THÀNH HÔN &amp; TIỆC CƯỚI</h3>
              <div className="event-host">Gia Đình Nhà Trai</div>
    
              <div className="event-datetime-box">
                <span className="event-time">11:00 TRƯA</span>
                <div className="event-date">Thứ Ba, ngày 20 - 10 - 2026</div>
                <div className="event-lunar">(Tức ngày 11 tháng 09 năm Bính Ngọ)</div>
              </div>
    
              <div className="event-location">
                <div className="location-name">Nhà Văn Hóa Thôn Ngãi Cầu</div>
                <div className="location-address">Thôn Ngãi Cầu, xã An Khánh, huyện Hoài Đức, TP. Hà Nội</div>
              </div>
    
              <div className="event-actions">
                <button type="button" className="btn-event btn-event-primary btn-open-map-modal" data-tab-target="modal-tab-groom" aria-label="Xem bản đồ chỉ đường Nhà Trai">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Xem Bản Đồ
                </button>
                <button onClick={event => { (window as any).addToCalendar('Lễ Thành Hôn - Tuấn Anh & Hoàng Thúy', 'Nhà văn hóa thôn Ngãi Cầu, xã An Khánh, Hoài Đức, Hà Nội', '20261020T110000', '20261020T150000', 'Lễ Thành Hôn và tiệc cưới tại gia đình nhà trai'); }} className="btn-event btn-event-outline">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Lưu Lịch
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
