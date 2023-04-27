import { useState } from 'react'
import navbarIcon from '../assets/iconos/icon_menu.svg'
import mainLogo from '../assets/logos/logo_yard_sale.svg'
import shoppingCartIcon from '../assets/iconos/icon_shopping_cart.svg'
import AccountMenu from './AccountMenu'
import ShoppingCartModal from './ShoppingCartModal'

const Navbar = () => {
    const [userInfo, setUserInfo] = useState(false)

    const [shopModal, setShopModal] = useState(false)

    function toggleUser(){
        setUserInfo(prev => !prev)
    }

  return (
    <nav className='flex justify-between items-center h-14 w-full py-2 px-6 bg-white border-b-very-light-pink border-b fixed'>
        <button className='md:hidden block'>
            <img src={navbarIcon} alt="icon" />
        </button>
        <div className='flex'>
            <button type="button">
                <img className='w-[100px]' src={mainLogo} alt="logo" />
            </button>
            <ul className='md:flex hidden items-center mx-3'>
                <li className='inline-block text-very-light-pink px-1.5 py-1 hover:text-hospital-green hover:border-hospital-green border border-transparent rounded-md'>
                    <button type='button'>
                        All
                    </button>
                </li>
                <li className='inline-block text-very-light-pink px-1.5 py-1 hover:text-hospital-green hover:border-hospital-green border border-transparent rounded-md'>
                    <button type='button'>
                        Clothes
                    </button>
                </li>
                <li className='inline-block text-very-light-pink px-1.5 py-1 hover:text-hospital-green hover:border-hospital-green border border-transparent rounded-md'>
                    <button type='button'>
                        Electronics
                    </button>
                </li>
                <li className='inline-block text-very-light-pink px-1.5 py-1 hover:text-hospital-green hover:border-hospital-green border border-transparent rounded-md'>
                    <button type='button'>
                        Furnitures
                    </button>
                </li>
                <li className='inline-block text-very-light-pink px-1.5 py-1 hover:text-hospital-green hover:border-hospital-green border border-transparent rounded-md'>
                    <button type='button'>
                        Toys
                    </button>
                </li>
                <li className='inline-block text-very-light-pink px-1.5 py-1 hover:text-hospital-green hover:border-hospital-green border border-transparent rounded-md'>
                    <button type='button'>
                        Others
                    </button>
                </li>
            </ul>
        </div>
        <div className=''>
            <ul className='flex items-center'>
                <li className='md:block hidden text-very-light-pink text-sm'>
                    <button type="button" onClick={toggleUser}>
                        youremail@email.com
                    </button>
                    {userInfo && <AccountMenu />}
                </li>
                <li>
                    <button
                        className='relative mt-2 ml-3'
                        type="button"
                        onClick={() => setShopModal(prev => !prev)}
                    >
                        <img src={shoppingCartIcon} alt="shopping cart" />
                        {/* {state.cart.length > 0 && (
                            <span className='absolute top-[-4px] text-xs font-bold w-4 h-4 bg-hospital-green rounded-lg'>
                                <span className='text-center'>{state.cart.length}</span>
                            </span>
                        )} */}
                    </button>
                </li>
            </ul>
        </div>
        {shopModal && (
            <ShoppingCartModal />
        )}
    </nav>
  )
}

export default Navbar