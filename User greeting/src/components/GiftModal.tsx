export default function GiftModal() {
  return (
    <div id="gift-modal" className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="gift-modal-title" aria-hidden="true">
        <div className="gift-modal-card" tabIndex={-1}>
          <button id="btn-close-gift" className="btn-close-modal" aria-label="Đóng hộp mừng cưới">×</button>
    
          <div style={{ textAlign: "center" }}>
            <div className="section-subtitle">HỘP MỪNG CƯỚI</div>
            <h3 id="gift-modal-title" className="section-title" style={{ fontSize: "1.8rem", marginBottom: 5 }}>Gửi Quà Chúc Phúc
            </h3>
            <img src="/assets/a-c179cc81.svg" alt="" className="ornament-divider" style={{ width: 120, height: 16, margin: "4px auto 14px" }} aria-hidden="true" />
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              Sự hiện diện của bạn là món quà lớn nhất! Nếu bạn ở xa không thể đến dự, bạn có thể gửi quà mừng chúc phúc qua
              tài khoản ngân hàng dưới đây:
            </p>
          </div>
    
          
          <div className="gift-tabs" role="tablist">
            <button className="gift-tab-btn active" role="tab" data-tab="tab-groom" aria-controls="tab-groom" aria-selected="true">Mừng Chú Rể (Tuấn Anh)</button>
            <button className="gift-tab-btn" role="tab" data-tab="tab-bride" aria-controls="tab-bride" aria-selected="false">Mừng Cô Dâu (Hoàng Thúy)</button>
          </div>
    
          
          <div id="tab-groom" className="gift-tab-content active" role="tabpanel">
            <img src="/assets/a-90eb276a.svg" alt="QR Mừng Chú Rể Tuấn Anh" className="qr-image-display" />
            <div className="bank-info-box">
              <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Ngân hàng Vietcombank (CN Thăng Long)</div>
              <div className="bank-account-num">1023 888 999</div>
              <div style={{ fontWeight: "600", color: "var(--color-text-main)" }}>NGUYỄN TUẤN ANH</div>
            </div>
            <button className="btn-copy-account" data-account="1023888999">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Sao Chép Số Tài Khoản
            </button>
          </div>
    
          
          <div id="tab-bride" className="gift-tab-content" role="tabpanel">
            <img src="/assets/a-96957ec2.svg" alt="QR Mừng Cô Dâu Hoàng Thúy" className="qr-image-display" />
            <div className="bank-info-box">
              <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Ngân hàng Techcombank (CN Hà Nội)</div>
              <div className="bank-account-num">1903 666 888</div>
              <div style={{ fontWeight: "600", color: "var(--color-text-main)" }}>HOÀNG THỊ THÚY</div>
            </div>
            <button className="btn-copy-account" data-account="1903666888">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Sao Chép Số Tài Khoản
            </button>
          </div>
        </div>
      </div>
  )
}
