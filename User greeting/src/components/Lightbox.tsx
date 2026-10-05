export default function Lightbox() {
  return (
    <div id="lightbox-modal" role="dialog" aria-modal="true" aria-label="Ảnh cưới phóng to" aria-hidden="true">
        <button id="btn-close-lightbox" className="btn-close-lightbox" aria-label="Đóng ảnh phóng to">×</button>
        <img id="lightbox-img" alt="Ảnh Cưới Phóng To" />
      </div>
  )
}
