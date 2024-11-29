import { useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import productService from '@services/product.service';
import ProductItem from '@components/ProductItem';
import Filter from '@components/Filter';
import BreadcrumbsComponent from '@components/common/Breadcrumb';
import PaginationComponent from '@components/common/PaginationComponent';
import { useSelector } from 'react-redux';
const SafeOffPage = () => {
  const location = useLocation();
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [selectedMinPercentDiscount, setselectedMinPercentDiscount] =
    useState(null);
  const [selectedMaxPercentDiscount, setselectedMaxPercentDiscount] =
    useState(null);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOption, setSortOption] = useState(query.get('sortBy'));
  const [isDesc, setIsDesc] = useState('false');
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const page = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        setLoading(true);
        const updatedQuery = new URLSearchParams(location.search);

        if (selectedBrand.length > 0)
          updatedQuery.set('brand', selectedBrand.join(','));
        if (selectedMinPercentDiscount !== null)
          updatedQuery.set('minPercentDiscount', selectedMinPercentDiscount);
        if (selectedMaxPercentDiscount !== null)
          updatedQuery.set('maxPercentDiscount', selectedMaxPercentDiscount);

        // Cập nhật tham số sắp xếp
        updatedQuery.set('sortBy', sortOption);
        updatedQuery.set('isDesc', isDesc);

        const responseProduct = await productService.getAll(
          updatedQuery,
          page,
          12,
          sortBy,
          isDesc
        );

        setProducts(responseProduct.data);
        setTotalPage(responseProduct.meta.totalPages);
      } catch (error) {
        console.error('Error fetching product types:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductTypes();
  }, [
    location.search,
    selectedBrand,
    selectedMinPercentDiscount,
    selectedMaxPercentDiscount,
    sortOption,
    isDesc,
    page,
  ]);

  const handleDiscountChange = (minPrice, maxPrice) => {
    setselectedMinPercentDiscount(minPrice);
    setselectedMaxPercentDiscount(maxPrice);
  };

  const handleBrandChange = brands => {
    setSelectedBrand(brands);
  };

  const handleSortChange = e => {
    const value = e.target.value;
    setSortOption(value);
    if (value === 'default') {
      setSortBy('');
      setIsDesc('false');
      return;
    }
    setSortBy('price');
    setIsDesc(value === 'desc' ? 'true' : 'false');
  };

  const currentConfigsData = useSelector(state => state.systemConfigs);

  console.log(currentConfigsData);

  const DiscountOptions =
    currentConfigsData?.currentConfigs?.shopPercentFilter?.map(filter => {
      let label = '';
      if (filter.toValue === null) {
        label = `Giảm trên ${filter.fromValue}%`;
      } else if (filter.fromValue === 0 || filter.fromValue === null) {
        label = `Giảm dưới ${filter.toValue}%`;
      } else {
        label = `${filter.fromValue}% - ${filter.toValue}%`;
      }

      return {
        label: label,
        value: `${filter.fromValue}-${filter.toValue || 'above'}`,
        min: filter.fromValue,
        max: filter.toValue,
      };
    });

  // const DiscountOptions = [
  //   { label: 'Giảm giá dưới 30%', value: 'under-30', min: 0, max: 30 },
  //   { label: 'Giảm giá từ 30% đến 50%', value: '30-50', min: 30, max: 50 },
  //   { label: 'Giảm giá trên 50%', value: 'above-50', min: 50, max: null },
  // ];

  return (
    <>
      {products.length > 0 && (
        <BreadcrumbsComponent
          breadcrumbs={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Khuyến mãi', href: '/saleoff' },
          ]}
        />
      )}
      <div className='flex p-4'>
        <div className='hidden lg:block w-1/5 m-1'>
          <Filter
            onDiscountChange={handleDiscountChange}
            onBrandChange={handleBrandChange}
            discountOptions={DiscountOptions}
          />
        </div>
        <div className='w-full lg:w-4/5 ml-2'>
          {loading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <div className='w-24 h-24 border-8 border-primary border-dotted rounded-full animate-spin'></div>
            </div>
          ) : (
            <>
              {Array.isArray(products) && products.length !== 0 ? (
                <div className='container mx-auto px-5'>
                  <div className='flex justify-between border bg-gray-50 rounded-lg px-4'>
                    <h1 className='text-sm sm:text-xl font-bold my-4'>
                      Khuyến mãi
                    </h1>
                    <div className='flex items-center space-x-2'>
                      <span className='font-semibold text-sm sm:text-lg'>
                        Sắp xếp:
                      </span>
                      <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className='border text-xs sm:text-base border-gray-300 py-1 px-3 rounded-md focus:outline-none bg-white text-gray-700 hover:border-[#EA580C] focus:ring-[#EA580C] focus:border-[#EA580C] focus-visible:ring-[#EA580C]'
                      >
                        <option value='default'>Mặc định</option>
                        <option value='asc'>Giá tăng dần</option>
                        <option value='desc'>Giá giảm dần</option>
                      </select>
                    </div>
                  </div>

                  {/* Grid để chứa các product items */}
                  <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2'>
                    {products.map((product, index) => (
                      <ProductItem
                        key={index}
                        imageUrl={product.productImagePath[0]}
                        name={product.productName}
                        price={
                          new Date(
                            product?.discountDetails?.discountExpiredDate
                          ) > new Date()
                            ? product.price *
                              ((100 -
                                product?.discountDetails?.discountPercent) /
                                100) // Hiển thị giá đã giảm nếu chưa hết hạn
                            : product.price // Hiển thị giá gốc nếu đã hết hạn
                        }
                        productLink={`products/detail/${product._id}`}
                        discount={
                          new Date(
                            product?.discountDetails?.discountExpiredDate
                          ) > new Date()
                            ? product?.discountDetails?.discountPercent
                            : null // Không hiển thị phần trăm giảm giá nếu đã hết hạn
                        }
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className='col-span-2 mt-4 flex justify-center'>
                    <PaginationComponent
                      path={`${location.pathname}`}
                      totalPages={totalPage}
                    />
                  </div>
                </div>
              ) : (
                <div className='w-full h-full flex justify-center items-center'>
                  <h2 className='font-semibold text-3xl'>
                    Không tìm thấy sản phẩm
                  </h2>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SafeOffPage;
