import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productPreviewModal } from '../context/sliceModalsState';
import { productsState } from '../context/sliceProductsState';
import { Toaster } from 'sonner';
import ProductItemDesc from '../containers/ProductItemDesc';
import MainNavbar from '../containers/MainNavbar';
import productsAPI from '../utils/requests/ProductsAPI';

const MainPage = () => {
    const { productsData } = useSelector(productsState);
    const dispatcher = useDispatch();

    useEffect(() => {
        if (!productsData) {
            productsAPI.PRODUCTS_LIST({}, dispatcher);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <header>
                <MainNavbar />
            </header>
            <main className='relative pt-14'>
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
                </section>
            </main>

            <Toaster richColors position="bottom-center"/>
        </>
    )
}

export default MainPage;