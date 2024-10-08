import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AvailableCategories, changeCategory } from "../utils/productCategories";
import SignoutModal from "./SignoutModal";
import { ModalOptions } from "../context/sliceModalsState";
import { UserState } from "../context/sliceUserState";

type Props = {
    userState: UserState;
    stateModal: (typeof ModalOptions)[keyof typeof ModalOptions];
};

const NavbarMobile = ({ userState, stateModal }: Props): JSX.Element => {
    const dispatcher = useDispatch();
    const [signoutModal, setSignoutModal] = useState(false);

    function toggleModal() {
        setSignoutModal((prev) => !prev);
    }

    return (
        <nav
            className={`fixed top-14 left-0 flex flex-col justify-start h-[calc(100vh-56px)] w-screen max-w-sm py-9 px-6 bg-white overflow-auto transition-all duration-500 ${stateModal !== ModalOptions.NAVBAR_MOBILE && "-translate-x-full"}`}
        >
            <article className="font-bold">
                <h1 className="mb-5">CATEGORIES</h1>
                <ul className="grid gap-5">
                    {Object.entries(AvailableCategories).map(([key, value], i) => (
                        <li key={i}>
                            <button
                                className="capitalize"
                                onClick={() => changeCategory(value, dispatcher)}
                                type="button"
                            >
                                {key.toLowerCase()}
                            </button>
                        </li>
                    ))}
                </ul>

                {userState.userInfo && (
                    <>
                        <div className="w-full h-[1px] my-8 bg-very-light-pink" />
                        <ul>
                            <li className="mb-5">
                                <Link to={"/my-orders"}>My orders</Link>
                            </li>
                            <li>
                                <Link to={"/my-account"}>My account</Link>
                            </li>
                        </ul>
                    </>
                )}
            </article>

            <article className="mt-9">
                {userState.userInfo.firstName && (
                    <>
                        <p
                            className={`mb-5 text-sm text-very-light-pink ${userState.fetching && "blur-[2px]"}`}
                        >
                            {userState.userInfo
                                ? userState.userInfo.email
                                : "example@email.com"}
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
                {!userState.userInfo.firstName && (
                    <>
                        <Link
                            className="inline-block h-9 py-1.5 px-3 mr-4 rounded-md text-white bg-hospital-green"
                            to={"/login"}
                        >
                            Log In
                        </Link>
                        <Link
                            className="inline-block h-9 py-1.5 px-3 rounded-md text-white bg-hospital-green"
                            to={"/signup"}
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </article>

            {signoutModal && <SignoutModal toggleModal={toggleModal} />}
        </nav>
    );
};

export default NavbarMobile;
