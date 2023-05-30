import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userState } from '../context/sliceUserState';
import { shoppingCartState } from '../context/sliceShoppingCart';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import LogoYardSale from '../assets/logos/logoYardSale';
import ShoppingCartModal from './ShoppingCartModal';
import AdviceSessionModal from './AdviceSessionModal';
import IconMenu from '../assets/icons/IconMenu';
import IconShoppingCart from '../assets/icons/IconShoppingCart';
import AccountMenu from './AccountMenu';
import NavbarMobile from './NavbarMobile';

const MainNavbar = () => {
    const mainUserState = useSelector(userState);
    const mainShopCartState = useSelector(shoppingCartState);
    const { userInfo } = mainUserState;
    const { itemsList } = mainShopCartState;

    const [shopModal, setShopModal] = useState(false);
    const [adviceModal, setAdviceModal] = useState(false);
    const [secondNavbar, setSecondNavbar] = useState(false);
    const [accountModal, setAccountModal] = useState(false);

    function showCart() {
        if (!userInfo) {
            setAdviceModal(true);
            return;
        }
        setShopModal(prev => !prev);
    }

    const accountMenuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            const menu = accountMenuRef.current;
            if (menu && !menu.contains(event.target)) {
                setAccountModal(prev => !prev);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [accountMenuRef]);

    return (
        <nav className='fixed z-30 flex justify-between items-center h-14 w-full py-2 px-6 border-b-very-light-pink border-b bg-white'>
            <button className='md:hidden block' onClick={() => setSecondNavbar(prev => !prev)}>
                <IconMenu />
            </button>
            <div className='flex'>
                <button type="button">
                    <LogoYardSale className='w-[100px]'/>
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
                <ul className='flex items-center gap-4 lg:gap-5'>
                    <li className='relative md:block hidden text-white'>
                        {mainUserState.fetching && (
                            <button
                                className='py-1 px-1.5 border-2 border-hospital-green rounded-full lg:rounded-md text-very-light-pink animate-pulse'
                                disabled={true}
                                type='button'
                            >
                                <FaRegUser className='inline-block w-5 h-max lg:mr-1.5'/>
                                <span className='hidden lg:inline blur-[2px]'>
                                    example@email.com
                                </span>
                            </button>
                        )}
                        {!mainUserState.fetching && (
                          <>
                            {userInfo?.email && (
                                <button
                                    className='py-1 px-1.5 border-2 border-hospital-green rounded-full lg:rounded-md text-very-light-pink'
                                    onMouseUp={() => setAccountModal(true)}
                                    disabled={accountModal}
                                    type='button'
                                >
                                    <FaRegUser className='inline-block w-5 h-max lg:mr-1.5'/>
                                    <span className='hidden lg:inline'>
                                        {userInfo.email}
                                    </span>
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
                                <AccountMenu customRef={accountMenuRef} setStateModal={setAccountModal}/>
                            )}
                          </>
                        )}
                    </li>
                    <li>
                        <button
                            className='relative grid p-[5px] pb-[3px] border-2 border-hospital-green rounded-full'
                            onClick={showCart}
                            type="button"
                        >
                            <IconShoppingCart />
                            {(itemsList?.length > 0 || mainShopCartState.fetching) && (
                                <span className='absolute top-[-4px] text-xs font-bold w-4 h-4 bg-hospital-green rounded-lg'>
                                    <span className='text-center'>
                                        {mainShopCartState.fetching && <AiOutlineLoading3Quarters className='inline-block w-2.5 h-max -mt-[1px] fill-black animate-spin'/>}
                                        {!mainShopCartState.fetching && itemsList?.length}
                                    </span>
                                </span>
                            )}
                        </button>
                    </li>
                </ul>
            </div>

            {adviceModal && (
                <AdviceSessionModal closeModal={() => setAdviceModal(false)} />
            )}

            <ShoppingCartModal
                shopModalState={shopModal}
                closeModal={() => setShopModal(false)}
                shoppingCartState={mainShopCartState}
            />

            {window.innerWidth < 768 && (
                <NavbarMobile
                    userState={mainUserState}
                    stateModal={secondNavbar}
                    closeModal={() => setSecondNavbar(false)}
                />
            )}
        </nav>
    )
}

export default MainNavbar;