import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { userState } from '../context/sliceUserState';
import { productsState } from '../context/sliceProductsState';
import { shoppingCartState } from '../context/sliceShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import productNotFoundImg from '../assets/images/product_not_found.webp';
import AdviceSessionModal from './AdviceSessionModal';
import shoppingCartAPI from '../utils/requests/ShoppingCartAPI';
import IconAddToCart from '../assets/icons/IconAddToCart';
import 'swiper/css';

// eslint-disable-next-line react/prop-types
const ProductPreviewModal = ({ className = "", stateModal, closeModal }) => {
    const dispatcher = useDispatch();
    const { userInfo } = useSelector(userState);
    const { productPreview } = useSelector(productsState);
    const mainShopCartState = useSelector(shoppingCartState);

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

    return (
        <aside className={`${className} w-full sm:max-w-sm sm:w-screen min-h-[calc(100vh-56px)] h-full bg-white transition-all duration-500 ${!stateModal && 'translate-x-full'}`}>
            <button className='fixed z-20 grid p-2 mt-3 ml-3 rounded-full bg-white shadow-[0px_0px_4px_1px_#7B7B7B]' type='button' onClick={closeModal}>
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
                            <img className='w-full h-min object-cover' src={productPreview?.image ?? productNotFoundImg} alt=""/>
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
                    className='flex justify-center items-center w-4/5 mx-auto py-1 rounded-lg text-white font-bold bg-hospital-green'
                    disabled={mainShopCartState.fetching}
                    onClick={sendToCart}
                    type="button"
                >
                    <IconAddToCart/>
                    <span>Add to cart</span>
                </button>
            </figure>
            {adviceModal && (
                <AdviceSessionModal closeModal={() => setAdviceModal(false)} />
            )}
        </aside>
    )
}

export default ProductPreviewModal;