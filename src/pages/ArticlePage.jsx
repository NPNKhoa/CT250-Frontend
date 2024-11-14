import BreadcrumbsComponent from '@components/common/Breadcrumb';
import ArticleCard from '@components/ArticlePage/ArticleCard';
import { Link } from 'react-router-dom';
import articleService from '@services/article.service';
import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PaginationComponent from '@components/common/PaginationComponent';

const breadcrumbs = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Bài viết', href: '/article' },
];

const ArticlePage = () => {
  const location = useLocation();
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const page = parseInt(query.get('page') || '1', 10);

  const [totalPage, setTotalPage] = useState(0);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await articleService.getAll(page, 8);
      setTotalPage(articles.totalPage);
      setArticles(articles.data);
    };
    fetchArticles();
  }, [page]);

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className=' mx-auto px-2 py-8 flex flex-col'>
        <div className='flex flex-wrap justify-center gap-6'>
          {articles.map(article => (
            <Link to={`/articledetail/${article._id}`} key={article.id}>
              <ArticleCard key={article._id} article={article} />
            </Link>
          ))}
        </div>
      </div>
      <div className='col-span-4 m-4 flex justify-center'>
        <PaginationComponent
          path={`${location.pathname}`}
          totalPages={totalPage}
        />
      </div>
    </>
  );
};

export default ArticlePage;
