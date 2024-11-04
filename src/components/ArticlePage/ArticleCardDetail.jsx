import BreadcrumbsComponent from '@components/common/Breadcrumb';
import articleService from '@services/article.service';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ArticleCardDetail = () => {
  const { id } = useParams();

  const [article, setArticle] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const article = await articleService.getById(id);
      const relatedArticles = await articleService.getAll();
      setRelatedArticles(relatedArticles.data);
      setArticle(article.data);
    };
    fetchArticles();
  }, [id]);

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Bài viết', href: '/acticle' },
    { label: `${article.title}` },
  ];

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
                  <Link to={`/articledetail/${article._id}`} key={article.id} className='flex items-center gap-4'>
                    {article.thumbnail ? (
                      <img
                        src={
                          String(article.thumbnail).startsWith('http')
                            ? article.thumbnail
                            : `http://localhost:5000/${String(
                                article.thumbnail
                              ).replace(/\\/g, '/')}`
                        }
                        alt={article.title}
                        className='w-20 h-20 object-cover rounded-md'
                      />
                    ) : (
                      <div className='w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md'>
                        <span className='text-gray-400'>No Image</span>
                      </div>
                    )}
                    <div className='space-y-1'>
                      <h3 className='text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors'>
                        {article.title}
                      </h3>
                      <p className='text-xs text-gray-500'>
                        {new Date(article.updatedAt).toLocaleString('vi-VN')}
                      </p>
                      <div
                        className='text-gray-600 text-sm line-clamp-2'
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </aside>

            {/* Nội dung chính của trang */}
            <main className='flex-1'>
              <h1 className='text-3xl font-bold text-orange-600 mb-4'>
                {article?.title}
              </h1>
              <div className='flex items-center text-sm text-gray-500 mb-6'>
                <span>
                  {new Date(article.updatedAt).toLocaleString('vi-VN', {
                    hour: 'numeric',
                    minute: 'numeric',
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className='mx-2'>|</span>
                <span>KBTSports</span>
              </div>
              <div
                className='text-gray-700 text-base'
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCardDetail;
