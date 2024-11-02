import BreadcrumbsComponent from '@components/common/Breadcrumb';
import ArticleCard from '@components/PolicyPage/ArticleCard';
import { Link } from 'react-router-dom';

const articles = [
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
];

const PolicyPage = () => {
  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className=' mx-auto px-2 py-8 flex flex-col'>
        <div className='flex  flex-wrap justify-center gap-6'>
          {articles.map(article => (
            <Link to='/policydetail' key={article.id}>
              <ArticleCard key={article.id} article={article} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default PolicyPage;
