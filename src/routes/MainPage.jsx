import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsState } from '../context/sliceProductsState';
import MainNavbar from '../containers/MainNavbar';
import ProductItemDesc from '../containers/ProductItemDesc';
import productsAPI from '../utils/requests/ProductsAPI';
import ProductPreviewModal from '../containers/ProductPreviewModal';
import { Toaster } from 'sonner';
import { modalsState, productPreviewModal, resetCurrentModal } from '../context/sliceModalsState';

const MainPage = () => {
    const { productsData } = useSelector(productsState);
    const { currentModal } = useSelector(modalsState);
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

                <ProductPreviewModal
                    className='fixed top-14 right-0'
                    stateModal={currentModal}
                    closeModal={() => dispatcher(resetCurrentModal())}
                />

                <Toaster richColors position="bottom-center"/>
            </main>
        </>
    )
}

export default MainPage;