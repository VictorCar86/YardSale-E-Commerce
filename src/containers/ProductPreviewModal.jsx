import { useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { userState } from '../context/sliceUserState';
import { productsState } from '../context/sliceProductsState';
import { shoppingCartState } from '../context/sliceShoppingCartState';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import productNotFoundImg from '../assets/images/product_not_found.webp';
import AdviceSessionModal from './AdviceSessionModal';
import shoppingCartAPI from '../utils/requests/ShoppingCartAPI';
import IconAddToCart from '../assets/icons/IconAddToCart';
import IconAddedToCart from '../assets/icons/IconAddedToCart';
import 'swiper/css';

// eslint-disable-next-line react/prop-types
const ProductPreviewModal = ({ className = "", stateModal, closeModal }) => {
    const dispatcher = useDispatch();
    const mainShopCartState = useSelector(shoppingCartState);
    const { productPreview } = useSelector(productsState);
    const { userInfo } = useSelector(userState);
    const { itemsList, fetching } = mainShopCartState;

    function beforeToClose() {
        closeModal();
        if (window.innerWidth < 768) window.history.back();
    }

    const [swiperIndex, setSwiperIndex] = useState(0);
    const swiperRef = useRef(null);

    const arraySample = [...Array(productPreview?.image || 3).keys()];
    const [adviceModal, setAdviceModal] = useState(false);

    function sendToCart() {
        if (!userInfo){
            setAdviceModal(true);
            return;
        }
        const config = {
            body: {
                productId: productPreview.id,
            }
        };
        shoppingCartAPI.ADD_ITEM(config, dispatcher);
    }

    const alreadyExistItem = useMemo(() => {
        return itemsList?.some(item => item.id === productPreview?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsList, productPreview]);

    const modalRef = useRef(null);

    useEffect(() => {
        if (stateModal !== 'PRODUCT_PREVIEW') {
            setTimeout(() => {
                modalRef.current?.scrollTo(0, 0);
            }, 500);
        }
    }, [stateModal]);

    return (
        <aside className={`${className} w-full sm:max-w-sm sm:w-screen min-h-[calc(100vh-56px)] h-[calc(100vh-112px)] border-l border-l-very-light-pink max-sm:overflow-y-scroll bg-white transition-all duration-500 ${(stateModal !== 'PRODUCT_PREVIEW') && 'translate-x-full'}`} ref={modalRef}>
            <button className='fixed z-20 grid p-2 mt-3 ml-3 rounded-full bg-white shadow-[0px_0px_4px_1px_#7B7B7B]' type='button' onClick={beforeToClose}>
                <IoMdClose className='inline-block w-[26px] h-min fill-very-light-pink'/>
            </button>
            <figure>
                <Swiper
                    className='sm:rounded-b-2xl'
                    onSlideChange={event => setSwiperIndex(event.activeIndex)}
                    ref={swiperRef}
                >
                    {arraySample.map(i => (
                        <SwiperSlide key={i}>
                            <img className='w-full h-min aspect-[4/4] object-cover' src={productPreview?.image ?? productNotFoundImg} alt=""/>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <nav className="flex justify-center gap-3 py-4">
                    {arraySample.map(i => (
                        <span
                            className={`h-3 w-3 rounded-full cursor-pointer ${swiperIndex === i ? 'bg-hospital-green' : 'bg-very-light-pink/70'}`}
                            onClick={() => swiperRef.current.swiper.slideTo(i)}
                            key={i}
                        />
                    ))}
                </nav>

                <figcaption className='w-4/5 mx-auto text-very-light-pink'>
                    <div className='mb-8'>
                        <p className='text-black font-bold'>
                            ${productPreview?.price}
                        </p>
                        <p>{productPreview?.name}</p>
                    </div>
                    <p className='mb-8'>{productPreview?.description}</p>
                </figcaption>
                <button
                    className={`primary-button gap-2 w-4/5 mx-auto ${alreadyExistItem && 'secondary-button cursor-default border-none shadow-[0px_0px_4px_0px_#7B7B7B]'}`}
                    disabled={mainShopCartState.fetching || alreadyExistItem}
                    onClick={sendToCart}
                    type="button"
                >
                    {fetching && <AiOutlineLoading3Quarters className='inline-block w-7 h-max fill-white animate-spin'/>}
                    {!fetching && (<>
                        {alreadyExistItem && <IconAddedToCart className='w-10'/>}
                        {!alreadyExistItem && <IconAddToCart/>}
                    </>)}
                    <span>
                        {alreadyExistItem ? 'Already added to cart' : 'Add to cart'}
                    </span>
                </button>
            </figure>
            {adviceModal && (
                <AdviceSessionModal closeModal={() => setAdviceModal(false)} />
            )}
        </aside>
    )
}

export default ProductPreviewModal;