interface Memory {
  photo: string
  back: string
  caption: string
  date?: string
  location?: string
}

const memories: Memory[] = [
  {
    photo: '/assets/a-2f791d8d.webp',
    back: '/assets/a-327ba9cf.webp',
    caption: 'Ngày mình có nhau',
    date: 'Tháng 10 · Khởi đầu duyên nợ',
    location: 'Hà Nội'
  },
  {
    photo: '/assets/a-fc9c5802.webp',
    back: '/assets/a-40380709.webp',
    caption: 'Thương nhau một đời',
    date: 'Bình yên những sớm mai',
    location: 'Đà Lạt'
  },
  {
    photo: '/assets/a-9f085cf3.webp',
    back: '/assets/a-d91643ec.webp',
    caption: 'Và hôm nay, chung đôi',
    date: 'Khoảnh khắc trọn vẹn',
    location: 'Sài Gòn'
  },
]

/* Số vòng lò xo — khớp với hàng lỗ đục trong CSS (--rings) */
const RING_COUNT = 17

/* Góc nẹp kim loại vàng giữ ảnh */
function PhotoCorners() {
  return (
    <>
      <span className="photo-corner corner-tl" />
      <span className="photo-corner corner-tr" />
      <span className="photo-corner corner-bl" />
      <span className="photo-corner corner-br" />
    </>
  )
}

const CURL_STRIPS = 4

/* Mặt trước + mặt sau của một dải giấy; mỗi dải chỉ cắt ra phần trang thuộc về nó */
function LeafFaces({ memory, index }: { memory: Memory; index: number }) {
  return (
    <>
                <div className="album-segment-face album-segment-front">
                <div className="album-leaf-front">
                  <div className="album-paper-texture" />
                  <div className="album-page-header">
                    <span className="album-page-label">TUẤN ANH &amp; HOÀNG THÚY</span>
                    <span className="album-page-number">0{index + 1} / 03</span>
                  </div>
                  <figure className="album-photo-mount">
                    <div className="album-photo-frame">
                      <img src={memory.photo} alt="" decoding="async" />
                      <div className="album-photo-glare" />
                      <PhotoCorners />
                    </div>
                    <figcaption>
                      <span className="album-caption-title">{memory.caption}</span>
                      {memory.date && <span className="album-caption-meta">{memory.date}</span>}
                    </figcaption>
                  </figure>
                  <span className="album-filigree">❦</span>
                  <div className="album-under-shade" />
                  <div className="album-turn-shade" />
                </div>
                </div>
  
                <div className="album-segment-face album-segment-back">
                <div className="album-leaf-back">
                  <div className="album-paper-texture" />
                  <div className="album-back-clean">
                    <div className="album-back-border">
                      <img src="/assets/monogram-8409405d.svg" alt="" className="album-back-monogram" aria-hidden="true" />
                      <span className="album-back-brand">Tuấn Anh &amp; Hoàng Thúy</span>
                      <span className="album-back-quote">✦ Kỷ niệm tình yêu ✦</span>
                    </div>
                  </div>
                  <div className="album-turn-shade" />
                </div>
                </div>
    </>
  )
}

/* Nửa dưới chia thành các dải lồng nhau: mỗi dải cong thêm một chút so với dải cha → góc cuộn tròn như giấy thật */
function CurlStrip({ memory, index, level }: { memory: Memory; index: number; level: number }) {
  return (
    <div className={`album-paper-segment album-paper-strip album-strip-${level}`}>
      <LeafFaces memory={memory} index={index} />
      {level < CURL_STRIPS - 1 && <CurlStrip memory={memory} index={index} level={level + 1} />}
    </div>
  )
}

export default function OpeningAlbum() {
  return (
    <div className="album-opening" aria-hidden="true">
      <div className="album-eyebrow-wrap">
        <span className="album-badge-pill">KỶ NIỆM TÌNH YÊU</span>
        <p className="album-eyebrow">MỘT CHUYỆN TÌNH · MỘT ĐỜI BÊN NHAU</p>
      </div>

      <div className="album-camera">
        {/* Lớp sách riêng: mờ đi khi thiệp bay ra, thiệp không bị ảnh hưởng */}
        <div className="album-scene">
        <div className="album-table-shadow" />

        <div className="opening-album-book">
          {/* Độ dày tập giấy */}
          <div className="album-page-block" />

          {/* Trang cuối: túi kẹp thiệp */}
          <div className="album-base">
            <div className="album-paper-texture" />
            <div className="album-ribbon-bookmark" />
            <div className="album-pocket-mount">
              <span className="album-base-seal-text">✦ Trân quý từng khoảnh khắc ✦</span>
            </div>
            <div className="album-mounted-card">
              <div className="album-flying-invitation">
                <div className="album-mounted-card-paper" />
                {(['left', 'right'] as const).map(side => (
                  <div className={`album-invitation-wing album-invitation-${side}`} key={side}>
                    <div className="wing-face wing-front">
                      <div className="wing-inner-crease" />
                      <div className="wing-medallion">
                        <img src="/assets/a-b554616e.svg" alt="" />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="album-card-corners"><PhotoCorners /></div>
              </div>
            </div>
            <div className="album-under-shade" />
          </div>

          {memories.map((memory, index) => (
            <div className={`album-leaf album-leaf-${index + 1}`} key={memory.photo}>
              <div className="album-paper-segment album-paper-upper">
                <LeafFaces memory={memory} index={index} />
              </div>
              <CurlStrip memory={memory} index={index} level={0} />
            </div>
          ))}

          {/* Gáy lò xo vàng ở mép trên */}
          <div className="album-binding">
            {Array.from({ length: RING_COUNT }, (_, i) => <span className="album-ring" key={i} />)}
          </div>

          {/* Bìa da thuộc ép nhũ vàng */}
          <div className="album-leaf album-cover">
            <div className="album-leaf-front album-cover-front">
              <div className="album-leather-texture" />
              <div className="album-cover-border">
                <img src="/assets/a-b554616e.svg" alt="" className="album-cover-monogram" />
                <span className="album-cover-badge">OUR LOVE STORY</span>
                <strong className="album-cover-title">
                  Tuấn Anh
                  <span className="album-cover-amp">&amp;</span>
                  Hoàng Thúy
                </strong>
                <div className="album-cover-divider" />
                <span className="album-cover-date">20 . 10 . 2026</span>
              </div>
              <div className="album-cover-sheen" />
              <div className="album-turn-shade" />
            </div>
            <div className="album-leaf-back album-cover-back">
              <div className="album-paper-texture" />
              <img src="/assets/a-c179cc81.svg" alt="" className="album-cover-back-ornament" />
              <span className="album-cover-back-quote">“Hành trình của tình yêu và sự gắn kết trọn đời”</span>
              <span className="album-cover-back-names">Tuấn Anh &amp; Hoàng Thúy</span>
              <div className="album-turn-shade" />
            </div>
          </div>
        </div>
        </div>

        {/* Tấm thiệp gập: nằm ngoài khối sách 3D để luôn sắc nét khi bay ra */}
        <div className="album-card-slot">
          <div className="album-flying-invitation">
            <div className="album-invitation-core">
              <div className="invitation-gold-border" />
              <span className="invitation-kicker">TRÂN TRỌNG KÍNH MỜI</span>
              <img src="/assets/a-b554616e.svg" alt="" className="invitation-monogram" />
              <div className="invitation-names-block">
                <strong>Tuấn Anh</strong>
                <em>&amp;</em>
                <strong>Hoàng Thúy</strong>
              </div>
              <div className="invitation-date-pill">
                <span>20 . 10 . 2026</span>
              </div>
              <span className="invitation-subtext">Trân trọng báo tin vui</span>
            </div>

            {(['left', 'right'] as const).map(side => (
              <div className={`album-invitation-wing album-invitation-${side}`} key={side}>
                <div className="wing-face wing-front">
                  <div className="wing-inner-crease" />
                  <div className="wing-medallion">
                    <img src="/assets/a-b554616e.svg" alt="" />
                  </div>
                </div>
                <div className="wing-face wing-back">
                  <div className="wing-back-border" />
                </div>
              </div>
            ))}

            <div className="album-card-corners">
              <PhotoCorners />
            </div>
          </div>
        </div>
      </div>

      <div className="album-caption-wrap">
        <p className="album-opening-caption">Từng trang kỷ niệm, một lời hẹn trăm năm</p>
        <p className="album-speed-hint">Một lời mời, gửi trọn yêu thương</p>
      </div>
    </div>
  )
}
