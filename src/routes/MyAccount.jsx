import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../context/sliceUserState";
import LogoYardSale from "../assets/logos/logoYardSale";
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

    return (
        <main className="grid place-content-center h-screen">
            <section className="grid w-[300px] font-bold">
                <LogoYardSale className="w-40 h-min my-6 mx-auto"/>

                <h1 className="mt-3 text-lg">My account</h1>

                <div className="grid gap-2 mt-9 mb-2.5">
                    <article className="mb-1.5 text-sm">
                        <p>First name</p>
                        <p className={`mt-2 text-base text-very-light-pink ${mainUserState.fetching && 'blur-[3px]'}`}>
                            {userInfo !== null ? userInfo.first_name : 'loading...'}
                        </p>
                    </article>

                    <article className="mb-1.5 text-sm">
                        <p>Last name</p>
                        <p className={`mt-2 text-base text-very-light-pink ${mainUserState.fetching && 'blur-[3px]'}`}>
                            {userInfo !== null ? userInfo.last_name : 'loading...'}
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
                    // onClick={}
                >
                    Edit
                </button>
            </section>
        </main>
    )
}

export default MyAccount;