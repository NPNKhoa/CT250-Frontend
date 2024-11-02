// eslint-disable-next-line react/prop-types
const ArticleCard = ({ article }) => {
  return (
    <div className='max-w-xs bg-white rounded-lg overflow-hidden shadow-md'>
      <img
        src={article.imageUrl}
        alt={article.title}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-800 mb-2'>
          {article.title}
        </h3>
        <div className='text-orange-500 text-sm mb-2 font-semibold'>
          {article.date}
        </div>
        <p className='text-gray-600 text-sm'>{article.description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
