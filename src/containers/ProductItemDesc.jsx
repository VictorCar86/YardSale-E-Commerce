import addToCartIcon from '../assets/iconos/bt_add_to_cart.svg';

const ProductItemDesc = ({ product = {} }) => {
    return (
        <article className='inline-block sm:w-60 w-[140px]'>
            <img className='sm:h-60 h-[140px] sm:w-60 w-[140px] object-cover rounded-2xl' src={product.images[0]} alt={product.title} />
            <div className='flex justify-between mt-3.5'>
                <div className='w-max'>
                    <span className='font-bold'>${product.price}</span>
                    <p className='text-sm text-very-light-pink'>{product.title}</p>
                </div>
                <button onClick={() => console.log(product)} className='w-9'>
                    <img src={addToCartIcon} alt="Add to cart icon" />
                </button>
            </div>
        </article>
    )
}

export default ProductItemDesc;