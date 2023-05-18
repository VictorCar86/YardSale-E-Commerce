import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiLoader4Fill } from "react-icons/ri";
import { userState } from "../context/sliceUserState";
import { Toaster, toast } from "sonner";
import LogoYardSale from "../assets/logos/logoYardSale";
import LoadingPage from "../containers/LoadingPage";
import fetchUser from "../utils/fetchUser";

const MyAccount = () => {
    const mainUserState = useSelector(userState);
    const { userInfo } = mainUserState;

    const dispatcher = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        if (userInfo === null){
            const fetchConfig = {
                onError: () => navigator('/login'),
            };
            fetchUser.USER_INFO(fetchConfig, dispatcher);
        }
    }, [dispatcher, navigator, userInfo]);

    const [editMode, setEditMode] = useState(false);

    function toggleEditMode() {
        setEditMode(prev => !prev);
    }

    const [loader, setLoader] = useState(false);
    const formRef = useRef(null);

    async function patchUserInfo() {
        const formData = new FormData(formRef.current);
        const fields = ['firstName', 'lastName', 'email', 'password'];

        const payload = {};
        fields.forEach(key => {
            const value = formData.get(key);
            if (value !== "") payload[key] = value;
        });
        console.log("🚀 ~ file: MyAccount.jsx:41 ~ patchUserInfo ~ payload:", payload)

        if (Object.keys(payload).length === 0) {
            toast.error('Lack of content 📄', { description: 'Fill at least one field' });
            return;
        }

        setLoader(true);

        const fetchConfig = {
            body: payload,
            onSuccess: () => {
                toggleEditMode();
                toast.success('Your data was updated');
            },
            onError: (err) => {
                toast.error('Something went wrong 😳', { description: err });
            },
            finally: () => setLoader(false),
        };

        fetchUser.UPDATE_DATA(fetchConfig, dispatcher);
    }

    return (
        <main className="grid place-content-center h-screen">
            <section className="grid w-[300px] font-bold">
                <LogoYardSale className="w-40 h-min my-6 mx-auto"/>
                {!editMode && (
                  <>
                    <h1 className="mt-3 text-lg">My account</h1>
                    <div className="grid gap-2 mt-9 mb-2.5">
                        <article className="mb-1.5 text-sm">
                            <p>First name</p>
                            <p className={`mt-2 text-base text-very-light-pink ${mainUserState.fetching && 'blur-[3px]'}`}>
                                {userInfo !== null ? userInfo.firstName : 'loading...'}
                            </p>
                        </article>

                        <article className="mb-1.5 text-sm">
                            <p>Last name</p>
                            <p className={`mt-2 text-base text-very-light-pink ${mainUserState.fetching && 'blur-[3px]'}`}>
                                {userInfo !== null ? userInfo.lastName : 'loading...'}
                            </p>
                        </article>

                        <article className="mb-1.5 text-sm">
                            <p>Email address</p>
                            <p className={`mt-2 text-base text-very-light-pink ${mainUserState.fetching && 'blur-[3px]'}`}>
                                {userInfo !== null ? userInfo.email : 'loading...'}
                            </p>
                        </article>

                        <article className="mb-1.5 text-sm">
                            <p>Password</p>
                            <p className={`mt-2 text-base text-very-light-pink ${mainUserState.fetching && 'blur-[3px]'}`}>
                                **********
                            </p>
                        </article>
                    </div>

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={toggleEditMode}
                    >
                        Edit
                    </button>
                  </>
                )}

                {editMode && (
                  <>
                    <h1 className="mt-3 text-lg">Edit profile</h1>
                    <form className="grid gap-2 mt-9 mb-2.5 text-sm" method="POST" ref={formRef}>
                        <label htmlFor="first_name">
                            First name
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="firstName"
                            placeholder="Your first name"
                            className={'bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base'}
                        />

                        <label htmlFor="last_name">
                            Last name
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="lastName"
                            placeholder="Your last name"
                            className={'bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base'}
                        />

                        <label htmlFor="email">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            className={'bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base'}
                        />

                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="**********"
                            className={'bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base'}
                        />
                    </form>

                    <button
                        type="button"
                        className="secondary-button mb-0"
                        onClick={toggleEditMode}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="primary-button mb-0"
                        disabled={mainUserState.fetching}
                        onClick={patchUserInfo}
                    >
                        {loader ? <RiLoader4Fill className="h-9 w-9 animate-spin" /> : "Save changes"}
                    </button>
                  </>
                )}
            </section>

            <Toaster richColors position="bottom-center"/>

            {(!userInfo || mainUserState.fetching) && (
                <LoadingPage />
            )}
        </main>
    )
}

export default MyAccount;