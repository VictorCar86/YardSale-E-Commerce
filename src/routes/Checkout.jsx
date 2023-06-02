import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { shoppingCartState } from "../context/sliceShoppingCartState";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import MainNavbar from "../containers/MainNavbar";
import IconLittleArrow from "../assets/icons/IconLittleArrow";

const Checkout = () => {
    const navigate = useNavigate();
    const mainShopCartState = useSelector(shoppingCartState);
    const { itemsList } = mainShopCartState;

    const [isPaymentSection, setIsPaymentSection] = useState(false);

    useEffect(() => {
        if (!itemsList){
            navigate('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <header>
                <MainNavbar />
            </header>
            <main className="grid place-content-center md:grid-flow-col gap-[8%] min-h-screen h-full w-screen pt-14">
                <section className="w-80">
                    <ol className="flex justify-center gap-2 mb-6">
                        <li className={`${!isPaymentSection ? 'text-hospital-green font-bold' : 'text-very-light-pink'}`}>
                            <span>Shipping</span>
                            <IconLittleArrow className='inline-block w-2 h-max ml-2 opacity-70'/>
                        </li>
                        <li className={`${isPaymentSection ? 'text-hospital-green font-bold' : 'text-very-light-pink'}`}>
                            <span>Payment</span>
                        </li>
                    </ol>

                    {isPaymentSection && (
                        <form method="post">
                            <h1 className="mb-4 text-xl font-bold">
                                Payment & Billing
                            </h1>

                            <section>
                                <input
                                    className="h-[42px] w-full p-2 mb-3 rounded-lg text-base bg-input-field"
                                    placeholder="Card number"
                                    type="number"
                                />
                                <span className="flex justify-between">
                                    <input
                                        className="h-[42px] w-[48%] p-2 mb-3 rounded-lg text-base bg-input-field"
                                        placeholder="Expiration"
                                        type="text"
                                    />
                                    <input
                                        className="h-[42px] w-[48%] p-2 mb-3 rounded-lg text-base bg-input-field"
                                        placeholder="CVC"
                                        type="number"
                                    />
                                </span>
                            </section>
                        </form>
                    )}

                    {!isPaymentSection && (
                        <form method="post">
                            <h1 className="mb-4 text-xl font-bold">
                                Shipping Options
                            </h1>

                            <section>
                                <input
                                    className="h-[42px] w-full p-2 mb-3 rounded-lg text-base bg-input-field"
                                    placeholder="First name"
                                    type="text"
                                />
                                <input
                                    className="h-[42px] w-full p-2 mb-3 rounded-lg text-base bg-input-field"
                                    placeholder="Last name"
                                    type="text"
                                />
                                <input
                                    className="h-[42px] w-full p-2 mb-3 rounded-lg text-base bg-input-field"
                                    placeholder="Address"
                                    type="text"
                                />
                                <input
                                    className="h-[42px] w-full p-2 mb-3 rounded-lg text-base bg-input-field"
                                    placeholder="Apartment, suite, etc."
                                    type="text"
                                />
                                <span className="flex justify-between">
                                    <input
                                        className="h-[42px] w-[48%] p-2 mb-3 rounded-lg text-base bg-input-field"
                                        placeholder="City"
                                        type="text"
                                    />
                                    <input
                                        className="h-[42px] w-[48%] p-2 mb-3 rounded-lg text-base bg-input-field"
                                        placeholder="Country/region"
                                        type="text"
                                    />
                                </span>
                                <span className="flex justify-between">
                                    <input
                                        className="h-[42px] w-[48%] p-2 mb-3 rounded-lg text-base bg-input-field"
                                        placeholder="ZIP code"
                                        type="text"
                                    />
                                    <input
                                        className="h-[42px] w-[48%] p-2 mb-3 rounded-lg text-base bg-input-field"
                                        placeholder="Phone"
                                        type="number"
                                    />
                                </span>
                            </section>
                        </form>
                    )}

                    <span className="flex flex-col-reverse mt-4">
                        {isPaymentSection && (
                            <button
                                className="flex items-center gap-2 w-max my-4 mx-auto text-very-light-pink"
                                onClick={() => setIsPaymentSection(false)}
                                type="button"
                            >
                                <IoMdArrowBack className="w-5 h-max fill-very-light-pink"/>
                                <span>Return to shipping form</span>
                            </button>
                        )}
                        {!isPaymentSection && (
                            <Link className="flex items-center gap-2 w-max my-4 mx-auto text-very-light-pink" to={'/'}>
                                <IoMdArrowBack className="w-5 h-max fill-very-light-pink"/>
                                <span>Return to home page</span>
                            </Link>
                        )}
                        <button className="primary-button w-full m-0" onClick={() => setIsPaymentSection(true)} type="button">
                            <span>
                                {isPaymentSection ? 'Place order' : 'Continue to payment'}
                            </span>
                        </button>
                    </span>
                </section>
            </main>
        </>
    )
}

export default Checkout;