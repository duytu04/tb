export default function Family() {
  return (
    <section id="family" className="section">
        <div className="container">
          <div className="invitation-intro-card reveal-on-scroll">
            <div className="section-subtitle">LỜI NGỎ</div>
            <h2 className="section-title">Trân Trọng Kính Mời</h2>
            <img src="/assets/a-c179cc81.svg" alt="Ornament" className="ornament-divider" style={{ marginBottom: 25 }} />
    
            <p className="intro-lead-text">
              TỚI DỰ BỮA CƠM THÂN MẬT CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI<br />
              Sự hiện diện của Quý khách là niềm vinh hạnh to lớn cho gia đình và là lời chúc phúc quý báu nhất dành cho
              chúng tôi!
            </p>
    
            
            <div className="families-grid">
              
              <div className="family-card reveal-on-scroll stagger-1">
                <div className="family-badge">Nhà Trai</div>
                <div className="family-parents">
                  <div>ÔNG: <strong>NGUYỄN VIẾT THẮNG</strong></div>
                  <div>BÀ: <strong>BÙI THỊ XUÂN</strong></div>
                </div>
                <div className="family-address">
                  Thôn Ngãi Cầu, xã An Khánh<br />huyện Hoài Đức, TP. Hà Nội
                </div>
              </div>
    
              
              <div className="family-card reveal-on-scroll stagger-2">
                <div className="family-badge">Nhà Gái</div>
                <div className="family-parents">
                  <div>ÔNG: <strong>HOÀNG VĂN HÒA</strong></div>
                  <div>BÀ: <strong>NGUYỄN THỊ LAI</strong></div>
                </div>
                <div className="family-address">
                  TDP Hải Châu, phường Ngọc Sơn<br />thị xã Nghi Sơn, tỉnh Thanh Hóa
                </div>
              </div>
            </div>
    
            <div className="honored-quote">
              “Rất hân hạnh được đón tiếp Quý khách!”
            </div>
          </div>
        </div>
      </section>
  )
}
