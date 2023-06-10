import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { GoAlert } from "react-icons/go";
import LogoYardSale from "../assets/logos/LogoYardSale";
import FormError from "../components/FormError";
import userAPI from "../utils/requests/UserAPI";
import shoppingCartAPI from "../utils/requests/ShoppingCartAPI";

const SuccessRecover = () => {
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    const [passwordError, setPasswordError] = useState(false);
    const formRef = useRef(null);

    function sendPassword(event) {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        const pass1 = formData.get('password_#1');
        const pass2 = formData.get('password_#2');

        if ((pass1 === "" || pass2 === "") || (pass1 !== pass2)){
            setPasswordError(true);
            return;
        }
        else {
            setPasswordError(false);
        }

        const config = {
            body: {
                token,
                newPassword: pass2,
            },
            onSuccess: () => {
                userAPI.USER_INFO({}, dispatcher);
                shoppingCartAPI.CART_ITEMS({}, dispatcher);
                navigate('/');
            },
            onError: (err) => toast.error('Something went wrong! 😳', { description: err }),
        };
        userAPI.CHANGE_PASSWORD(config, dispatcher);
    }

    return (
        <main className='w-full h-screen grid place-items-center'>
            {token && (

                <section className="grid w-[300px]">
                    <LogoYardSale className="w-40 h-min my-6 mx-auto"/>

                    <h1 className="text-lg my-3 font-bold text-center h-6">
                        Create a new password
                    </h1>
                    <p className="text-very-light-pink text-base mb-8 font-light h-5 text-center">
                        Enter a new password for your account
                    </p>

                    <form method="POST" className="flex flex-col" ref={formRef} onSubmit={sendPassword}>
                        <label htmlFor="password_#1" className="font-bold text-sm mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password_#1"
                            name="password_#1"
                            placeholder="*********"
                            className="bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base"
                        />

                        <label htmlFor="password_#2" className="font-bold text-sm mb-1">
                            Repeat password
                        </label>
                        <input
                            type="password"
                            id="password_#2"
                            name="password_#2"
                            placeholder="*********"
                            className="bg-input-field h-[42px] p-2 mb-3 rounded-lg"
                        />

                        {passwordError && <FormError text="Please fill every field with the same characters" />}

                        <input type="submit" value="Confirm" className="primary-button"/>
                    </form>
                </section>
            )}

            {!token && (
                <section className="text-center font-bold">
                    <span className="block w-max p-4 mx-auto mb-4 rounded-full bg-black">
                        <GoAlert className="w-16 h-max -mt-1 mb-1 fill-yellow-500"/>
                    </span>

                    <p>{"There's no any provided token."}</p>
                    <p>You will be redirected to main page.</p>

                    <Link className="primary-button" to={'/'}>
                        Go to Home Page
                    </Link>
                </section>
            )}
        </main>
    )
}

export default SuccessRecover;