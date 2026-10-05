export default function MobileDock() {
  return (
    <nav className="mobile-bottom-dock" id="mobile-bottom-dock" aria-label="Thanh tác vụ nhanh cho điện thoại">
        <a href="#events" className="dock-item" aria-label="Lịch trình sự kiện">
          <div className="dock-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <span className="dock-text">Sự Kiện</span>
        </a>
    
        <button type="button" className="dock-item btn-open-map-modal" aria-label="Xem bản đồ chọn Nhà Trai hoặc Nhà Gái">
          <div className="dock-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <span className="dock-text">Bản Đồ</span>
        </button>
    
        <button type="button" className="dock-item dock-item-highlight btn-open-gift-modal" aria-label="Mở hộp mừng cưới QR">
          <div className="dock-highlight-circle">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="8" width="18" height="13" rx="2" />
              <path d="M12 8v13" />
              <path d="M19 12H5" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.5 4.5 0 0 1 12 7.5a4.5 4.5 0 0 1 4.5-4.5 2.5 2.5 0 0 1 0 5" />
            </svg>
          </div>
          <span className="dock-text">Mừng Cưới</span>
        </button>
    
        <a href="#rsvp" className="dock-item" aria-label="Xác nhận tham dự">
          <div className="dock-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <span className="dock-text">Xác Nhận</span>
        </a>
    
        <button type="button" className="dock-item" id="dock-music-btn" aria-label="Bật hoặc tắt nhạc nền" aria-pressed="false">
          <div className="dock-icon dock-music-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <span className="dock-text dock-music-text">Nhạc</span>
        </button>
      </nav>
  )
}
