import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalsState, navbarMobileModal, resetCurrentModal, shoppingCartModal } from '../context/sliceModalsState';
import { userState } from '../context/sliceUserState';
import { shoppingCartState } from '../context/sliceShoppingCartState';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import AccountMenu from './AccountMenu';
import NavbarMobile from './NavbarMobile';
import ShoppingCartModal from './ShoppingCartModal';
import AdviceSessionModal from './AdviceSessionModal';
import LogoYardSale from '../assets/logos/logoYardSale';
import IconMenu from '../assets/icons/IconMenu';
import IconShoppingCart from '../assets/icons/IconShoppingCart';
import { IoMdArrowBack } from 'react-icons/io';

const MainNavbar = () => {
    const navigate = useNavigate();
    const mainUserState = useSelector(userState);
    const mainShopCartState = useSelector(shoppingCartState);
    const { currentModal } = useSelector(modalsState);
    const { userInfo } = mainUserState;
    const { itemsList } = mainShopCartState;
    const dispatcher = useDispatch();

    const [adviceModal, setAdviceModal] = useState(false);
    const [accountModal, setAccountModal] = useState(false);

    function toggleNavbarMobile() {
        if (currentModal === 'NAVBAR_MOBILE') {
            dispatcher(resetCurrentModal());
        } else {
            dispatcher(navbarMobileModal());
        }
    }

    function toggleCart() {
        if (!userInfo) {
            setAdviceModal(true);
            return;
        }
        if (currentModal === 'SHOPPING_CART') {
            dispatcher(resetCurrentModal());
        } else {
            dispatcher(shoppingCartModal());
        }
    }

    const pathname = window.location.pathname;
    useEffect(() => {
        dispatcher(resetCurrentModal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

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
        <nav className='fixed z-30 flex justify-between items-center h-14 w-full py-2 px-4 lg:px-6 border-b-very-light-pink border-b bg-white'>
            <span className='flex gap-3 md:hidden'>
                <button onClick={() => navigate(-1)} type='button'>
                    <IoMdArrowBack className="w-7 h-max"/>
                </button>
                <button onClick={toggleNavbarMobile} type='button'>
                    <IconMenu />
                </button>
            </span>
            <div className='flex items-center'>
                <Link className='h-min max-md:mr-5' to={'/'}>
                    <LogoYardSale className='w-[100px]'/>
                </Link>

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
            <div>
                <ul className='flex items-center gap-3 lg:gap-5'>
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
                                <Link className='inline-block h-9 py-1.5 px-3 mr-2.5 lg:mr-4 rounded-md bg-hospital-green' to={'/login'}>
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
                            onClick={toggleCart}
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
                modalState={currentModal}
                closeModal={() => dispatcher(resetCurrentModal())}
                shoppingCartState={mainShopCartState}
            />

            {window.innerWidth < 768 && (
                <NavbarMobile
                    userState={mainUserState}
                    stateModal={currentModal}
                    closeModal={() => dispatcher(resetCurrentModal())}
                />
            )}
        </nav>
    )
}

export default MainNavbar;