import { useState, ChangeEvent } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { ItemCartInfo, shoppingCartState } from '../context/sliceShoppingCartState';
import { productPreviewModal } from '../context/sliceModalsState';
import { createProductPreview } from '../context/sliceProductsState';
import { toast } from 'sonner';
import { FetchConfig } from '../utils/requests/MakeRequest';
import shoppingCartAPI from '../utils/requests/ShoppingCartAPI';
import productNotFoundImg from '../assets/images/product_not_found.webp';

type Props = { itemCart: ItemCartInfo };

const ItemShoppingCart = ({ itemCart }: Props): JSX.Element => {
    const dispatcher = useDispatch();
    const mainShopCartState = useSelector(shoppingCartState);

    function showPreview() {
        dispatcher(createProductPreview(itemCart));
        dispatcher(productPreviewModal());
    }

    const [amount, setAmount] = useState(itemCart.cartInfo.productAmount);

    function updateAmount(event: ChangeEvent<HTMLSelectElement>) {
        const currentValue = parseInt(event.target.value);
        if (currentValue === itemCart.cartInfo.productAmount){
            return;
        }

        const fetchConfig: FetchConfig = {
            body: {
                productId: itemCart.id,
                productAmount: currentValue,
            },
            onSuccess: () => {
                toast.success('The item from your shopping cart was updated!');
                setAmount(currentValue);
            },
        };
        shoppingCartAPI.UPDATE_ITEM(fetchConfig, dispatcher);
    }

    function deleteItem() {
        const fetchConfig: FetchConfig = {
            body: {
                productId: itemCart.id,
            },
            onSuccess: () => toast.success('The item from your shopping cart was deleted!'),
        };
        shoppingCartAPI.DELETE_ITEM(fetchConfig, dispatcher);
    }

    return (
        <article className='flex justify-between items-center mb-4'>
            <button className='w-3/4' onClick={showPreview} type='button'>
                <figure className='flex items-center gap-4'>
                    <img
                        className='w-[70px] h-[70px] object-cover rounded-lg shadow-[0px_0px_2px_0px_#7B7B7B]'
                        src={itemCart.image ?? productNotFoundImg}
                        alt={itemCart.name}
                    />
                    <figcaption className="flex justify-between items-center">
                        <p className='text-very-light-pink overflow-hidden whitespace-break-spaces overflow-ellipsis'>
                            {itemCart.name}
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
                <span className='font-bold'>${itemCart.price}</span>
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