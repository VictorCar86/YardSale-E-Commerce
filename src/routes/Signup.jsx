import { useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiLoader4Fill } from "react-icons/ri";
import userAPI from "../utils/requests/UserAPI";
import FormError from "../components/FormError";
import LogoYardSale from "../assets/logos/logoYardSale";
import GenericNavbar from "../containers/GenericNavbar";

const Signup = () => {
    const navigator = useNavigate();
    const dispatcher = useDispatch();

    const initialFormErrors = {
        firstName: false,
        lastName: false,
        email: false,
        password_1: false,
        password_2: false,
    };

    const [loader, setLoader] = useState(false);
    const [formError, setFormError] = useState(initialFormErrors);

    const formRef = useRef(null);

    async function sendUserInfo(event) {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        const taskPayload = {
            firstName: formData.get('first_name'),
            lastName: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password_1'),
        };

        const { firstName, lastName, email, password } = taskPayload;

        const emptyFirstName = firstName === '';
        const emptyLastName = lastName === '';
        const emptyEmail = email === '';
        const emptyPassword = password === '';
        const comparePasswords = password !== formData.get('password_2');

        setFormError({
            firstName: emptyFirstName,
            lastName: emptyLastName,
            email: emptyEmail,
            password_1: emptyPassword,
            password_2: comparePasswords,
        });

        if (emptyFirstName || emptyLastName || emptyEmail || emptyPassword || comparePasswords) {
            return;
        }

        setLoader(true);

        const fetchConfig = {
            body: { user: taskPayload },
            onSuccess: () => navigator('/'),
            onError: (err) => {
                toast.error('Something went wrong 😳', { description: err });
            },
            onFinally: () => setLoader(false),
        };

        userAPI.SIGNUP(fetchConfig, dispatcher);
    }

    function chechPassword(){
        const formData = new FormData(formRef.current);

        if (formData.get('password_1') !== formData.get('password_2')) {
            setFormError(prev => ({ ...prev, password_2: true }));
        } else {
            setFormError(prev => ({ ...prev, password_2: false }));
        }
    }

    return (
        <main className="grid place-content-center min-h-screen">
            <GenericNavbar />

            <div className="w-full h-full min-h-[87vh]">
                <section className="w-[300px] h-max md:mt-[30%]">
                    <LogoYardSale className="w-40 h-min my-6 mx-auto"/>

                    <form className="grid" action="POST" ref={formRef}>
                        <label htmlFor="first_name" className="mb-1.5 text-sm font-bold">
                            First name
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="Your first name"
                            className="bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base"
                        />

                        <label htmlFor="last_name" className="mb-1.5 text-sm font-bold">
                            Last name
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="Your last name"
                            className="bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base"
                        />

                        <label htmlFor="email" className="mb-1.5 text-sm font-bold">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@yourmail.com"
                            className="bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base"
                        />

                        <label htmlFor="password_1" className="mb-1.5 text-sm font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password_1"
                            name="password_1"
                            placeholder="********"
                            className="bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base"
                        />

                        <label htmlFor="password_2" className="mb-1.5 text-sm font-bold">
                            Repeat password
                        </label>
                        <input
                            type="password"
                            id="password_2"
                            name="password_2"
                            placeholder="********"
                            onChange={chechPassword}
                            className={`bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base ${formError.password_2 && "ring-2 ring-red-600"}`}
                        />

                        {formError.firstName && (
                            <FormError text="Please fill the first name's field"/>
                        )}
                        {formError.lastName && (
                            <FormError text="Please fill the last name's field"/>
                        )}
                        {formError.email && (
                            <FormError text="Please fill the email's field"/>
                        )}
                        {formError.password_1 && (
                            <FormError text="Please fill the password's field"/>
                        )}

                        <button
                            className="flex justify-center items-center primary-button"
                            onClick={sendUserInfo}
                            type="submit"
                        >
                            {loader ? <RiLoader4Fill className="h-9 w-9 animate-spin" /> : "Create"}
                        </button>
                    </form>
                </section>
            </div>

            <Toaster richColors position="bottom-center"/>
        </main>
    )
}

export default Signup;