import CloseIcon from "../assets/iconos/icon_close.png";

const ItemShoppingCart = ({ product, index }) => {
  // Remove from cart
  return (
    <article className='flex justify-between items-center gap-4 mb-4'>
        <img
            className='w-[70px] h-[70px] object-cover rounded-lg'
            src={product.images[0]}
            alt={product.title}
        />
        <p className='text-very-light-pink'>{product.title}</p>
        <span className='font-bold'>${product.price}</span>
        <button className='contents' onClick={() => console.log(index)}>
            <img src={CloseIcon} alt="X icon" />
        </button>
    </article>
  )
}

export default ItemShoppingCart