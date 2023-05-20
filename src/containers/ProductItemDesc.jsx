import addToCartIcon from '../assets/icons/bt_add_to_cart.svg';
import productNotFoundImg from '../assets/images/product_not_found.webp';

// eslint-disable-next-line react/prop-types
const ProductItemDesc = ({ productData = {} }) => {
    return (
        <li className='relative'>
            <figure className='inline-block sm:w-60 w-[140px] cursor-pointer' onClick={() => console.log("zzz")}>
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
            <button onClick={() => console.log(productData)} className='absolute right-1 bottom-1 w-9'>
                <img src={addToCartIcon} alt="Add to cart icon"/>
            </button>
        </li>
    )
}

export default ProductItemDesc;