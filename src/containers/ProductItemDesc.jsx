import { useState } from 'react';
import { userState } from '../context/sliceUserState';
import { useDispatch, useSelector } from 'react-redux';
import { createProductPreview } from '../context/sliceProductsState';
import addToCartIcon from '../assets/icons/bt_add_to_cart.svg';
import productNotFoundImg from '../assets/images/product_not_found.webp';
import AdviceSessionModal from './AdviceSessionModal';

// eslint-disable-next-line react/prop-types
const ProductItemDesc = ({ productData = {}, openModal }) => {
    const dispatcher = useDispatch();
    const { userInfo } = useSelector(userState);

    function createPreview() {
        dispatcher(createProductPreview(productData));
        openModal();
    }

    const [adviceModal, setAdviceModal] = useState(false);

    function sendToCart() {
        if (!userInfo){
            setAdviceModal(true);
        }
    }

    return (
        <li className='relative'>
            <figure className='inline-block sm:w-60 w-[140px] cursor-pointer' onClick={createPreview}>
                <img
                    className='sm:h-60 h-[140px] sm:w-60 w-[140px] object-cover rounded-2xl'
                    src={productData.image || productNotFoundImg}
                    alt={productData.title}
                />
                <figcaption className='mt-3.5'>
                    <p className='font-bold'>${productData.price}</p>
                    <p className='text-sm text-very-light-pink'>{productData.name}</p>
                </figcaption>
            </figure>

            <button className='absolute right-1 bottom-1 w-9' onClick={sendToCart} type="button">
                <img src={addToCartIcon} alt="Add to cart icon"/>
            </button>

            {adviceModal && (
                <AdviceSessionModal closeModal={() => setAdviceModal(false)} />
            )}
        </li>
    )
}

export default ProductItemDesc;