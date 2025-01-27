function convertTitleToHref(title) {
  // Bảng chuyển đổi các ký tự có dấu sang không dấu
  const removeVietnameseTones = (str) => {
    return str
      .normalize('NFD') // Tách các ký tự có dấu thành 2 phần
      .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu
      .replace(/đ/g, 'd') // Chuyển "đ" thành "d"
      .replace(/Đ/g, 'D'); // Chuyển "Đ" thành "D"
  };

  // Chuyển đổi tiêu đề thành dạng slug
  const slug = removeVietnameseTones(title)
    .toLowerCase() // Chuyển sang chữ thường
    .trim() // Xóa khoảng trắng đầu cuối
    .replace(/[^a-z0-9\s-]/g, '') // Xóa ký tự đặc biệt
    .replace(/\s+/g, '-'); // Thay khoảng trắng thành dấu gạch ngang

  return slug;
}

module.exports = {
  convertTitleToHref,
};
