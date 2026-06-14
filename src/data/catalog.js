// ============================================================
// Local catalog — replaces the defunct remote API
// (congdat.herokuapp.com is offline). Prices are in thousands
// of VND to match the legacy "{price}.000 đ" display format.
// ============================================================

export const categories = [
  { id: '1', name: 'Cây chậu treo' },
  { id: '2', name: 'Cây có hoa' },
  { id: '3', name: 'Cây dây leo' },
  { id: '4', name: 'Cây để bàn' },
  { id: '5', name: 'Cây may mắn' },
  { id: '6', name: 'Cây trang trí' },
  { id: '7', name: 'Cây nội thất' },
]

// color keys match the legacy filter data-attributes:
// green | red-orange | violet | blue | yellow | pink
export const products = [
  { id: '1',  name: 'Cây Kim Tiền',            price: 285, priceSale: 15, categoryId: '5', color: 'green',      quantity: 24, thumbnailUrl: 'sp-1.jpg',  description: 'Biểu tượng của tài lộc và thịnh vượng, Kim Tiền dày dặn, xanh bóng quanh năm và cực kỳ dễ chăm. Lựa chọn hoàn hảo cho bàn làm việc hoặc phòng khách.' },
  { id: '2',  name: 'Cây Lưỡi Hổ',             price: 210, priceSale: 10, categoryId: '7', color: 'yellow',     quantity: 40, thumbnailUrl: 'sp-2.jpg',  description: 'Lưỡi Hổ thanh lọc không khí vượt trội, hấp thụ độc tố và nhả oxy về đêm. Dáng đứng kiêu hãnh, viền vàng sang trọng.' },
  { id: '3',  name: 'Cây Trầu Bà Xanh',        price: 165, priceSale: 0,  categoryId: '1', color: 'green',      quantity: 50, thumbnailUrl: 'sp-3.jpg',  description: 'Trầu Bà buông rủ mềm mại, lý tưởng cho giỏ treo hay kệ cao. Sức sống bền bỉ, xanh tốt cả trong điều kiện ánh sáng yếu.' },
  { id: '4',  name: 'Cây Lan Ý',               price: 245, priceSale: 20, categoryId: '2', color: 'green',      quantity: 18, thumbnailUrl: 'sp-4.jpg',  description: 'Lan Ý nở hoa trắng tinh khôi, mang vẻ đẹp thuần khiết và khả năng lọc khí ẩm tuyệt vời cho không gian sống.' },
  { id: '5',  name: 'Cây Bàng Singapore',      price: 520, priceSale: 12, categoryId: '7', color: 'green',      quantity: 12, thumbnailUrl: 'sp-5.jpg',  description: 'Tán lá lớn bản, gân nổi đặc trưng tạo điểm nhấn kiến trúc cho mọi căn phòng. Biểu tượng của không gian sống hiện đại.' },
  { id: '6',  name: 'Cây Kim Ngân',            price: 320, priceSale: 0,  categoryId: '5', color: 'green',      quantity: 22, thumbnailUrl: 'sp-6.jpg',  description: 'Thân bện độc đáo, tượng trưng cho ngũ phúc. Kim Ngân thu hút tài khí, rất được ưa chuộng trong phong thủy.' },
  { id: '7',  name: 'Cây Hồng Môn',            price: 230, priceSale: 18, categoryId: '2', color: 'red-orange', quantity: 28, thumbnailUrl: 'sp-7.jpg',  description: 'Mo hoa đỏ rực bóng bẩy nổi bật trên nền lá xanh đậm. Hồng Môn mang đến sắc xuân ấm áp suốt bốn mùa.' },
  { id: '8',  name: 'Sen Đá Phật Bà',          price: 95,  priceSale: 0,  categoryId: '4', color: 'green',      quantity: 60, thumbnailUrl: 'sp-8.jpg',  description: 'Hình hoa nở mềm mại, mọng nước, đáng yêu trên bàn làm việc. Chỉ cần ánh sáng nhẹ và rất ít nước.' },
  { id: '9',  name: 'Xương Rồng Tai Thỏ',      price: 110, priceSale: 8,  categoryId: '4', color: 'green',      quantity: 45, thumbnailUrl: 'sp-9.jpg',  description: 'Dáng tai thỏ ngộ nghĩnh, sức sống mãnh liệt. Người bạn nhỏ lý tưởng cho góc làm việc đầy nắng.' },
  { id: '10', name: 'Cây Phú Quý',             price: 260, priceSale: 0,  categoryId: '5', color: 'red-orange', quantity: 20, thumbnailUrl: 'sp-10.jpg', description: 'Lá viền hồng đỏ quý phái, Phú Quý mang ý nghĩa giàu sang và bình an cho gia chủ.' },
  { id: '11', name: 'Vạn Niên Thanh',          price: 180, priceSale: 10, categoryId: '6', color: 'green',      quantity: 33, thumbnailUrl: 'sp-11.jpg', description: 'Lá đốm trắng xanh trang nhã, dễ trồng và bền bỉ. Tô điểm tươi mát cho mọi góc nội thất.' },
  { id: '12', name: 'Cây Ngọc Ngân',           price: 215, priceSale: 0,  categoryId: '6', color: 'green',      quantity: 26, thumbnailUrl: 'sp-12.jpg', description: 'Lá bạc loang xanh mềm mại như ngọc. Ngọc Ngân tượng trưng cho sự sung túc và may mắn.' },
  { id: '13', name: 'Lan Quân Tử',             price: 380, priceSale: 15, categoryId: '2', color: 'red-orange', quantity: 14, thumbnailUrl: 'sp-13.jpg', description: 'Cụm hoa cam rực rỡ vươn cao kiêu hãnh giữa tán lá xanh bóng. Biểu tượng của khí chất quân tử.' },
  { id: '14', name: 'Cau Tiểu Trâm',           price: 150, priceSale: 0,  categoryId: '4', color: 'green',      quantity: 38, thumbnailUrl: 'sp-14.jpg', description: 'Tán lá xòe mảnh mai, xanh mướt. Cau Tiểu Trâm lọc khí tốt và mang lại cảm giác thư thái nơi bàn làm việc.' },
  { id: '15', name: 'Dương Xỉ Thái',           price: 135, priceSale: 12, categoryId: '1', color: 'green',      quantity: 42, thumbnailUrl: 'sp-15.jpg', description: 'Lá xẻ rủ bồng bềnh như thác xanh. Dương Xỉ ưa ẩm, tuyệt đẹp khi treo nơi hiên nhà mát mẻ.' },
  { id: '16', name: 'Cây Trúc Mây',            price: 410, priceSale: 0,  categoryId: '7', color: 'green',      quantity: 16, thumbnailUrl: 'sp-16.jpg', description: 'Dáng trúc thanh thoát, cao ráo, lọc bụi mịn hiệu quả. Mang nét thiền tịnh cho không gian sống.' },
  { id: '17', name: 'Cây Thường Xuân',         price: 145, priceSale: 20, categoryId: '3', color: 'green',      quantity: 36, thumbnailUrl: 'sp-18.jpg', description: 'Dây leo buông mềm, lá hình sao duyên dáng. Thường Xuân lọc formaldehyde và phủ xanh tường, ban công.' },
  { id: '18', name: 'Trầu Bà Lá Xẻ Monstera',  price: 460, priceSale: 10, categoryId: '7', color: 'green',      quantity: 15, thumbnailUrl: 'sp-19.jpg', description: 'Lá xẻ thùy đặc trưng, bản lớn ấn tượng. Monstera là ngôi sao của phong cách nội thất nhiệt đới.' },
  { id: '19', name: 'Cây Đuôi Công',           price: 240, priceSale: 0,  categoryId: '6', color: 'violet',     quantity: 21, thumbnailUrl: 'sp-20.jpg', description: 'Hoa văn lá như đuôi công xòe rộng, mặt dưới ánh tím. Một tác phẩm nghệ thuật của tự nhiên.' },
  { id: '20', name: 'Bạch Mã Hoàng Tử',        price: 295, priceSale: 14, categoryId: '7', color: 'green',      quantity: 19, thumbnailUrl: 'sp-21.jpg', description: 'Thân trắng, lá xanh gân bạc vươn thẳng quý phái. Tượng trưng cho sự thăng tiến vững vàng.' },
  { id: '21', name: 'Cây Cọ Cảnh',             price: 350, priceSale: 0,  categoryId: '1', color: 'green',      quantity: 17, thumbnailUrl: 'sp-22.jpg', description: 'Lá cọ xòe quạt xanh tươi, mang hơi thở resort nhiệt đới về ngay ngôi nhà của bạn.' },
  { id: '22', name: 'Lan Hồ Điệp Tím',         price: 540, priceSale: 8,  categoryId: '2', color: 'violet',     quantity: 13, thumbnailUrl: 'sp-23.jpg', description: 'Những cánh hoa tím mềm mại xếp tầng kiêu sa. Quà tặng sang trọng cho mọi dịp trọng đại.' },
  { id: '23', name: 'Cây Hương Thảo',          price: 120, priceSale: 0,  categoryId: '4', color: 'green',      quantity: 48, thumbnailUrl: 'sp-24.jpg', description: 'Hương thơm dễ chịu, vừa làm cảnh vừa làm gia vị. Hương Thảo còn giúp xua đuổi muỗi tự nhiên.' },
  { id: '24', name: 'Cây Nha Đam',             price: 105, priceSale: 0,  categoryId: '4', color: 'green',      quantity: 52, thumbnailUrl: 'sp-25.jpg', description: 'Mọng nước, lành tính, vừa trang trí vừa hữu ích cho làn da. Cực kỳ dễ sống và ít cần tưới.' },
  { id: '25', name: 'Tùng Bồng Lai',           price: 330, priceSale: 16, categoryId: '6', color: 'green',      quantity: 18, thumbnailUrl: 'sp-26.jpg', description: 'Dáng bonsai mềm mại, xanh mướt quanh năm. Mang vượng khí và nét cổ kính tao nhã.' },
  { id: '26', name: 'Cây Phát Tài',            price: 290, priceSale: 0,  categoryId: '5', color: 'green',      quantity: 23, thumbnailUrl: 'sp-27.jpg', description: 'Thân khỏe, lá sọc vàng xanh rạng rỡ. Phát Tài hứa hẹn tài lộc dồi dào và khởi đầu thuận lợi.' },
  { id: '27', name: 'Cây Vạn Lộc',             price: 250, priceSale: 12, categoryId: '5', color: 'pink',       quantity: 27, thumbnailUrl: 'sp-28.jpg', description: 'Lá đỏ hồng rực rỡ viền xanh, tên gọi mang ý "lộc đến vạn lần". Điểm nhấn may mắn nổi bật.' },
  { id: '28', name: 'Tía Tô Cảnh',             price: 130, priceSale: 0,  categoryId: '6', color: 'violet',     quantity: 34, thumbnailUrl: 'sp-29.jpg', description: 'Sắc lá tím – hồng – xanh chuyển màu mê hoặc. Một bảng màu sống động cho khu vườn nhỏ của bạn.' },
  { id: '29', name: 'Cây Cẩm Nhung',           price: 90,  priceSale: 0,  categoryId: '4', color: 'pink',       quantity: 55, thumbnailUrl: 'sp-30.jpg', description: 'Lá nhỏ gân hồng tinh xảo như nhung. Bé xinh hoàn hảo cho terrarium và góc bàn làm việc.' },
  { id: '30', name: 'Sen Đá Nâu',              price: 100, priceSale: 10, categoryId: '4', color: 'red-orange', quantity: 50, thumbnailUrl: 'sp-31.jpg', description: 'Sắc nâu ánh đồng ấm áp, hình hoa xếp tầng tinh tế. Dễ chăm và bền màu dưới nắng.' },
  { id: '31', name: 'Cây Lưỡi Mèo',            price: 175, priceSale: 0,  categoryId: '4', color: 'blue',       quantity: 30, thumbnailUrl: 'sp-32.jpg', description: 'Lá xanh ánh phấn xếp đối xứng độc đáo. Một lựa chọn lạ mắt, cá tính cho không gian của bạn.' },
]

// number of products per category — used for the sidebar counts
export function categoryCounts() {
  const counts = {}
  for (const c of categories) counts[c.id] = 0
  for (const p of products) counts[p.categoryId] = (counts[p.categoryId] || 0) + 1
  return counts
}
