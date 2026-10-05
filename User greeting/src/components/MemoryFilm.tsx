export default function MemoryFilm() {
  return (
    <section id="memory-film" className="memory-film-section" aria-labelledby="memory-film-title">
        <div className="memory-film-background" aria-hidden="true" />
        <div className="container">
          <div className="memory-film-layout">
            <div className="memory-film-copy reveal-on-scroll">
              <div className="memory-film-kicker">NHỮNG MÙA TA ĐÃ ĐI QUA</div>
              <h2 id="memory-film-title" className="memory-film-title">Hành Trình<br /><em>Đến Ngày Hôm Nay</em></h2>
              <p className="memory-film-description">Từ những ngày đầu gặp gỡ đến lời hẹn ước cho một mái nhà chung - những
                khoảnh khắc đẹp nhất của chúng mình trong một thước phim.</p>
              <div className="memory-film-years" aria-label="Hành trình từ năm 2022 đến năm 2026">
                <span>2022</span>
                <i aria-hidden="true" />
                <span>2026</span>
              </div>
            </div>
    
            <div className="memory-film-player reveal-on-scroll stagger-1" id="memory-film-player" data-state="loading">
              <video id="memory-film-video" className="memory-film-video" controls playsInline preload="none" poster="/assets/a-8288396b.webp" aria-label="Thước phim hành trình của Tuấn Anh và Hoàng Thúy" />
              <div className="memory-film-placeholder" id="memory-film-placeholder" aria-live="polite">
                <img src="/assets/a-8288396b.webp" alt="" loading="lazy" decoding="async" />
                <span className="memory-film-placeholder-shade" aria-hidden="true" />
                <span className="memory-film-placeholder-text" id="memory-film-placeholder-text">Đang tải thước phim...</span>
              </div>
              <button id="memory-film-unmute" className="memory-film-unmute" type="button" hidden aria-label="Bật tiếng thước phim" title="Bật tiếng thước phim">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                  <path d="M16 9a5 5 0 0 1 0 6M19 6a9 9 0 0 1 0 12" />
                </svg>
                <span>Bật tiếng</span>
              </button>
              <button id="memory-film-retry" className="memory-film-retry" type="button" hidden aria-label="Phát thước phim" title="Phát thước phim">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path d="M8 5.8v12.4L18.2 12 8 5.8Z" fill="currentColor" strokeLinejoin="round" />
                </svg>
                <span>Phát phim</span>
              </button>
            </div>
          </div>
        </div>
      </section>
  )
}
