/**
 * WEDDING CONFIGURATION STORE
 * Trung tâm cấu hình và dữ liệu động cho thiệp cưới
 * Mọi nội dung trên thiệp được đồng bộ tự động từ file này hoặc từ Admin Dashboard (admin.html)
 */

const DEFAULT_WEDDING_CONFIG = {
  // 1. THÔNG TIN CẶP ĐÔI
  groom: {
    name: 'Tuấn Anh',
    fullName: 'Nguyễn Tuấn Anh',
    shortName: 'Tuấn Anh'
  },
  bride: {
    name: 'Hoàng Thúy',
    fullName: 'Hoàng Thị Thúy',
    shortName: 'Hoàng Thúy'
  },
  couple: {
    namesDisplay: 'Tuấn Anh & Hoàng Thúy',
    monogram: 'AT', // Chữ lồng trên con dấu sáp và góc thiệp
    ceremonyType: 'LỄ THÀNH HÔN', // Hoặc 'LỄ VU QUY', 'LỄ TÂN HÔN'
    pageTitle: 'Thiệp Cưới Tuấn Anh & Hoàng Thúy | 20.10.2026',
    metaDescription: 'Thiệp cưới điện tử Tuấn Anh & Hoàng Thúy - Lễ Thành Hôn diễn ra vào Thứ Ba, ngày 20/10/2026 tại Hoài Đức, Hà Nội.',
    ogImage: 'assets/images/hero_1791131600.webp'
  },

  // 2. THỜI GIAN & ĐẾM NGƯỢC (COUNTDOWN)
  weddingDate: {
    dayOfWeek: 'THỨ BA',
    day: '20',
    monthYear: '10 . 2026',
    fullDateText: 'Thứ Ba, ngày 20 tháng 10 năm 2026',
    timeText: 'ĐƯỢC TỔ CHỨC VÀO HỒI 11 GIỜ 00 PHÚT',
    lunarText: '(Tức ngày 11 tháng 09 năm Bính Ngọ)',
    // Định dạng ISO chính xác cho đồng hồ đếm ngược (Múi giờ Hà Nội GMT+7)
    targetIso: '2026-10-20T11:00:00+07:00',
    rsvpDeadline: '15/10/2026'
  },

  // 3. THÔNG TIN GIA ĐÌNH HAI BÊN
  family: {
    introLead: 'TỚI DỰ BỮA CƠM THÂN MẬT CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI\nSự hiện diện của Quý khách là niềm vinh hạnh to lớn cho gia đình và là lời chúc phúc quý báu nhất dành cho chúng tôi!',
    groom: {
      label: 'Nhà Trai',
      father: 'ÔNG: NGUYỄN VIẾT THẮNG',
      mother: 'BÀ: BÙI THỊ XUÂN',
      address: '📍 Thôn Ngãi Cầu, xã An Khánh<br>huyện Hoài Đức, TP. Hà Nội'
    },
    bride: {
      label: 'Nhà Gái',
      father: 'ÔNG: HOÀNG VĂN HÒA',
      mother: 'BÀ: NGUYỄN THỊ LAI',
      address: '📍 TDP Hải Châu, phường Ngọc Sơn<br>thị xã Nghi Sơn, tỉnh Thanh Hóa'
    }
  },

  // 4. LỊCH TRÌNH SỰ KIỆN (EVENTS)
  events: [
    {
      id: 'event-bride',
      tag: 'TẠI TƯ GIA NHÀ GÁI',
      title: 'LỄ NẠP TÀI',
      host: 'Gia Đình Nhà Gái',
      time: '08:00 SÁNG',
      date: 'Chủ Nhật, ngày 18 - 10 - 2026',
      lunarDate: '(Tức ngày 09 tháng 09 năm Bính Ngọ)',
      venueName: '🏛 Tại Tư Gia Nhà Gái',
      address: 'TDP Hải Châu, phường Ngọc Sơn, thị xã Nghi Sơn, tỉnh Thanh Hóa',
      // Dùng cho nút Lưu Lịch Google Calendar (YYYYMMDDTHHmmss)
      calendarStart: '20261018T080000',
      calendarEnd: '20261018T120000',
      mapTabTarget: 'modal-tab-bride',
      mapQuery: 'TDP Hải Châu Ngọc Sơn Nghi Sơn Thanh Hóa',
      mapIframeSrc: 'https://maps.google.com/maps?q=TDP+H%E1%BA%A3i+Ch%C3%A2u+Ng%E1%BB%8Dc+S%C6%A1n+Nghi+S%C6%A1n+Thanh+H%C3%B3a&t=&z=15&ie=UTF8&iwloc=&output=embed',
      mapAppUrl: 'https://www.google.com/maps/search/?api=1&query=TDP+H%E1%BA%A3i+Ch%C3%A2u+Ng%E1%BB%8Dc+S%C6%A1n+Nghi+S%C6%A1n+Thanh+H%C3%B3a'
    },
    {
      id: 'event-groom',
      tag: 'TẠI GIA ĐÌNH NHÀ TRAI',
      title: 'LỄ THÀNH HÔN & TIỆC CƯỚI',
      host: 'Gia Đình Nhà Trai',
      time: '11:00 TRƯA',
      date: 'Thứ Ba, ngày 20 - 10 - 2026',
      lunarDate: '(Tức ngày 11 tháng 09 năm Bính Ngọ)',
      venueName: '🏛 Nhà Văn Hóa Thôn Ngãi Cầu',
      address: 'Thôn Ngãi Cầu, xã An Khánh, huyện Hoài Đức, TP. Hà Nội',
      calendarStart: '20261020T110000',
      calendarEnd: '20261020T150000',
      mapTabTarget: 'modal-tab-groom',
      mapQuery: 'Nhà văn hóa thôn Ngãi Cầu An Khánh Hoài Đức Hà Nội',
      mapIframeSrc: 'https://maps.google.com/maps?q=Nh%C3%A0+v%C4%83n+h%C3%B3a+th%C3%B4n+Ng%C3%A3i+C%E1%BA%A7u+An+Kh%C3%A1nh+Ho%C3%A0i+%C4%90%E1%BB%A9c+H%C3%A0+N%E1%BB%99i&t=&z=15&ie=UTF8&iwloc=&output=embed',
      mapAppUrl: 'https://www.google.com/maps/search/?api=1&query=Nh%C3%A0+v%C4%83n+h%C3%B3a+th%C3%B4n+Ng%C3%A3i+C%E1%BA%A7u+An+Kh%C3%A1nh+Ho%C3%A0i+%C4%90%E1%BB%A9c+H%C3%A0+N%E1%BB%99i'
    }
  ],

  // 5. CÂU CHUYỆN TÌNH YÊU (LOVE STORY TIMELINE)
  loveStory: [
    {
      date: 'Mùa Thu 2022',
      title: 'Lần Đầu Gặp Gỡ',
      desc: 'Một buổi chiều Hà Nội se lạnh, ánh mắt chạm nhau giữa quán cafe quen thuộc đã mở đầu cho hành trình ngọt ngào của chúng mình.'
    },
    {
      date: 'Tháng 02 / 2023',
      title: 'Lời Tỏ Tình Ngọt Ngào',
      desc: '“Từ nay về sau, mọi buồn vui của em đều có anh chia sẻ.” Một cái gật đầu e ấp đánh dấu ngày hai trái tim cùng chung nhịp đập.'
    },
    {
      date: 'Mùa Hè 2025',
      title: 'Khoảnh Khắc Cầu Hôn',
      desc: 'Dưới ánh hoàng hôn bên bờ biển lộng gió, chiếc nhẫn lấp lánh được trao cùng lời hẹn ước: “Làm vợ anh nhé!” – “Em đồng ý!”'
    },
    {
      date: '20 / 10 / 2026',
      title: 'Ngày Chung Đôi',
      desc: 'Chính thức nắm tay nhau bước vào lễ đường, cùng nhau xây dựng tổ ấm hạnh phúc dưới sự chứng kiến của hai gia đình và bạn bè thân thương.'
    }
  ],

  // 6. THƯỚC PHIM KỶ NIỆM (MEMORY FILM)
  memoryFilm: {
    kicker: 'NHỮNG MÙA TA ĐÃ ĐI QUA',
    title: 'Hành Trình<br><em>Đến Ngày Hôm Nay</em>',
    desc: 'Từ những ngày đầu gặp gỡ đến lời hẹn ước cho một mái nhà chung - những khoảnh khắc đẹp nhất của chúng mình trong một thước phim.',
    startYear: '2022',
    endYear: '2026',
    videoSrc: 'assets/video/hanh-trinh.mp4',
    posterSrc: 'assets/images/poster_1791131932.webp'
  },

  // 7. ALBUM ẢNH CƯỚI (GALLERY SLIDER)
  gallery: [
    {
      src: 'assets/images/gallery_1791131928_0.webp',
      caption: 'Trọn vẹn tình yêu • Lễ Thành Hôn'
    },
    {
      src: 'assets/images/gallery_1791131928_1.webp',
      caption: 'Ánh hoàng hôn bên em'
    },
    {
      src: 'assets/images/gallery_1791131928_2.webp',
      caption: 'Duyên nợ trăm năm • Áo dài truyền thống'
    },
    {
      src: 'assets/images/gallery_1791131928_3.webp',
      caption: 'Nụ cười hạnh phúc ngày trọng đại'
    },
    {
      src: 'assets/images/gallery_1791131928_4.webp',
      caption: 'Tay trong tay trọn đời bình yên'
    },
    {
      src: 'assets/images/gallery_1791131928_5.webp',
      caption: 'Hạnh phúc đong đầy'
    }
  ],

  // 7b. CHÚ THÍCH CUỐN ALBUM MINI (MÀN HÌNH MỞ PHONG BÌ)
  openingMemories: [
    {
      caption: 'Ngày mình có nhau',
      date: 'Tháng 10 · Khởi đầu duyên nợ'
    },
    {
      caption: 'Thương nhau một đời',
      date: 'Bình yên những sớm mai'
    },
    {
      caption: 'Và hôm nay, chung đôi',
      date: 'Khoảnh khắc trọn vẹn'
    }
  ],

  // 8. HỘP MỪNG CƯỚI & TÀI KHOẢN NGÂN HÀNG (VIETQR)
  banking: {
    groom: {
      bankCode: 'VCB', // Mã VietQR: VCB, TCB, MB, ACB, BIDV, VPB, TPB, CTG...
      bankName: 'Ngân hàng Vietcombank (CN Thăng Long)',
      accountNumber: '1023888999',
      accountNumberDisplay: '1023 888 999',
      accountHolder: 'NGUYỄN TUẤN ANH',
      transferMemo: 'Mung cuoi Tuan Anh'
    },
    bride: {
      bankCode: 'TCB',
      bankName: 'Ngân hàng Techcombank (CN Hà Nội)',
      accountNumber: '1903666888',
      accountNumberDisplay: '1903 666 888',
      accountHolder: 'HOÀNG THỊ THÚY',
      transferMemo: 'Mung cuoi Hoang Thuy'
    }
  },

  // 9. ÂM NHẠC & FOOTER
  music: {
    songTitle: '"I Do" - 911 x Đức Phúc',
    audioSrc: 'assets/audio/i-do.mp3'
  },
  footer: {
    thankYou: 'Thank You!',
    quote: '“Cảm ơn tình cảm và sự hiện diện của bạn trong ngày hạnh phúc nhất của chúng tôi!”',
    credit: 'Wedding Invitation • 20.10.2026 • Thiết kế độc quyền theo phong cách thiệp cưới Tuấn Anh & Hoàng Thúy'
  },

  // 10. HỆ THỐNG RSVP & SỔ LƯU BÚT
  rsvpEndpoint: '', // URL Google Apps Script Web App để nhận dữ liệu
  wishes: [
    {
      name: 'Gia đình Bác Hùng (Hà Nội)',
      side: 'Khách Nhà Trai',
      text: 'Chúc mừng hai cháu Tuấn Anh và Hoàng Thúy trăm năm hạnh phúc, răng long đầu bạc, sớm sinh quý tử nhé!'
    },
    {
      name: 'Cô Lan & Chú Tuấn (Thanh Hóa)',
      side: 'Khách Nhà Gái',
      text: 'Mừng hạnh phúc đôi bạn trẻ! Chúc hai con luôn yêu thương, nhường nhịn và đồng hành cùng nhau xây đắp tổ ấm vững bền.'
    },
    {
      name: 'Minh Trí & Hội Bạn Cấp 3',
      side: 'Bạn Cả Hai',
      text: 'Cuối cùng ngày này cũng tới! Chúc bạn thân của tao lấy được vợ hiền, chúc cô dâu luôn xinh đẹp rạng ngời!'
    }
  ],
  adminPin: '2010', // Mã PIN truy cập trang quản trị admin.html
  updatedAt: 1791116000000 // Timestamp đồng bộ hệ thống
};

/**
 * Helper nạp cấu hình:
 * Ưu tiên lấy cấu hình đã chỉnh sửa trong localStorage (nếu có),
 * nếu không có sẽ lấy DEFAULT_WEDDING_CONFIG.
 */
function getActiveWeddingConfig() {
  try {
    const saved = localStorage.getItem('wedding_custom_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Nếu máy chủ có cấu hình mới hơn hẳn cấu hình lưu trong máy, ưu tiên cấu hình máy chủ
      if (DEFAULT_WEDDING_CONFIG.updatedAt && parsed.updatedAt && DEFAULT_WEDDING_CONFIG.updatedAt > parsed.updatedAt) {
        localStorage.removeItem('wedding_custom_config');
        return JSON.parse(JSON.stringify(DEFAULT_WEDDING_CONFIG));
      }
      return deepMerge(DEFAULT_WEDDING_CONFIG, parsed);
    }
  } catch (e) {
    console.warn('Lỗi đọc cấu hình từ localStorage, sử dụng mặc định:', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_WEDDING_CONFIG));
}

function deepMerge(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

// Lưu cấu hình vào localStorage
function saveActiveWeddingConfig(config) {
  try {
    localStorage.setItem('wedding_custom_config', JSON.stringify(config));
    return true;
  } catch (e) {
    console.error('Không lưu được cấu hình:', e);
    return false;
  }
}

// Khôi phục về mặc định
function resetActiveWeddingConfig() {
  localStorage.removeItem('wedding_custom_config');
}

// Sinh link VietQR chuẩn
function generateVietQRUrl(bankCode, accountNo, accountName, memo, template = 'compact2') {
  if (!bankCode || !accountNo) return '';
  const encodedName = encodeURIComponent(accountName || '');
  const encodedMemo = encodeURIComponent(memo || '');
  return `https://img.vietqr.io/image/${bankCode}-${accountNo}-${template}.png?accountName=${encodedName}&addInfo=${encodedMemo}`;
}

// Xuất ra window toàn cục
window.DEFAULT_WEDDING_CONFIG = DEFAULT_WEDDING_CONFIG;
window.getActiveWeddingConfig = getActiveWeddingConfig;
window.saveActiveWeddingConfig = saveActiveWeddingConfig;
window.resetActiveWeddingConfig = resetActiveWeddingConfig;
window.generateVietQRUrl = generateVietQRUrl;
window.WEDDING_CONFIG = getActiveWeddingConfig();
