export default function Footer() {
  return (
    <footer className="footer">
        <div className="container">
          <img src="/assets/a-b554616e.svg" alt="Monogram AT" className="footer-monogram" />
    
          <div className="footer-names">Tuấn Anh &amp; Hoàng Thúy</div>
    
          <div className="footer-thank-you">Thank You!</div>
    
          <img src="/assets/a-c179cc81.svg" alt="Ornament" className="ornament-divider" style={{ filter: "brightness(1.5)", marginBottom: 20 }} />
    
          <p className="footer-quote">
            “Cảm ơn tình cảm và sự hiện diện của bạn trong ngày hạnh phúc nhất của chúng tôi!”
          </p>
    
          <div className="footer-credit">
            Wedding Invitation • 20.10.2026 • Thiết kế độc quyền theo phong cách thiệp cưới Tuấn Anh &amp; Hoàng Thúy
          </div>
    
          <div className="footer-admin-link" style={{ marginTop: 18 }}>
            <a href="admin.html" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-gold)", fontSize: "0.82rem", textDecoration: "none", opacity: "0.75", display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(197, 160, 89, 0.3)", transition: "all 0.3s ease" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                </path>
              </svg>
              <span>Quản trị nội dung thiệp</span>
            </a>
          </div>
        </div>
      </footer>
  )
}
