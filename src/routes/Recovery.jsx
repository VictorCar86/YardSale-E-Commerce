import { useRef, useState } from 'react';
import { RiLoader4Fill } from 'react-icons/ri';
import { Toaster, toast } from 'sonner';
import { fetchUser } from '../context/sliceLogin';
import LogoYardSale from '../assets/logos/logoYardSale';
import FormError from '../components/FormError';
import IconEmail from '../assets/icons/IconEmail';
import { Link } from 'react-router-dom';

const Recovery = () => {
    const [emailError, setEmailError] = useState(false);
    const [loader, setLoader] = useState(false);

    const formRef = useRef(null);

    async function sendEmail() {
        const formData = new FormData(formRef.current);

        const taskPayload = {
            email: formData.get('email'),
        };

        const emailExist = taskPayload.email !== '';

        setEmailError(!emailExist);

        if (!emailExist) {
            return;
        }

        setLoader(true);

        const fetchConfig = {
            body: taskPayload,
            // onSuccess: () => navigator('/'),
            onError: (err) => {
                toast.error('Something went wrong 😳', { description: err });
            },
            finally: () => setLoader(false),
        };

        fetchUser.RECOVER_BY_EMAIL(fetchConfig);
    }

    return (
        <main>
            <section className='w-full h-screen grid place-items-center'>
                <div className="grid w-[300px]">
                    <LogoYardSale className="w-40 h-min my-6 mx-auto"/>

                    <h1 className="h-6 my-3 text-lg font-bold text-center">
                        Change your password
                    </h1>
                    <p className="mb-8 text-very-light-pink text-base font-light text-center">
                        Introduce your email to reset your password
                    </p>

                    <form action="POST" className="flex flex-col" ref={formRef}>
                        <label htmlFor="email" className="mb-1.5 text-sm font-bold">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="mail@yourmail.com"
                            className={`bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base ${emailError && "ring-2 ring-red-600"}`}
                        />
                    </form>

                    {emailError && (
                        <FormError text="Please introduce an email"/>
                    )}

                    <button type="submit" className="primary-button" onClick={sendEmail}>
                        {loader ? <RiLoader4Fill className="h-9 w-9 animate-spin" /> : "Send"}
                    </button>
                </div>
            </section>

            <section className='w-full h-screen grid place-items-center'>
                <div className="grid w-[300px]">
                    <h1 className="h-6 my-3 text-lg font-bold text-center">
                        Email has been sent!
                    </h1>
                    <p className="mb-8 text-very-light-pink text-base font-light text-center">
                        Pleas check your inbox for instructions on how to reset the password
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
                        <button type='submit' className='text-hospital-green'>
                            Resend
                        </button>
                    </span>
                </div>
            </section>

            <Toaster richColors position="bottom-center"/>
        </main>
    )
}

export default Recovery;