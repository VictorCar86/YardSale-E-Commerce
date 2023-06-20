import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalsState, productPreviewModal } from '../context/sliceModalsState';
import { productsState } from '../context/sliceProductsState';
import ProductItemDesc from '../containers/ProductItemDesc';
import MainNavbar from '../containers/MainNavbar';
import productsAPI from '../utils/requests/ProductsAPI';
import IconLittleArrow from '../assets/icons/IconLittleArrow';
import ProductItemSkeleton from '../containers/ProductItemSkeleton';
import productCategories from '../utils/productCategories';

const MainPage = () => {
    const mainProductsState = useSelector(productsState);
    const { currentModal } = useSelector(modalsState);
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

        window.location.href = url;
    }

    const [pageNumbers, setPageNumbers] = useState([]);

    function generateNavbarPages() {
        if (maxPage > 7){
            const maxDisplayedPages = 7;
            let startPage = currentPage - Math.floor(maxDisplayedPages / 2);

            if (startPage < 1) startPage = 1;

            let endPage = startPage + maxDisplayedPages - 1;

            if (endPage > maxPage) {
                endPage = maxPage;
                startPage = endPage - maxDisplayedPages + 1;
                if (startPage < 1) {
                    startPage = 1;
                }
            }
            setPageNumbers([...Array(endPage - startPage + 1)].map((_, i) => startPage + i));
        }
        else {
            setPageNumbers([...Array(maxPage).keys()].map(i => i + 1));
        }
    }

    useEffect(() => {
        if (!productsData){
            getProducts();
            window.scrollTo(0, 0);
        }
        generateNavbarPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsData]);

    const mainTagRef = useRef(null);

    useEffect(() => {
        const tag = mainTagRef.current;
        if (tag !== null){
            if (currentModal && window.innerWidth < 468) {
                tag.style.top = `-${scrollY}px`;
                tag.style.position = 'fixed';
                tag.style.overflowY = 'hidden';
            }
            else {
                const lastPosition = parseInt(tag.style.top.slice(1));
                tag.style.top = '';
                tag.style.position = '';
                tag.style.overflowY = '';
                window.scrollTo(0, lastPosition);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentModal]);

    function openModal() {
        if (window.innerWidth < 768) window.location.hash = "product-preview";
        setTimeout(() => dispatcher(productPreviewModal()), 0);
    }

    return (
        <>
            <header>
                <MainNavbar />
            </header>
            <main className='relative min-h-screen w-full pt-14' ref={mainTagRef}>
                <section className='flex flex-col justify-between min-h-[calc(100vh-56px)] h-max w-full pt-6'>
                    <ul className='grid grid-auto-fill gap-6 justify-center'>
                        {(!productsData && mainProductsState.fetching) && (
                          <>
                            {[...Array( window.innerWidth > 768 ? 20 : 10 ).keys()].map(i => (
                                <ProductItemSkeleton key={i}/>
                            ))}
                          </>
                        )}
                        {(productsData && !mainProductsState.fetching) && (
                          <>
                            {productsData.products.map((item, i) => (
                                <ProductItemDesc
                                    key={i}
                                    productData={item}
                                    openModal={openModal}
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
                            {pageNumbers.map(i => (
                                <li key={i}>
                                    <button
                                        className={`${currentPage === i ? 'text-hospital-green' : 'text-very-light-pink'} px-1`}
                                        onClick={() => searchForPage(i)}
                                        disabled={mainProductsState.fetching}
                                        type='button'
                                    >
                                        {i}
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
        </>
    )
}

export default MainPage;