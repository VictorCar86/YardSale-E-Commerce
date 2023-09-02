import { useRef, useState, FormEvent } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiLoader4Fill } from "react-icons/ri";
import userAPI from "../utils/requests/UserAPI";
import FormError from "../components/FormError";
import MainNavbar from "../containers/MainNavbar";
import LogoYardSale from "../assets/logos/LogoYardSale";
import { FetchConfig } from "../utils/requests/MakeRequest";

const Signup = (): JSX.Element => {
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

    const formRef = useRef<HTMLFormElement>(null);

    function sendUserInfo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(formRef.current ?? undefined);
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

        const fetchConfig: FetchConfig = {
            body: { user: taskPayload },
            onSuccess: () => {
                navigator('/');
                toast.success('Account created successfully!');
            },
            onError: (err) => {
                toast.error('Something went wrong 😳', { description: err });
            },
            onFinally: () => setLoader(false),
        };

        userAPI.SIGNUP(fetchConfig, dispatcher);
    }

    function chechPassword(){
        const formData = new FormData(formRef.current ?? undefined);

        if (formData.get('password_1') !== formData.get('password_2')) {
            setFormError(prev => ({ ...prev, password_2: true }));
        } else {
            setFormError(prev => ({ ...prev, password_2: false }));
        }
    }

    return (
        <>
            <header>
                <MainNavbar />
            </header>
            <main className="grid place-content-center min-h-screen pt-14">
                <section className="w-[300px] h-max">
                    <LogoYardSale className="hidden sm:block w-40 h-min my-6 mx-auto"/>
                    <h1 className="block sm:hidden mb-5 text-2xl font-bold">
                        Sign up
                    </h1>

                    <form className="grid" action="POST" ref={formRef} onSubmit={sendUserInfo}>
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
                            type="submit"
                        >
                            {loader ? <RiLoader4Fill className="h-9 w-9 animate-spin" /> : "Create"}
                        </button>
                    </form>
                </section>
            </main>
        </>
    )
}

export default Signup;