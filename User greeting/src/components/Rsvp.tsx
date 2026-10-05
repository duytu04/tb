export default function Rsvp() {
  return (
    <section id="rsvp" className="section">
        <div className="container">
          <div className="section-title-wrap reveal-on-scroll">
            <div className="section-subtitle">PHÚC ĐÁP</div>
            <h2 className="section-title">Xác Nhận Tham Dự</h2>
            <img src="/assets/a-c179cc81.svg" alt="Ornament" className="ornament-divider" />
            <p style={{ marginTop: 10, color: "var(--color-text-muted)" }}>
              Để gia đình có thể chuẩn bị chu đáo và tiếp đón trọn vẹn nhất, xin Quý khách vui lòng xác nhận tham dự trước
              ngày <strong>15/10/2026</strong>.
            </p>
          </div>
    
          <div className="rsvp-wrapper reveal-on-scroll">
            <form id="rsvp-form">
              <div className="form-group">
                <label className="form-label" htmlFor="rsvp-name">Họ và tên của Quý khách *</label>
                <input type="text" id="rsvp-name" className="form-control" placeholder="Ví dụ: Nguyễn Văn A" required autoComplete="name" />
              </div>
    
              <div className="form-group">
                <label className="form-label" htmlFor="rsvp-phone">Số điện thoại liên hệ</label>
                <input type="tel" id="rsvp-phone" className="form-control" placeholder="Ví dụ: 0912 345 678" autoComplete="tel" inputMode="tel" />
              </div>
    
              <div className="form-group">
                <label className="form-label">Quý khách là khách của?</label>
                <div className="radio-group">
                  <label className="radio-item">
                    <input type="radio" name="guest-side" value="Khách Nhà Trai" defaultChecked />
                    <span>Nhà Trai (Tuấn Anh)</span>
                  </label>
                  <label className="radio-item">
                    <input type="radio" name="guest-side" value="Khách Nhà Gái" />
                    <span>Nhà Gái (Hoàng Thúy)</span>
                  </label>
                  <label className="radio-item">
                    <input type="radio" name="guest-side" value="Bạn Cả Hai" />
                    <span>Bạn của Cả Hai</span>
                  </label>
                </div>
              </div>
    
              <div className="form-group">
                <label className="form-label" htmlFor="rsvp-guests">Số người cùng tham dự</label>
                <select id="rsvp-guests" className="form-control" defaultValue="2 người">
                  <option value="1 người">Đi 1 mình tôi</option>
                  <option value="2 người">Đi cùng 1 người thân (2 người)</option>
                  <option value="3 người">Gia đình 3 người</option>
                  <option value="4+ người">Cả gia đình (4 người trở lên)</option>
                </select>
              </div>
    
              <div className="form-group">
                <label className="form-label">Quý khách có tham dự không?</label>
                <div className="radio-group">
                  <label className="radio-item">
                    <input type="radio" name="guest-attending" value="Chắc chắn tham dự" defaultChecked />
                    <span className="ico-party">Chắc chắn sẽ tới chung vui</span>
                  </label>
                  <label className="radio-item">
                    <input type="radio" name="guest-attending" value="Rất tiếc không thể đến" />
                    <span className="ico-letter">Rất tiếc không thể tham dự</span>
                  </label>
                </div>
              </div>
    
              <div className="form-group">
                <label className="form-label" htmlFor="rsvp-wish">Lời chúc gửi đến Cô dâu &amp; Chú rể</label>
                <textarea id="rsvp-wish" className="form-control" rows={3} placeholder="Gửi lời chúc phúc trăm năm đến Tuấn Anh & Hoàng Thúy..." />
              </div>
    
              <button type="submit" className="btn-submit-rsvp">
                GỬI XÁC NHẬN THAM DỰ
              </button>
            </form>
          </div>
        </div>
      </section>
  )
}
