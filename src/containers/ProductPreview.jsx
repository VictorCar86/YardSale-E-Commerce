import addToCartIcon from '../assets/icons/bt_add_to_cart.svg';

// eslint-disable-next-line react/prop-types
const ProductPreview = ({ className = "" }) => {
  return (
    <aside className={`${className} max-w-sm w-screen h-[calc(100vh-56px)] bg-white`}>
        <figure>
            <ul>
                <li>
                    <img src="" alt=""/>
                </li>
                <li>
                    <img src="" alt=""/>
                </li>
                <li>
                    <img src="" alt=""/>
                </li>
            </ul>
            <nav className="flex justify-center gap-3">
                <span className="h-2 w-2 rounded-full bg-hospital-green"></span>
                <span className="h-2 w-2 rounded-full bg-hospital-green"></span>
                <span className="h-2 w-2 rounded-full bg-hospital-green"></span>
            </nav>
            <figcaption className='w-4/5 mx-auto'>
                <div className='mb-8'>
                    <p>$PRICE</p>
                    <p>NAME</p>
                </div>
                <p className='mb-8'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut mollitia nisi, distinctio sed sint sequi eaque? Temporibus a, porro recusandae, officia iure, dolor optio commodi excepturi eligendi modi libero voluptatum?</p>
            </figcaption>
            <button className='flex justify-center items-center w-4/5 mx-auto py-1 rounded-lg text-white font-bold bg-hospital-green' type="button">
                <img src={addToCartIcon} alt="" />
                <span>Add to cart</span>
            </button>
        </figure>
    </aside>
  )
}

export default ProductPreview;