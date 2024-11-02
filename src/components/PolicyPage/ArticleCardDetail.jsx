import BreadcrumbsComponent from '@components/common/Breadcrumb';

const relatedArticles = [
  {
    id: 1,
    imageUrl:
      'https://cdn.shopvnb.com/img/600x360/uploads/tin_tuc/vot-cau-long-thien-cong-tam-gia-1-trieu-den-1trieu-3_1730316680.webp',
    title: 'Top 5 Cây Vợt Cầu Lông Thiên Công Giá Tầm Giá 1 Triệu Đến...',
    date: '31-10-2024 09:32',
    description:
      'Nếu các bạn đang tìm cho mình một cây vợt cầu lông thiên về lối chơi tấn công mạnh mẽ với một mức giá...',
  },
  {
    id: 2,
    imageUrl:
      'https://cdn.shopvnb.com/img/600x360/uploads/tin_tuc/vot-cau-long-thien-cong-tam-gia-1-trieu-den-1trieu-3_1730316680.webp',
    title: 'Khai Trương Cửa Hàng Thể Thao VNB TP. Thủ Dầu Một Ch...',
    date: '30-10-2024 14:10',
    description:
      'VNB Sports sẽ mang đến một chi nhánh mới tại TP. Thủ Dầu Một với cửa hàng thể thao VNB TP. Thủ Dầu...',
  },
  {
    id: 3,
    imageUrl:
      'https://cdn.shopvnb.com/img/600x360/uploads/tin_tuc/vot-cau-long-thien-cong-tam-gia-1-trieu-den-1trieu-3_1730316680.webp',
    title: 'Tổng Hợp Danh Sách Các Sân Cầu Lông Phú Quốc Uy Tín...',
    date: '29-10-2024 16:49',
    description:
      'Hiện tại, phong trào cầu lông ở Phú Quốc đang phát triển mạnh mẽ và có rất nhiều bạn muốn tìm một sân...',
  },
  {
    id: 4,
    imageUrl:
      'https://cdn.shopvnb.com/img/600x360/uploads/tin_tuc/vot-cau-long-thien-cong-tam-gia-1-trieu-den-1trieu-3_1730316680.webp',
    title: 'Tổng Hợp Danh Sách Các Sân Cầu Lông Phú Quốc Uy Tín...',
    date: '29-10-2024 16:49',
    description:
      'Hiện tại, phong trào cầu lông ở Phú Quốc đang phát triển mạnh mẽ và có rất nhiều bạn muốn tìm một sân...',
  },
];

const breadcrumbs = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Blog', href: '/policy' },
  { label: 'hehehehe', href: '/policydetail' },
];

const ArticleCardDetail = () => {
  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className='container mx-auto p-2 flex flex-col gap-6 w-full'>
        <div className=' bg-white shadow-lg rounded-lg p-8'>
          <div className='flex gap-12'>
            {/* Sidebar cho bài viết liên quan */}
            <aside className='w-1/4'>
              <h2 className='text-xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2'>
                Các bài viết khác
              </h2>
              <div className='space-y-5'>
                {relatedArticles.map(article => (
                  <div key={article.id} className='flex items-center gap-4'>
                    {article.imageUrl ? (
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className='w-16 h-16 object-cover rounded-md'
                      />
                    ) : (
                      <div className='w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md'>
                        <span className='text-gray-400'>No Image</span>
                      </div>
                    )}
                    <div>
                      <h3 className='text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors'>
                        {article.title}
                      </h3>
                      <p className='text-xs text-gray-500'>{article.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Nội dung chính của trang */}
            <main className='flex-1'>
              <h1 className='text-3xl font-bold text-orange-600 mb-4'>
                Chính sách bảo hành
              </h1>
              <div className='flex items-center text-sm text-gray-500 mb-6'>
                <span>20-07-2024 10:51</span>
                <span className='mx-2'>|</span>
                <span>VNBSports</span>
              </div>
              <p className='mb-6 text-gray-700 leading-relaxed'>
                Bài viết được{' '}
                <span className='font-semibold text-orange-600'>ShopVNB</span> -
                Hệ thống shop cầu lông hàng đầu Việt Nam với hơn 5 shop Premium
                và 65 chi nhánh trên toàn quốc kiểm duyệt và chia sẻ.
              </p>

              <section className='mt-8'>
                <h2 className='text-xl font-semibold text-gray-800 mb-3'>
                  1. Các trường hợp đủ điều kiện bảo hành
                </h2>
                <ul className='list-disc list-inside space-y-2 text-gray-700'>
                  <li>Sản phẩm trong thời hạn còn bảo hành.</li>
                  <li>Sản phẩm bị lỗi do nhà sản xuất.</li>
                  <li>Phiếu bảo hành còn nguyên vẹn.</li>
                </ul>
              </section>

              <section className='mt-8'>
                <h2 className='text-xl font-semibold text-gray-800 mb-3'>
                  2. Trường hợp không được bảo hành
                </h2>
                <ul className='list-disc list-inside space-y-2 text-gray-700'>
                  <li>
                    Sản phẩm đã quá thời hạn ghi trên Phiếu bảo hành hoặc mất
                    Phiếu bảo hành.
                  </li>
                  <li>
                    Phiếu bảo hành không ghi rõ mã số sản phẩm và ngày mua hàng.
                  </li>
                  <li>
                    Mất các phần mềm và Phiếu bảo hành bị sửa đổi hoặc không còn
                    nguyên vẹn.
                  </li>
                </ul>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCardDetail;
