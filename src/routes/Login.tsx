import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { RiLoader4Fill } from "react-icons/ri";
import { userState } from "../context/sliceUserState";
import { Link, useNavigate } from "react-router-dom";
import fetchUser from "../utils/requests/UserAPI";
import FormError from "../components/FormError";
import MainNavbar from "../containers/MainNavbar";
import LoadingPage from "../containers/LoadingPage";
import LogoYardSale from "../assets/logos/LogoYardSale";
import { FetchConfig } from "../utils/requests/MakeRequest";

const Login = (): JSX.Element => {
    const { userInfo } = useSelector(userState);
    const dispatcher = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        if (userInfo.email) {
            navigator("/");
        }
    }, [navigator, userInfo]);

    const [formMistakes, setFormMistakes] = useState({ email: false, password: false });
    const [loader, setLoader] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    function sendUserInfo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(formRef?.current ?? undefined);
        const taskPayload = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        const emailExist = taskPayload.email !== "";
        const passwordExist = taskPayload.password !== "";

        setFormMistakes({ email: !emailExist, password: !passwordExist });

        if (!emailExist || !passwordExist) {
            return;
        }

        setLoader(true);

        const fetchConfig: FetchConfig = {
            body: taskPayload,
            onSuccess: () => navigator("/"),
            onError: (err) => {
                toast.error("Something went wrong 😳", { description: err });
            },
            onFinally: () => setLoader(false),
        };

        fetchUser.LOGIN(fetchConfig, dispatcher);
    }

    return (
        <>
            <header>
                <MainNavbar />
            </header>
            <main className="grid place-content-center min-h-screen pt-14">
                <section className="w-[300px] h-max">
                    <LogoYardSale className="hidden sm:block w-40 h-min my-6 mx-auto" />
                    <h1 className="block sm:hidden mb-5 text-2xl font-bold">Log in</h1>

                    <form
                        className="grid"
                        action="POST"
                        ref={formRef}
                        onSubmit={sendUserInfo}
                    >
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

                        <p className="mb-3 text-sm text-center text-very-light-pink">
                            <span className="block font-bold">Test credentials:</span>
                            <span>admin@localhost.com | admin123</span>
                        </p>

                        {formMistakes.email && (
                            <FormError text="Please introduce a valid email" />
                        )}
                        {formMistakes.password && (
                            <FormError text="Please introduce a valid password" />
                        )}

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loader}
                        >
                            {loader ? (
                                <RiLoader4Fill className="h-9 w-9 animate-spin" />
                            ) : (
                                "Log in"
                            )}
                        </button>
                    </form>

                    <Link
                        to={"/recovery"}
                        className="block w-max mx-auto mb-12 text-sm text-hospital-green text-center"
                    >
                        Forgot my password
                    </Link>

                    <Link to={"/signup"} className="secondary-button">
                        Sign up
                    </Link>
                </section>

                {userInfo.email && <LoadingPage />}
            </main>
        </>
    );
};

export default Login;
