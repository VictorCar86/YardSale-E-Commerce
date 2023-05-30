import { AiOutlineLoading3Quarters } from "react-icons/ai";
import IconLittleArrow from "../assets/icons/IconLittleArrow.jsx";
import ItemShoppingCart from './ItemShoppingCart';

const ShoppingCartModal = ({ shopModalState = false , closeModal, shoppingCartState = {} }) => {
    const { itemsList } = shoppingCartState;

    const sumTotal = (item) => {
        const reducer = (accumulator, currentValue) => {
            return accumulator + (currentValue.price * currentValue.cartInfo.productAmount);
        }
        return item.reduce(reducer, 0);
    }

    return (
        <section className={`fixed top-14 right-0 max-w-sm w-full min-h-[calc(100vh-56px)] h-full px-4 border-l border-l-very-light-pink overflow-y-auto bg-white transition-all duration-500 ${!shopModalState && 'translate-x-full'}`}>
            <div className='flex items-center gap-3'>
                <button type="button" onClick={closeModal}>
                    <IconLittleArrow className='w-3 h-max rotate-180 cursor-pointer'/>
                </button>
                <h3 className='my-[18px] font-bold text-lg'>
                    Shopping cart
                </h3>
            </div>
            {!itemsList && (
              <p className='my-6 text-center'>{"There's no items yet 🧦"}</p>
            )}
            {itemsList && (
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
                <button className='primary-button w-full' type='button'>
                    Checkout
                </button>
              </>
            )}

            <aside className={`${shoppingCartState.fetching ? 'visible' : 'invisible'} absolute top-0 bottom-0 left-0 right-0 grid place-content-center bg-white/50`}>
                <AiOutlineLoading3Quarters className='inline-block w-24 h-max fill-very-light-pink animate-spin'/>
            </aside>
        </section>
    )
}

export default ShoppingCartModal;