import skeletonImg from '../assets/images/skeleton.webp';
import IconAddToCart from "../assets/icons/IconAddToCart";

const ProductItemSkeleton = (): JSX.Element => {
  return (
    <li className='relative animate-pulse'>
        <figure className='inline-block sm:w-60 w-[140px]'>
            <img
                className='sm:h-60 h-[140px] sm:w-60 w-[140px] object-cover rounded-2xl shadow-[0px_0px_3px_0px_#7B7B7B]'
                src={skeletonImg}
                alt='Product loading, please wait...'
            />
            <figcaption className='mt-3.5 blur-[2px]'>
                <p className='font-bold'>
                    $0.00
                </p>
                <p className='w-[70%] text-sm text-very-light-pink overflow-ellipsis whitespace-nowrap overflow-hidden'>
                    Loading...
                </p>
            </figcaption>
        </figure>

        <button
            className={`absolute right-1 bottom-2 w-10 h-10 rounded-full blur-[2px]`}
            disabled={true}
            type="button"
        >
            <IconAddToCart/>
        </button>
    </li>
  )
}

export default ProductItemSkeleton;