import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingCartState } from '../context/sliceShoppingCartState';
import { productPreviewModal } from '../context/sliceModalsState';
import { createProductPreview } from '../context/sliceProductsState';
import { toast } from 'sonner';
import shoppingCartAPI from '../utils/requests/ShoppingCartAPI';
import productNotFoundImg from '../assets/images/product_not_found.webp';

// eslint-disable-next-line react/prop-types
const ItemShoppingCart = ({ productData = {} }) => {
    const dispatcher = useDispatch();
    const mainShopCartState = useSelector(shoppingCartState);

    function showPreview() {
        dispatcher(createProductPreview(productData));
        dispatcher(productPreviewModal());
    }

    const [amount, setAmount] = useState(productData.cartInfo.productAmount);

    function updateAmount(event) {
        const currentValue = event.target.value;
        if (currentValue === productData.cartInfo.productAmount){
            return;
        }

        const config = {
            body: {
                productId: productData.id,
                productAmount: currentValue,
            },
            onSuccess: () => {
                toast.success('The item from your shopping cart was updated!');
                setAmount(currentValue);
            },
        };
        shoppingCartAPI.UPDATE_ITEM(config, dispatcher);
    }

    function deleteItem() {
        const config = {
            body: {
                productId: productData.id,
            },
            onSuccess: () => toast.success('The item from your shopping cart was deleted!'),
        };
        shoppingCartAPI.DELETE_ITEM(config, dispatcher);
    }

    return (
        <article className='flex justify-between items-center mb-4'>
            <button className='w-3/4' onClick={showPreview} type='button'>
                <figure className='flex items-center gap-4'>
                    <img
                        className='w-[70px] h-[70px] object-cover rounded-lg shadow-[0px_0px_2px_0px_#7B7B7B]'
                        src={productData.image ?? productNotFoundImg}
                        alt={productData.name}
                    />
                    <figcaption className="flex justify-between items-center">
                        <p className='text-very-light-pink overflow-hidden whitespace-break-spaces overflow-ellipsis'>
                            {productData.name}
                        </p>
                    </figcaption>
                </figure>
            </button>
            <span className='flex justify-between items-center w-1/2 ml-4'>
                <select className='rounded border border-very-light-pink' value={amount} onChange={updateAmount}>
                    <option value='1'> 1 </option>
                    <option value='2'> 2 </option>
                    <option value='3'> 3 </option>
                    <option value='4'> 4 </option>
                    <option value='5'> 5 </option>
                </select>
                <span className='font-bold'>${productData.price}</span>
                <button
                    className='contents'
                    disabled={mainShopCartState.fetching}
                    onClick={deleteItem}
                    type='button'
                >
                    <IoMdClose className='inline-block w-7 h-min fill-very-light-pink'/>
                </button>
            </span>
        </article>
    );
}

export default ItemShoppingCart;