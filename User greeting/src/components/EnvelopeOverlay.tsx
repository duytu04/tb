import OpeningAlbum from './OpeningAlbum'

const WEDDING_DAY = new Date(2026, 9, 20)

/* Tên khách lấy từ link riêng: ?khach=Anh%20Minh (hoặc ?to=) */
function guestName() {
  const params = new URLSearchParams(window.location.search)
  const name = (params.get('khach') || params.get('to') || '').trim().slice(0, 32)
  return name || 'Quý Khách'
}

function daysLeft() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((WEDDING_DAY.getTime() - today.getTime()) / 86400000)
}

const DUST = Array.from({ length: 14 }, (_, i) => i)

export default function EnvelopeOverlay() {
  const guest = guestName()
  const days = daysLeft()
  return (
    <div id="envelope-overlay" role="dialog" aria-modal="true" aria-labelledby="opening-title" aria-describedby="opening-instruction" aria-hidden="false">
        <div className="opening-paper-grain" aria-hidden="true" />
        <div className="opening-frame opening-frame-left" aria-hidden="true" />
        <div className="opening-frame opening-frame-right" aria-hidden="true" />
        <div className="opening-floral opening-floral-left" aria-hidden="true">
          <img src="/assets/a-713aefaa.svg" alt="" />
        </div>
        <div className="opening-floral opening-floral-right" aria-hidden="true">
          <img src="/assets/a-713aefaa.svg" alt="" />
        </div>
        <div className="opening-light-sweep" aria-hidden="true" />
        <div className="opening-candle-glow" aria-hidden="true" />
        <div className="opening-dust" aria-hidden="true">
          {DUST.map(i => <span key={i} />)}
        </div>
    
        
        <div className="envelope-ambient-bg">
          <div className="ambient-glow glow-1" />
          <div className="ambient-glow glow-2" />
        </div>
    
        
        <div className="opening-dissolve-veil" aria-hidden="true" />

        <div className="envelope-scene">
          <header className="opening-copy">
            <p className="opening-kicker">LỄ THÀNH HÔN</p>
            <h1 id="opening-title" className="opening-couple-names">
              <span>Tuấn Anh</span>
              <span className="opening-ampersand" aria-hidden="true">&amp;</span>
              <span>Hoàng Thúy</span>
            </h1>
            <div className="opening-date-line" aria-label="Thứ Ba, ngày 20 tháng 10 năm 2026">
              <span>THỨ BA</span>
              <strong>20</strong>
              <span>10 . 2026</span>
            </div>
          </header>
    
          <div className="envelope-stage">
            <div id="silk-stage" aria-hidden="true" />
            <div className="envelope-halo" aria-hidden="true" />
            <div className="envelope-3d-box" id="envelope-3d-box">
    
              
              <div className="envelope-back-inside">
                <div className="inside-gold-pattern" />
                <div className="envelope-inner-glow" aria-hidden="true" />
              </div>
    
              
              <div className="envelope-letter" id="envelope-letter">
                <div className="letter-album-proxy" aria-hidden="true">
                  <img src="/assets/a-b554616e.svg" alt="" />
                </div>
                <div className="letter-shimmer" />
                <div className="letter-inner">
                  <img src="/assets/a-65cf8d5c.svg" alt="" className="letter-corner lt" />
                  <img src="/assets/a-65cf8d5c.svg" alt="" className="letter-corner rt" />
                  <img src="/assets/a-65cf8d5c.svg" alt="" className="letter-corner lb" />
                  <img src="/assets/a-65cf8d5c.svg" alt="" className="letter-corner rb" />
    
                  <img src="/assets/a-b554616e.svg" alt="AT Monogram" className="letter-monogram" />
                  <div className="letter-save-date">Save the Date</div>
                  <img src="/assets/a-c179cc81.svg" alt="" className="letter-ornament" />
    
                  <div className="letter-names">Tuấn Anh <span className="letter-amp">&amp;</span> Hoàng Thúy</div>
    
                  <div className="letter-date-badge">
                    <span className="letter-date-day">THỨ BA</span>
                    <span className="letter-date-num">20</span>
                    <span className="letter-date-month">10 . 2026</span>
                  </div>
                </div>
              </div>
    
              
              <div className="envelope-front-pocket">
                
                <svg className="pocket-fold-line" viewBox="0 0 420 180" preserveAspectRatio="none">
                  <path d="M 0,0 L 210,165 L 420,0" fill="none" stroke="rgba(197, 155, 39, 0.55)" strokeWidth={1.5} strokeDasharray="6 3" />
                </svg>
                <img src="/assets/a-713aefaa.svg" alt="" className="pocket-floral" />
                <div className="pocket-decor-text">
                  <div className="pocket-names">Tuấn Anh &amp; Hoàng Thúy</div>
                  <div className="pocket-guest-box">
                    <span className="pocket-guest-label">Kính mời:</span>
                    <span className="pocket-guest-val">{guest}</span>
                  </div>
                </div>
              </div>
    
              
              <div className="envelope-top-flap" id="envelope-top-flap">
                <svg className="flap-svg-shape" viewBox="0 0 420 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#EFE8D8" />
                    </linearGradient>
                    <linearGradient id="flapGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#DFBA5A" />
                      <stop offset="50%" stopColor="#B8860B" />
                      <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                    <filter id="flapShadow" x="-10%" y="0%" width="120%" height="150%">
                      <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="rgba(0,0,0,0.18)" />
                    </filter>
                  </defs>
                  <path d="M 0,0 L 420,0 L 214,161 Q 210,165 206,161 L 0,0 Z" fill="url(#flapGrad)" stroke="url(#flapGold)" strokeWidth={1.5} filter="url(#flapShadow)" />
                  <path d="M 16,6 L 404,6 L 214,151 Q 210,155 206,151 L 16,6 Z" fill="none" stroke="rgba(197, 155, 39, 0.35)" strokeWidth={1} strokeDasharray="4 3" />
                </svg>
    
                
                <div className="envelope-stamp" aria-hidden="true">
                  <div className="stamp-paper">
                    <img src="/assets/a-b554616e.svg" alt="" />
                    <span>20·10</span>
                  </div>
                  <svg className="stamp-postmark" viewBox="0 0 100 100">
                    <defs>
                      <path id="postmark-arc" d="M 50,50 m -33,0 a 33,33 0 1,1 66,0 a 33,33 0 1,1 -66,0" />
                    </defs>
                    <circle cx="50" cy="50" r="44" />
                    <circle cx="50" cy="50" r="24" />
                    <text><textPath href="#postmark-arc">HÀ NỘI · 20.10.2026 ·</textPath></text>
                    <path className="stamp-cancel" d="M 96,38 q 12,-6 24,0 t 24,0 t 24,0 M 96,50 q 12,-6 24,0 t 24,0 t 24,0 M 96,62 q 12,-6 24,0 t 24,0 t 24,0" />
                  </svg>
                </div>

                <div className="flap-wax-seal" id="flap-wax-seal" role="button" tabIndex={0} aria-label="Mở thiệp bằng con dấu sáp">
                  <div className="wax-seal-wrapper">
                    <div className="wax-ripple ripple-1" />
                    <div className="wax-ripple ripple-2" />
                    <span className="wax-spark wax-spark-1" aria-hidden="true" />
                    <span className="wax-spark wax-spark-2" aria-hidden="true" />
                    <span className="wax-spark wax-spark-3" aria-hidden="true" />
                    <span className="wax-spark wax-spark-4" aria-hidden="true" />
                    <span className="wax-spark wax-spark-5" aria-hidden="true" />
                    <img src="/assets/a-9eadb03d.svg" alt="" className="wax-seal-3d-img" />
                    <span className="wax-glint" aria-hidden="true" />
                  </div>
                </div>
              </div>
    
            </div>
            <div className="opening-envelope-shadow" aria-hidden="true" />
            <OpeningAlbum />
          </div>
    
          
          <div className="envelope-action-prompt">
            <p id="opening-instruction" className="opening-instruction">
              <span className="instruction-tap" aria-hidden="true" />
              Chạm vào con dấu để mở thiệp
            </p>
          </div>
          <p className="opening-footer">
            Trân trọng kính mời {guest}
            {days > 0 && (
              <span className="opening-countdown">
                <span className="countdown-rule" aria-hidden="true" />
                còn <strong>{days}</strong> ngày
                <span className="countdown-rule" aria-hidden="true" />
              </span>
            )}
          </p>
        </div>
        <p id="opening-status" className="sr-only" aria-live="polite" />
      </div>
  )
}
