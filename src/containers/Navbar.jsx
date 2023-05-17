import { FaRegUser } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { userState } from '../context/sliceUserState';
import navbarIcon from '../assets/icons/icon_menu.svg'
import mainLogo from '../assets/logos/logo_yard_sale.svg'
import shoppingCartIcon from '../assets/icons/icon_shopping_cart.svg'
import AccountMenu from './AccountMenu'
import ShoppingCartModal from './ShoppingCartModal'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const mainUserState = useSelector(userState);
    const { userInfo } = mainUserState;

    const [accountModal, setAccountModal] = useState(false);
    const [shopModal, setShopModal] = useState(false);

    const accountMenuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
                setAccountModal(prev => !prev);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [accountMenuRef]);

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
                <ul className='flex items-center gap-5'>
                    <li className='relative md:block hidden text-white'>
                        {mainUserState.fetching && (
                            <button
                                className='py-1 px-1.5 border-2 border-hospital-green rounded-md text-very-light-pink animate-pulse'
                                type='button'
                                disabled={true}
                            >
                                <FaRegUser className='inline-block w-5 h-max mr-1.5'/>
                                <span className='blur-[2px]'>example@email.com</span>
                            </button>
                        )}
                        {!mainUserState.fetching && (
                          <>
                            {userInfo?.email && (
                                <button
                                    className='py-1 px-1.5 border-2 border-hospital-green rounded-md text-very-light-pink'
                                    onClick={() => setAccountModal(true)}
                                    type='button'
                                >
                                    <FaRegUser className='inline-block w-5 h-max mr-1.5'/>
                                    <span>{userInfo.email}</span>
                                </button>
                            )}
                            {!userInfo?.email && (
                            <>
                                <Link className='inline-block h-9 py-1.5 px-3 mr-4 rounded-md bg-hospital-green' to={'/login'}>
                                    Log In
                                </Link>
                                <Link className='inline-block h-9 py-1.5 px-3 rounded-md bg-hospital-green' to={'/signup'}>
                                    Sign Up
                                </Link>
                            </>
                            )}
                            {accountModal && (
                                <AccountMenu customRef={accountMenuRef}/>
                            )}
                          </>
                        )}
                    </li>
                    <li>
                        <button
                            className='relative grid p-[5px] pb-[3px] border-2 border-hospital-green rounded-full'
                            type="button"
                            onClick={() => setShopModal(prev => !prev)}
                        >
                            <img src={shoppingCartIcon} alt="shopping cart"/>
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