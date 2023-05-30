import { useState } from "react";
import { Link } from "react-router-dom";
import SignoutModal from "./SignoutModal";

// eslint-disable-next-line react/prop-types
const NavbarMobile = ({ userState = {}, stateModal }) => {
    const [signoutModal, setSignoutModal] = useState(false);

    function toggleModal() {
        setSignoutModal(prev => !prev);
    }

    return (
        <nav className={`fixed top-14 left-0 flex flex-col justify-between h-[calc(100vh-56px)] w-screen max-w-sm py-9 px-6 bg-white transition-all duration-500 ${(stateModal !== 'NAVBAR_MOBILE') && '-translate-x-full'}`}>
            <article className="font-bold">
                <h1 className="mb-5">CATEGORIES</h1>
                <ul className="grid gap-5">
                    <li>All</li>
                    <li>Clothes</li>
                    <li>Electronics</li>
                    <li>Furnitures</li>
                    <li>Toys</li>
                    <li>Others</li>
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

            <article>
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