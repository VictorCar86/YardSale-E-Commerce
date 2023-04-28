import MiniArrowIcon from "../assets/icons/flechita.svg";
// import ItemShoppingCart from './ItemShoppingCart';

const ShoppingCartModal = () => {
    // const displayItems = () => {
    //   return state.cart.map((product, index) => {
    //     return (
    //       <ItemShoppingCart product={product} index={index} key={index} />
    //     )
    //   })
    // }

    // const sumTotal = (item) => {
    //   const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    //   return item.cart.reduce(reducer, 0)
    // }

    return (
        <section className='w-[300px] bg-white h-screen px-3 border-l border-l-very-light-pink top-14 right-0 fixed overflow-y-auto'>
            <div className='flex items-center'>
                <img className='rotate-180 mr-2' src={MiniArrowIcon} alt="little arrow" />
                <h3 className='my-[18px] font-bold text-lg'>Shopping cart</h3>
            </div>
            {/* {state.cart.length === 0 && (
              <h3 className='my-6 text-center'>{"There's no items yet 🧦"}</h3>
            )}
            {state.cart.length > 0 && (
              <>
                <section>
                  {displayItems()}
                </section>
                <div className='flex justify-between items-center px-6 bg-input-field rounded-lg font-bold h-[70px]'>
                    <h3>Total</h3>
                    <span>${sumTotal(state)}</span>
                </div>
                <button className='btn w-full' type='button'>Checkout</button>
              </>
            )} */}
        </section>
    )
}

export default ShoppingCartModal