import {
    ModalOptions,
    modalsState,
    navbarMobileModal,
    resetCurrentModal,
    shoppingCartModal,
} from '../context/sliceModalsState';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingCartState } from '../context/sliceShoppingCartState';
import { userState } from '../context/sliceUserState';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';
import { FaRegUser } from 'react-icons/fa';
import IconShoppingCart from '../assets/icons/IconShoppingCart';
import LogoYardSale from "../assets/logos/LogoYardSale";
import IconMenu from '../assets/icons/IconMenu';
import ShoppingCartModal from './ShoppingCartModal';
import AdviceSessionModal from './AdviceSessionModal';
import ProductPreviewModal from './ProductPreviewModal';
import productCategories from '../utils/productCategories'
import AccountMenu from './AccountMenu';
import NavbarMobile from './NavbarMobile';

const MainNavbar = () => {
    const mainUserState = useSelector(userState);
    const mainShopCartState = useSelector(shoppingCartState);
    const { currentModal } = useSelector(modalsState);
    const { userInfo } = mainUserState;
    const { itemsList } = mainShopCartState;
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    const [adviceModal, setAdviceModal] = useState(false);
    const [accountModal, setAccountModal] = useState(false);

    function toggleNavbarMobile() {
        if (currentModal === ModalOptions.NAVBAR_MOBILE) {
            dispatcher(resetCurrentModal());
            if (window.innerWidth < 768) window.history.back();
        } else {
            if (window.innerWidth < 768) window.location.hash = "navbar";
            setTimeout(() => dispatcher(navbarMobileModal()), 0);
        }
    }

    function toggleCart() {
        if (!userInfo) {
            setAdviceModal(true);
            return;
        }
        if (currentModal === ModalOptions.SHOPPING_CART) {
            dispatcher(resetCurrentModal());
            if (window.innerWidth < 768) window.history.back();
        } else {
            if (window.innerWidth < 768) window.location.hash = "shopping-cart";
            setTimeout(() => dispatcher(shoppingCartModal()), 0);
        }
    }

    function changeCategory(search: string) {
        if (location.href.split('/').at(-1) === search) return;
        location.href = `${location.origin}/${search}`;
    }

    useEffect(() => {
        dispatcher(resetCurrentModal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.href]);

    const accountMenuRef = useRef<HTMLElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const menu = accountMenuRef.current;
            if (menu && !menu.contains(event.target as Node)) {
                setAccountModal(prev => !prev);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [accountMenuRef]);

    function returnOrClose() {
        if (currentModal) dispatcher(resetCurrentModal());
        else navigate(-1);
    }

    const categoryBtnStyles = 'inline-block px-1.5 py-1 rounded-md border hover:text-hospital-green hover:border-hospital-green';

    return (
        <nav className='fixed z-30 flex justify-between items-center h-14 w-full py-2 px-4 lg:px-6 border-b-very-light-pink border-b bg-white'>
            <span className='flex gap-3 md:hidden'>
                <button className={`${location.pathname === '/' && 'hidden'}`} onClick={returnOrClose} type='button'>
                    <IoMdArrowBack className="w-7 h-max"/>
                </button>
                <button onClick={toggleNavbarMobile} type='button'>
                    <IconMenu />
                </button>
            </span>
            <div className='flex items-center'>
                <button
                    className='max-md:mr-5'
                    onClick={() => changeCategory('')}
                    type='button'
                >
                    <LogoYardSale className='w-[100px]'/>
                </button>

                <ul className='md:flex gap-0.5 hidden items-center ml-3'>
                    <li className={`${categoryBtnStyles} ${!location.search.includes('category') ? 'text-hospital-green border-hospital-green' : 'text-very-light-pink border-transparent'}`}>
                        <button
                            onClick={() => changeCategory('')}
                            type='button'
                        >
                            All
                        </button>
                    </li>
                    {Object.keys(productCategories).map((category, i) => (
                        <li
                            className={`${categoryBtnStyles} ${location.search.includes(category) ? 'text-hospital-green border-hospital-green' : 'text-very-light-pink border-transparent'}`}
                            key={i}
                        >
                            <button
                                className='capitalize'
                                onClick={() => changeCategory(`?category=${category}`)}
                                type='button'
                            >
                                {category}
                            </button>
                        </li>
                    ))}
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

            <ProductPreviewModal
                className='fixed top-14 right-0'
                stateModal={currentModal}
                closeModal={() => dispatcher(resetCurrentModal())}
            />

            {window.innerWidth < 768 && (
                <NavbarMobile
                    userState={mainUserState}
                    stateModal={currentModal}
                />
            )}
        </nav>
    )
}

export default MainNavbar;