import { Link } from "react-router-dom";

const NavbarMobile = ({ userState = {} }) => {
    return (
        <nav className="fixed top-14 left-0 flex flex-col justify-between h-[calc(100vh-56px)] w-screen max-w-sm py-9 px-6">
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

                <div className="w-full h-[1px] my-8 bg-very-light-pink" />

                <ul>
                    <li className="mb-5">
                        My orders
                    </li>
                    <li>
                        <Link to={'/my-account'}>
                            My account
                        </Link>
                    </li>
                </ul>
            </article>

            <article>
                <p className={`mb-5 text-sm text-very-light-pink ${userState.userInfo?.fetching && 'blur-[2px]'}`}>
                    {userState.userInfo ? userState.userInfo.email : 'example@email.com'}
                </p>
                <button className="font-bold text-sm text-hospital-green" type="button">
                    Sign out
                </button>
            </article>
        </nav>
    )
}

export default NavbarMobile;