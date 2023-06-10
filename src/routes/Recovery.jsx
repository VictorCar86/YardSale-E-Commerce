import { useState } from 'react';
import { RiLoader4Fill } from 'react-icons/ri';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoYardSale from "../assets/logos/LogoYardSale";
import IconEmail from '../assets/icons/IconEmail';
import MainNavbar from '../containers/MainNavbar';
import FormError from '../components/FormError';
import userAPI from '../utils/requests/UserAPI';

const Recovery = () => {
    const dispatcher = useDispatch();

    const [inputEmail, setInputEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [loader, setLoader] = useState(false);

    async function sendEmail() {
        const taskPayload = {
            email: inputEmail,
        };

        const emailExist = inputEmail !== '';

        setEmailError(!emailExist);

        if (!emailExist) {
            return;
        }

        setLoader(true);

        const fetchConfig = {
            body: taskPayload,
            onSuccess: (message) => {
                setEmailSent(true);
                toast.success(message + ' 📩');
            },
            onError: (err) => {
                toast.error('Something went wrong 😳', { description: err });
            },
            onFinally: () => setLoader(false),
        };

        userAPI.RECOVER_BY_EMAIL(fetchConfig, dispatcher);
    }

    return (
        <>
            <header>
                <MainNavbar />
            </header>
            <main className='grid place-content-center min-h-screen h-full w-full'>
                {!emailSent && (
                    <section className="grid w-[300px]">
                        <LogoYardSale className="hidden sm:block w-40 h-min my-6 mx-auto"/>

                        <h1 className="my-3 text-2xl font-bold text-center">
                            Change your password
                        </h1>
                        <p className="mb-8 text-very-light-pink text-base font-light text-center">
                            Introduce your email to reset your password
                        </p>

                        <form action="POST" className="flex flex-col">
                            <label htmlFor="email" className="mb-1.5 text-sm font-bold">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="mail@yourmail.com"
                                className={`bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base ${emailError && "ring-2 ring-red-600"}`}
                                onChange={event => setInputEmail(event.target.value)}
                            />
                        </form>

                        {emailError && (
                            <FormError text="Please introduce an email"/>
                        )}

                        <button
                            className="primary-button"
                            disabled={loader}
                            onClick={sendEmail}
                            type="submit"
                        >
                            {loader ? <RiLoader4Fill className="h-9 w-9 animate-spin" /> : "Send"}
                        </button>
                    </section>
                )}

                {emailSent && (
                    <section className="grid w-[300px]">
                        <h1 className="my-3 text-2xl font-bold text-center">
                            Email has been sent!
                        </h1>
                        <p className="mb-8 text-very-light-pink text-base font-light text-center">
                            Please check your inbox for instructions on how to reset the password
                        </p>

                        <picture className="w-min py-9 px-6 mx-auto mb-5 rounded-full bg-gray-100">
                            <IconEmail className='w-20'/>
                        </picture>

                        <Link className="primary-button" to={"/login"}>
                            Login
                        </Link>

                        <span className="mt-3 text-sm text-center">
                            <span className='mr-1 text-very-light-pink'>
                                {"Didn't receive the email?"}
                            </span>
                            <button
                                className='relative text-hospital-green'
                                disabled={loader}
                                onClick={sendEmail}
                                type='submit'
                            >
                                <span>Resend</span>
                                {loader && <RiLoader4Fill className="absolute -right-[22px] inline-block w-5 h-max animate-spin"/>}
                            </button>
                        </span>
                    </section>
                )}
            </main>
        </>
    )
}

export default Recovery;