import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import productCategories from "../utils/productCategories";
import SignoutModal from "./SignoutModal";
import { resetCurrentModal } from "../context/sliceModalsState";

// eslint-disable-next-line react/prop-types
const NavbarMobile = ({ userState = {}, stateModal }) => {
    const dispatcher = useDispatch();
    const [signoutModal, setSignoutModal] = useState(false);

    function toggleModal() {
        setSignoutModal(prev => !prev);
    }

    function changeCategory(search) {
        if (location.href.split('/').at(-1) === search) {
            dispatcher(resetCurrentModal());
            return;
        }
        location.href = `${location.origin}/${search}`;
    }

    return (
        <nav className={`fixed top-14 left-0 flex flex-col justify-between h-[calc(100vh-56px)] w-screen max-w-sm py-9 px-6 bg-white overflow-auto transition-all duration-500 ${(stateModal !== 'NAVBAR_MOBILE') && '-translate-x-full'}`}>
            <article className="font-bold">
                <h1 className="mb-5">CATEGORIES</h1>
                <ul className="grid gap-5">
                    <li>
                        <button onClick={() => changeCategory('')} type="button">
                            All
                        </button>
                    </li>
                    {Object.keys(productCategories).map((category, i) => (
                        <li key={i}>
                            <button
                                className="capitalize"
                                onClick={() => changeCategory(`?category=${category}`)}
                                type="button"
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>

                {userState.userInfo && (
                  <>
                    <div className="w-full h-[1px] my-8 bg-very-light-pink" />
                    <ul>
                        <li className="mb-5">
                            <Link to={'/my-orders'}>
                                My orders
                            </Link>
                        </li>
                        <li>
                            <Link to={'/my-account'}>
                                My account
                            </Link>
                        </li>
                    </ul>
                  </>
                )}
            </article>

            <article className="mt-7">
                {userState.userInfo && (
                  <>
                    <p className={`mb-5 text-sm text-very-light-pink ${userState.userInfo?.fetching && 'blur-[2px]'}`}>
                        {userState.userInfo ? userState.userInfo.email : 'example@email.com'}
                    </p>
                    <button
                        className="font-bold text-sm text-hospital-green"
                        onClick={toggleModal}
                        type="button"
                    >
                        Sign out
                    </button>
                  </>
                )}
                {!userState.userInfo && (
                  <>
                    <Link className='inline-block h-9 py-1.5 px-3 mr-4 rounded-md text-white bg-hospital-green' to={'/login'}>
                        Log In
                    </Link>
                    <Link className='inline-block h-9 py-1.5 px-3 rounded-md text-white bg-hospital-green' to={'/signup'}>
                        Sign Up
                    </Link>
                  </>
                )}
            </article>

            {signoutModal && <SignoutModal toggleModal={toggleModal}/>}
        </nav>
    )
}

export default NavbarMobile;