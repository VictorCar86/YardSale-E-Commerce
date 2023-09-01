import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemCartInfo, resetShopCartState, shoppingCartState } from "../context/sliceShoppingCartState";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { toast } from "sonner";
import MainNavbar from "../containers/MainNavbar";
import IconLittleArrow from "../assets/icons/IconLittleArrow";
import IconVisaCard from "../assets/icons/IconVisaCard"
import IconMasterCard from "../assets/icons/IconMasterCard"
import IconJcbCard from "../assets/icons/IconJcbIcon"
import IconAmericanCard from "../assets/icons/IconAmericanCard"
import ordersAPI from "../utils/requests/OrdersAPI";
import floorTotalPrice from "../utils/floorTotalPrice";

const Checkout = (): JSX.Element => {
    const mainShopCartState = useSelector(shoppingCartState);
    const { itemsList } = mainShopCartState;
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    const [isPaymentSection, setIsPaymentSection] = useState(false);

    useEffect(() => {
        if (!itemsList) {
            navigate('/');
        }
    }, []);

    function postOrder() {
        const products = itemsList.map(item => {
            return { productId: item.id, productAmount: item.cartInfo.productAmount };
        });
        const config = {
            body: {
                products,
            },
            onSuccess: () => {
                navigate('/my-orders');
                toast.success('Order created successfully!');
                dispatcher(resetShopCartState());
            },
        };
        ordersAPI.CREATE_ORDER(config, dispatcher);
    }

    const reducePrices = useMemo(() => {
        const cb = (prev: number, current: ItemCartInfo) => prev + (current.cartInfo.productAmount * current.price);
        return itemsList ? floorTotalPrice(itemsList.reduce(cb, 0)) : '0';
    }, [itemsList]);

    return (
        <>
            <header>
                <MainNavbar />
            </header>
            <main className="grid place-content-center md:grid-flow-col gap-[8%] min-h-screen h-full w-full pt-14">
                <section className="w-80">
                    <ol className="flex justify-center gap-2 mt-5 mb-6">
                        <li className={`${!isPaymentSection ? 'text-hospital-green font-bold' : 'text-very-light-pink'}`}>
                            <span>Shipping</span>
                            <IconLittleArrow className='inline-block w-2 h-max ml-2 opacity-70'/>
                        </li>
                        <li className={`${isPaymentSection ? 'text-hospital-green font-bold' : 'text-very-light-pink'}`}>
                            <span>Payment</span>
                        </li>
                    </ol>

                    {isPaymentSection && (
                      <>
                        <form method="post">
                            <h1 className="mb-4 text-xl font-bold">
                                Payment & Billing
                            </h1>

                            <section>
                                <label className="relative block mb-3">
                                    <input
                                        className="h-[42px] w-full p-2 rounded-lg text-base bg-input-field"
                                        placeholder="Card number"
                                        type="number"
                                    />
                                    <div className="absolute top-1.5 right-2.5 flex gap-1">
                                        <IconVisaCard className="w-8 h-max"/>
                                        <IconMasterCard className="w-8 h-max"/>
                                        <IconJcbCard className="w-8 h-max"/>
                                        <IconAmericanCard className="w-8 h-max"/>
                                    </div>
                                </label>
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

                            <p>
                                <AiOutlineInfoCircle className='inline-block w-5 h-min mr-1 fill-blue-500' />
                                <span className="text-sm">
                                    Your order will be processed in USD.
                                </span>
                            </p>
                        </form>

                        <section className="my-4">
                            <p className="mb-2 text-lg font-bold">
                                Order summary
                            </p>

                            <ul className="grid gap-1 md:max-h-[20vh] md:pr-2 md:overflow-y-auto">
                                {itemsList?.map((item, index) => (
                                    <li key={index}>
                                        <span className="inline-block w-3/4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                            {item.cartInfo.productAmount} x {item.name}
                                        </span>
                                        <span className="w-1/4 text-right float-right">
                                            ${floorTotalPrice(item.price * item.cartInfo.productAmount)}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="w-full h-[1px] my-3 bg-very-light-pink"/>

                            <p className="font-bold">
                                <span>Subtotal</span>
                                <span className="float-right">
                                    ${reducePrices}
                                </span>
                            </p>

                            <span className="flex justify-between w-full my-2 text-sm">
                                <span>
                                    <p>Shipping fee</p>
                                    <p className="text-very-light-pink">
                                        Regular (2-6 business days, tracking)
                                    </p>
                                </span>
                                <span className="font-bold">
                                    {/* ${shippingFee} */}
                                    Free
                                </span>
                            </span>

                            <p className="text-sm">
                                <span>Sales Tax</span>
                                <span className="font-bold float-right">
                                    {/* ${salesTax} */}
                                    $0
                                </span>
                            </p>

                            <article className="p-4 mt-4 bg-very-light-pink/30">
                                <p className="font-bold">
                                    <span>ORDER TOTAL</span>
                                    <span className="float-right">
                                        {/* USD ${reducePrices + shippingFee + salesTax} */}
                                        USD ${reducePrices}
                                    </span>
                                </p>
                            </article>
                        </section>
                      </>
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
                        <button
                            className="primary-button w-full m-0"
                            onClick={!isPaymentSection ? () => setIsPaymentSection(true) : postOrder}
                            type="button"
                        >
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