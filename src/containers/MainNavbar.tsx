import {
    ModalOptions,
    modalsState,
    navbarMobileModal,
    resetCurrentModal,
    shoppingCartModal,
} from "../context/sliceModalsState";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { shoppingCartState } from "../context/sliceShoppingCartState";
import { userState } from "../context/sliceUserState";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import IconShoppingCart from "../assets/icons/IconShoppingCart";
import LogoYardSale from "../assets/logos/LogoYardSale";
import IconMenu from "../assets/icons/IconMenu";
import AccountMenu from "./AccountMenu";
import NavbarMobile from "./NavbarMobile";
import ShoppingCartModal from "./ShoppingCartModal";
import AdviceSessionModal from "./AdviceSessionModal";
import ProductPreviewModal from "./ProductPreviewModal";
import { AvailableCategories, changeCategory } from "../utils/productCategories";
import clsx from "clsx";

const MainNavbar = (): JSX.Element => {
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
        if (!userInfo.email) {
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

    const accountMenuRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // sourcery skip: avoid-function-declarations-in-blocks
        function handleClickOutside(event: MouseEvent) {
            const menu = accountMenuRef.current;
            if (menu && !menu.contains(event.target as Node)) {
                setAccountModal((prev) => !prev);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [accountMenuRef]);

    function returnOrClose() {
        if (currentModal) dispatcher(resetCurrentModal());
        else navigate(-1);
    }

    const searchParams = useMemo(() => {
        return function (search: string) {
            const url = new URLSearchParams(location.search);
            let result = url.get(search);
            if (!result) result = "";
            return result;
        };
    }, [location.search]);

    return (
        <nav className="fixed z-30 flex justify-between items-center h-14 w-full py-2 px-4 lg:px-6 border-b-very-light-pink border-b bg-white">
            <span className="flex gap-3 md:hidden">
                <button
                    className={`${location.pathname === "/" && "hidden"}`}
                    onClick={returnOrClose}
                    type="button"
                >
                    <IoMdArrowBack className="w-7 h-max" />
                </button>
                <button onClick={toggleNavbarMobile} type="button">
                    <IconMenu />
                </button>
            </span>
            <div className="flex items-center">
                <button
                    className="max-md:mr-5"
                    onClick={() => changeCategory("", dispatcher)}
                    type="button"
                >
                    <LogoYardSale className="w-[100px]" />
                </button>

                <ul className="md:flex gap-0.5 hidden items-center ml-3">
                    {Object.entries(AvailableCategories).map(([key, value], i) => (
                        <li key={i}>
                            <button
                                className={clsx(
                                    "inline-block px-1.5 py-1 rounded-md border capitalize hover:text-hospital-green hover:border-hospital-green",
                                    {
                                        "text-hospital-green border-hospital-green":
                                            searchParams("category") === value,
                                        "text-very-light-pink border-transparent":
                                            searchParams("category") !== value,
                                    },
                                )}
                                onClick={() => changeCategory(value, dispatcher)}
                                type="button"
                            >
                                {key.toLowerCase()}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul className="flex items-center gap-3 lg:gap-5">
                    <li className="relative md:block hidden text-white">
                        {mainUserState.fetching && (
                            <button
                                className="py-1 px-1.5 border-2 border-hospital-green rounded-full lg:rounded-md text-very-light-pink animate-pulse"
                                disabled={true}
                                type="button"
                            >
                                <FaRegUser className="inline-block w-5 h-max lg:mr-1.5" />
                                <span className="hidden lg:inline blur-[2px]">
                                    example@email.com
                                </span>
                            </button>
                        )}
                        {!mainUserState.fetching && (
                            <>
                                {userInfo?.email && (
                                    <button
                                        className="py-1 px-1.5 border-2 border-hospital-green rounded-full lg:rounded-md text-very-light-pink"
                                        onMouseUp={() => setAccountModal(true)}
                                        disabled={accountModal}
                                        type="button"
                                    >
                                        <FaRegUser className="inline-block w-5 h-max lg:mr-1.5" />
                                        <span className="hidden lg:inline">
                                            {userInfo.email}
                                        </span>
                                    </button>
                                )}
                                {!userInfo?.email && (
                                    <button
                                        className="p-[5px] border-2 border-hospital-green rounded-full text-very-light-pink"
                                        onMouseUp={() => setAdviceModal(true)}
                                        disabled={accountModal}
                                        type="button"
                                    >
                                        <FaRegUser className="inline-block w-5 h-max mx-0.5" />
                                    </button>
                                )}
                                {accountModal && (
                                    <AccountMenu
                                        customRef={accountMenuRef}
                                        setStateModal={setAccountModal}
                                    />
                                )}
                            </>
                        )}
                    </li>
                    <li>
                        <button
                            className="relative grid p-[5px] pb-[3px] border-2 border-hospital-green rounded-full"
                            onClick={toggleCart}
                            type="button"
                        >
                            <IconShoppingCart />
                            {(itemsList?.length > 0 || mainShopCartState.fetching) && (
                                <span className="absolute top-[-4px] text-xs font-bold w-4 h-4 bg-hospital-green rounded-lg">
                                    <span className="text-center">
                                        {mainShopCartState.fetching && (
                                            <AiOutlineLoading3Quarters className="inline-block w-2.5 h-max -mt-[1px] fill-black animate-spin" />
                                        )}
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
                stateModal={currentModal}
                closeModal={() => dispatcher(resetCurrentModal())}
                shoppingCartState={mainShopCartState}
            />

            <ProductPreviewModal
                className="fixed top-14 right-0"
                stateModal={currentModal}
                closeModal={() => dispatcher(resetCurrentModal())}
            />

            {window.innerWidth < 768 && (
                <NavbarMobile userState={mainUserState} stateModal={currentModal} />
            )}
        </nav>
    );
};

export default MainNavbar;
