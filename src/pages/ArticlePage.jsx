import BreadcrumbsComponent from '@components/common/Breadcrumb';
import ArticleCard from '@components/ArticlePage/ArticleCard';
import { Link } from 'react-router-dom';
import articleService from '@services/article.service';
import { useEffect, useState } from 'react';

const breadcrumbs = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Bài viết', href: '/article' },
];

const PolicyPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await articleService.getAll();
      setArticles(articles.data);
    };
    fetchArticles();
  }, []);

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
    </>
  );
};

export default PolicyPage;
