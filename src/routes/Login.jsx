import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { RiLoader4Fill } from "react-icons/ri";
import { fetchLogin, loginState } from "../context/sliceLogin";
import LogoYardSale from "../assets/logos/logoYardSale";
import FormError from "../components/FormError";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const state = useSelector(loginState);
    const dispatcher = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        if (state.token){
            navigator('/');
        }
    }, [navigator, state.token]);

    const [loader, setLoader] = useState(false);
    const [formMistakes, setFormMistakes] = useState({ email: false, password: false });

    const formRef = useRef(null);

    async function sendUserInfo(event) {
        event.preventDefault();

        const formData = new FormData(formRef.current);

        const taskPayload = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        const emailExist = taskPayload.email !== '';
        const passwordExist = taskPayload.password !== '';

        setFormMistakes({ email: !emailExist, password: !passwordExist });

        if (!emailExist || !passwordExist) {
            return;
        }

        setLoader(true);

        const fetchConfig = {
            body: taskPayload,
            onSuccess: () => navigator('/'),
            onError: (err) => {
                toast.error('Something went wrong 😳', { description: err });
            },
            finally: () => setLoader(false),
        };

        fetchLogin.POST(fetchConfig, dispatcher);
    }

    return (
        <main className="grid place-content-center h-screen">
            <section className="grid w-[300px]">
                <LogoYardSale className="w-40 h-min my-6 mx-auto"/>

                <form className="grid" action="POST" ref={formRef}>
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

                    <label htmlFor="password" className="mb-1.5 text-sm font-bold">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="********"
                        className="bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base"
                    />

                    <button type="submit" className="primary-button" onClick={sendUserInfo}>
                        {loader ? <RiLoader4Fill className="h-9 w-9 animate-spin" /> : "Log in"}
                    </button>
                </form>

                {formMistakes.email && (
                    <FormError text="Please introduce a valid email"/>
                )}
                {formMistakes.password && (
                    <FormError text="Please introduce a valid password"/>
                )}

                <a href="#" className="mb-12 text-sm text-hospital-green text-center">
                    Forgot my password
                </a>

                <Link className="secondary-button" to={'/signup'}>
                    Sign up
                </Link>
            </section>

            <Toaster richColors position="bottom-center"/>
        </main>
    )
}

export default Login;