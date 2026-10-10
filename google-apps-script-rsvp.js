/**
 * ============================================================================
 * GOOGLE APPS SCRIPT - BỘ THU THẬP XÁC NHẬN THAM DỰ (RSVP) THIỆP CƯỚI
 * Dành cho cặp đôi: Tuấn Anh & Hoàng Thúy (20.10.2026)
 * ============================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT TRONG 1 PHÚT:
 * 1. Mở trình duyệt và truy cập: https://sheets.new (để tạo 1 Google Sheet mới)
 * 2. Đặt tên file Google Sheet: "Danh Sách Khách Mời - Tuấn Anh & Hoàng Thúy"
 * 3. Trên thanh Menu chọn: Tiện ích mở rộng (Extensions) > Apps Script
 * 4. Xóa toàn bộ mã mặc định (myFunction), rồi copy toàn bộ mã bên dưới dán vào
 * 5. Bấm "Triển khai" (Deploy) ở góc trên bên phải > chọn "Tùy chọn triển khai mới" (New deployment)
 * 6. Bấm vào biểu tượng Bánh răng (Cài đặt) cạnh mục "Chọn loại", chọn "Ứng dụng web" (Web app)
 *    - Mô tả: RSVP Thiệp Cưới
 *    - Thực thi dưới dạng (Execute as): Tôi (Me)
 *    - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone)  <-- CỰC KỲ QUAN TRỌNG!
 * 7. Bấm nút "Triển khai" (Deploy) > Bấm "Cấp quyền truy cập" (Authorize access) và chọn tài khoản Google của bạn
 *    (Nếu Google hiện cảnh báo "Google chưa xác minh ứng dụng này", bấm "Nâng cao" -> "Đi tới... (không an toàn)")
 * 8. Copy đường dẫn "URL của ứng dụng web" (có đuôi /exec)
 * 9. Dán link đó vào ô "Google Apps Script Web App URL" trong trang Quản trị:
 *    http://180.93.54.36:8080/admin.html (Tab "Google Sheets RSVP") rồi bấm "Lưu Thay Đổi"!
 * ============================================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Tự động khởi tạo tiêu đề cột và định dạng nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời Gian Gửi",
        "Họ và Tên",
        "Số Điện Thoại",
        "Khách Của",
        "Số Người Đi Cùng",
        "Trạng Thái Tham Dự",
        "Lời Chúc Mừng",
        "Thiết Bị Gửi"
      ]);
      
      // Định dạng dòng tiêu đề: In đậm, nền vàng gold, cố định dòng 1
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#F3DFAB");
      headerRange.setFontColor("#1A140B");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
      
      // Đặt độ rộng các cột cho thoáng đẹp
      sheet.setColumnWidth(1, 160); // Thời gian
      sheet.setColumnWidth(2, 200); // Họ tên
      sheet.setColumnWidth(3, 140); // SĐT
      sheet.setColumnWidth(4, 150); // Khách của
      sheet.setColumnWidth(5, 140); // Số lượng
      sheet.setColumnWidth(6, 180); // Trạng thái
      sheet.setColumnWidth(7, 350); // Lời chúc
      sheet.setColumnWidth(8, 200); // Thiết bị
    }
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    // Lấy thời gian theo giờ Việt Nam (GMT+7)
    var timestamp = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    var name = (data.name || "").trim();
    var phone = (data.phone || "").trim();
    var side = (data.side || "").trim();
    var guests = (data.guests || "").trim();
    var attending = (data.attending || "").trim();
    var wish = (data.wish || "").trim();
    var userAgent = (data.userAgent || "").trim();
    
    // Ghi dữ liệu vào hàng mới
    sheet.appendRow([
      timestamp,
      name,
      phone,
      side,
      guests,
      attending,
      wish,
      userAgent
    ]);
    
    // Căn lề dữ liệu mới thêm
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 3).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 4).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 5).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 6).setHorizontalAlignment("center");
    
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Đã lưu thông tin RSVP thành công"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Wedding RSVP Google Apps Script Web App is active!").setMimeType(ContentService.MimeType.TEXT);
}
