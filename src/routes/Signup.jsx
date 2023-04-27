import { useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { RiLoader4Fill } from "react-icons/ri";
import LogoYardSale from "../assets/logos/logoYardSale";
import FormError from "../components/FormError";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigator = useNavigate();

    const [loader, setLoader] = useState(false);
    const [formMistakes, setFormMistakes] = useState({ email: false, password: false });

    const formRef = useRef(null);

    async function sendUserInfo(event) {
        event.preventDefault();

        const formData = new FormData(formRef.current);

        const taskPayload = {
            firstName: formData.get('first_name'),
            lastName: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password_#1'),
        };

        const emailExist = taskPayload.email !== '';
        const passwordExist = taskPayload.password !== '';

        setFormMistakes({ email: !emailExist, password: !passwordExist });

        if (!emailExist || !passwordExist) {
            return;
        }

        setLoader(true);

        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(taskPayload),
        };

        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/customers`, options);
            const jsonResponse = await response.json();

            if (jsonResponse.error) throw jsonResponse.message;

            navigator('/')
        }
        catch (err) {
            toast.error('Something went wrong 😳', { description: err });
        }
        finally {
            setLoader(false)
        }
    }

    return (
        <main className="grid place-content-center h-screen">
            <section className="grid w-[300px]">
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

                    <label htmlFor="password_#1" className="mb-1.5 text-sm font-bold">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password_#1"
                        name="password_#1"
                        placeholder="********"
                        className="bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base"
                    />

                    <label htmlFor="password_#2" className="mb-1.5 text-sm font-bold">
                        Repeat password
                    </label>
                    <input
                        type="password"
                        id="password_#2"
                        name="password_#2"
                        placeholder="********"
                        className="bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base"
                    />

                    <button type="submit" className="flex justify-center items-center primary-button" onClick={sendUserInfo}>
                        {loader ? <RiLoader4Fill className="h-9 w-9 animate-spin" /> : "Create"}
                    </button>
                </form>

                {formMistakes.email && (
                    <FormError text="Please introduce a valid email"/>
                )}
                {formMistakes.password && (
                    <FormError text="Please introduce a valid password"/>
                )}
            </section>

            <Toaster richColors position="bottom-center"/>
        </main>
    )
}

export default Signup;