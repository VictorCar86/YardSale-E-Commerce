import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsState } from '../context/sliceProductsState';
import Navbar from '../containers/Navbar';
import ProductItemDesc from '../containers/ProductItemDesc';
import productsAPI from '../utils/requests/ProductsAPI';
import ProductPreviewModal from '../containers/ProductPreviewModal';

const MainPage = () => {
    const dispatcher = useDispatch();
    const { productsData } = useSelector(productsState);

    useEffect(() => {
        if (!productsData) {
            productsAPI.PRODUCTS_LIST({}, dispatcher);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [previewModal, setPreviewModal] = useState(false);

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='relative pt-14'>
                <section className='w-full h-full pt-6'>
                    <ul className='grid grid-auto-fill gap-6 justify-center'>
                        {productsData?.products.map((item, index) => (
                            <ProductItemDesc
                                productData={item}
                                openModal={() => setPreviewModal(true)}
                                key={index}
                            />
                        ))}
                    </ul>
                </section>
                <ProductPreviewModal
                    className='fixed top-14 right-0'
                    stateModal={previewModal}
                    closeModal={() => setPreviewModal(false)}
                />
            </main>
        </>
    )
}

export default MainPage;