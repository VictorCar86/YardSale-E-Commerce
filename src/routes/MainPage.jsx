import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productPreviewModal } from '../context/sliceModalsState';
import { productsState } from '../context/sliceProductsState';
import { Toaster } from 'sonner';
import ProductItemDesc from '../containers/ProductItemDesc';
import MainNavbar from '../containers/MainNavbar';
import productsAPI from '../utils/requests/ProductsAPI';
import IconLittleArrow from '../assets/icons/IconLittleArrow';

const MainPage = () => {
    const { productsData } = useSelector(productsState);
    const { currentPage, maxPage } = productsData || {};
    const dispatcher = useDispatch();

    function searchForPage(page = 1) {
        location.search = `?page=${page}`;
    }

    useEffect(() => {
        const url = new URLSearchParams(location.search);
        const currentPage = url.get('page');
        if (!productsData || currentPage) {
            const config = {
                params: {
                    page: currentPage || 1,
                },
            };
            productsAPI.PRODUCTS_LIST(config, dispatcher);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    return (
        <>
            <header>
                <MainNavbar />
            </header>
            <main className='relative h-screen pt-14'>
                <section className='w-full h-full pt-6'>
                    <ul className='grid grid-auto-fill gap-6 justify-center'>
                        {productsData?.products.map((item, index) => (
                            <ProductItemDesc
                                key={index}
                                productData={item}
                                openModal={() => dispatcher(productPreviewModal())}
                            />
                        ))}
                    </ul>

                    <nav className='flex justify-center gap-3'>
                        {currentPage > 1 && (
                            <button onClick={() => searchForPage(currentPage - 1)} type='button'>
                                <IconLittleArrow className='w-2.5 h-max rotate-180'/>
                            </button>
                        )}
                        <ol className='flex gap-2 font-bold'>
                            {[...Array(maxPage || 1).keys()].map(i => (
                                <li key={i}>
                                    <button
                                        className={`${currentPage === i + 1 ? 'text-hospital-green' : 'text-very-light-pink'} px-1`}
                                        onClick={() => searchForPage(i + 1)}
                                        type='button'
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ol>
                        {currentPage !== maxPage && (
                            <button onClick={() => searchForPage(currentPage + 1)} type='button'>
                                <IconLittleArrow className='w-2.5 h-max'/>
                            </button>
                        )}
                    </nav>
                </section>
            </main>

            <Toaster richColors position="bottom-center"/>
        </>
    )
}

export default MainPage;