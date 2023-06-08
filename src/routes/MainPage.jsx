import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productPreviewModal } from '../context/sliceModalsState';
import { productsState } from '../context/sliceProductsState';
import { Toaster } from 'sonner';
import ProductItemDesc from '../containers/ProductItemDesc';
import MainNavbar from '../containers/MainNavbar';
import productsAPI from '../utils/requests/ProductsAPI';
import IconLittleArrow from '../assets/icons/IconLittleArrow';
import ProductItemSkeleton from '../containers/ProductItemSkeleton';
import productCategories from '../utils/productCategories';

const MainPage = () => {
    const mainProductsState = useSelector(productsState);
    const { productsData } = mainProductsState;
    const { currentPage, maxPage } = productsData || {};
    const dispatcher = useDispatch();

    function getProducts() {
        const url = new URLSearchParams(location.search);
        const page = url.get('page');
        const category = productCategories[url.get('category')];

        const config = {
            params: {
                page: page || 1,
                categoryId: category,
            },
        };
        productsAPI.PRODUCTS_LIST(config, dispatcher);
    }

    function searchForPage(page = 1) {
        const search = new URLSearchParams(location.search);
        const hasCategory = search.has('category');
        const hasPage = search.has('page');

        let url = '';

        if (hasCategory && !hasPage) {
            url = location.href + `&page=${page}`;
        }
        else if (hasPage) {
            const pageIndex = location.href.search('page');
            url = location.href.slice(0, pageIndex) + `page=${page}`
        }
        else {
            url = location.origin + `/?page=${page}`
        }

        history.replaceState({}, '', url);
        window.scrollTo(0, 0);
        getProducts();
    }

    useEffect(() => {
        if (!productsData){
            getProducts();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsData]);

    return (
        <>
            <header>
                <MainNavbar />
            </header>
            <main className='relative h-screen pt-14'>
                <section className='flex flex-col justify-between min-h-[calc(100vh-56px)] h-max w-full pt-6'>
                    <ul className='grid grid-auto-fill gap-6 justify-center'>
                        {(!productsData && mainProductsState.fetching) && (
                          <>
                            {[...Array(10).keys()].map(i => <ProductItemSkeleton key={i}/>)}
                          </>
                        )}
                        {(productsData && !mainProductsState.fetching) && (
                          <>
                            {productsData.products.map((item, index) => (
                                <ProductItemDesc
                                    key={index}
                                    productData={item}
                                    openModal={() => dispatcher(productPreviewModal())}
                                />
                            ))}
                          </>
                        )}
                    </ul>

                    <nav className='flex justify-center gap-3 py-8'>
                        <button
                            className={`${!(currentPage > 1) && 'invisible'}`}
                            onClick={() => searchForPage(currentPage - 1)}
                            disabled={mainProductsState.fetching}
                            type='button'
                        >
                            <IconLittleArrow className='w-2.5 h-max rotate-180'/>
                        </button>
                        <ol className='flex gap-2 font-bold'>
                            {[...Array(maxPage || 1).keys()].map(i => (
                                <li key={i}>
                                    <button
                                        className={`${currentPage === i + 1 ? 'text-hospital-green' : 'text-very-light-pink'} px-1`}
                                        onClick={() => searchForPage(i + 1)}
                                        disabled={mainProductsState.fetching}
                                        type='button'
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ol>
                        <button
                            className={`${currentPage === maxPage && 'invisible'}`}
                            onClick={() => searchForPage(currentPage + 1)}
                            disabled={mainProductsState.fetching}
                            type='button'
                        >
                            <IconLittleArrow className='w-2.5 h-max'/>
                        </button>
                    </nav>
                </section>
            </main>

            <Toaster richColors position="bottom-center"/>
        </>
    )
}

export default MainPage;