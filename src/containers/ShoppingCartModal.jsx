import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import IconLittleArrow from "../assets/icons/IconLittleArrow.jsx";
import ItemShoppingCart from './ItemShoppingCart';
import floorTotalPrice from "../utils/floorTotalPrice.js";

// eslint-disable-next-line react/prop-types
const ShoppingCartModal = ({ modalState = false , closeModal, shoppingCartState = {} }) => {
    const { itemsList } = shoppingCartState;

    const sumTotal = (item) => {
        const reducer = (accumulator, currentValue) => {
            return accumulator + (currentValue.price * currentValue.cartInfo.productAmount);
        }
        return floorTotalPrice(item.reduce(reducer, 0));
    }

    function beforeToClose() {
        closeModal();
        if (window.innerWidth < 768) window.history.back();
    }

    return (
        <section className={`fixed top-14 right-0 max-w-sm w-full h-[calc(100vh-56px)] px-4 border-l border-l-very-light-pink overflow-y-auto bg-white transition-all duration-500 ${(modalState !== 'SHOPPING_CART') && 'translate-x-full'}`}>
            <div className='flex items-center gap-3'>
                <button type="button" onClick={beforeToClose}>
                    <IconLittleArrow className='w-3 h-max rotate-180 cursor-pointer'/>
                </button>
                <h3 className='my-[18px] font-bold text-lg'>
                    Shopping cart
                </h3>
            </div>
            {(!itemsList || itemsList?.length === 0) && (
              <p className='my-6 text-center'>{"There's no items yet 🧦"}</p>
            )}
            {itemsList?.length > 0 && (
              <>
                <section>
                    {itemsList.map((product, index) => (
                        <ItemShoppingCart productData={product} key={index} />
                    ))}
                </section>
                <div className='flex justify-between items-center px-6 bg-input-field rounded-lg font-bold h-[70px]'>
                    <h3>Total</h3>
                    <span className={`${shoppingCartState.fetching && 'animate-pulse blur-[1px]'}`}>
                        ${sumTotal(itemsList)}
                    </span>
                </div>
                {location.pathname !== '/checkout' && (
                    <Link className='primary-button w-full' to={'/checkout'}>
                        Checkout
                    </Link>
                )}
              </>
            )}

            <aside className={`${shoppingCartState.fetching ? 'visible' : 'invisible'} absolute top-0 bottom-0 left-0 right-0 grid place-content-center bg-white/50`}>
                <AiOutlineLoading3Quarters className='inline-block w-24 h-max fill-very-light-pink animate-spin'/>
            </aside>
        </section>
    )
}

export default ShoppingCartModal;