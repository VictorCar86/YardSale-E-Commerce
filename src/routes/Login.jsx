import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { RiLoader4Fill } from "react-icons/ri";
import { userState } from "../context/sliceUserState";
import { Link, useNavigate } from "react-router-dom";
import fetchUser from "../utils/fetchUser";
import FormError from "../components/FormError";
import LogoYardSale from "../assets/logos/logoYardSale";

const Login = () => {
    const { userInfo } = useSelector(userState);
    const dispatcher = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        if (userInfo !== null){
            navigator('/');
        }
    }, [navigator, userInfo]);

    const [formMistakes, setFormMistakes] = useState({ email: false, password: false });
    const [loader, setLoader] = useState(false);

    const formRef = useRef(null);

    async function sendUserInfo() {
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
            onSuccess: () => {
                fetchUser.USER_INFO({}, dispatcher);
                navigator('/');
            },
            onError: (err) => {
                toast.error('Something went wrong 😳', { description: err });
            },
            finally: () => setLoader(false),
        };

        fetchUser.LOGIN(fetchConfig, dispatcher);
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
                </form>

                {formMistakes.email && (
                    <FormError text="Please introduce a valid email"/>
                )}
                {formMistakes.password && (
                    <FormError text="Please introduce a valid password"/>
                )}

                <button
                    type="submit"
                    className="primary-button"
                    disabled={loader}
                    onClick={sendUserInfo}
                >
                    {loader ? <RiLoader4Fill className="h-9 w-9 animate-spin" /> : "Log in"}
                </button>

                <Link to={'/recovery'} className="w-max mx-auto mb-12 text-sm text-hospital-green text-center">
                    Forgot my password
                </Link>

                <Link to={'/signup'} className="secondary-button">
                    Sign up
                </Link>
            </section>

            <Toaster richColors position="bottom-center"/>
        </main>
    )
}

export default Login;