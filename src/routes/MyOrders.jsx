import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectedOrder, ordersState } from "../context/sliceOrdersState";
import { Link, useNavigate } from "react-router-dom";
import IconLittleArrow from "../assets/icons/IconLittleArrow";
import MainNavbar from "../containers/MainNavbar";
import ordersAPI from "../utils/requests/OrdersAPI";
import OrderDesc from "../containers/OrderDesc";

const MyOrders = () => {
    const dispatcher = useDispatch();
    const mainOrdersState = useSelector(ordersState);
    const { ordersList, selectedOrder, fetching } = mainOrdersState;
    const navigate = useNavigate();

    function orderDateFormat(date) {
        if (typeof date !== 'string') return false;
        const d = new Date(date);
        return `${d.getMonth()}.${d.getDay()}.${d.getFullYear()}`
    }

    function reduceTotalPrice(items = []) {
        const cb = (prev, current) => {
            return prev + (current.price * current.Order_Product.productAmount);
        }
        return items.reduce(cb, 0);
    }

    useEffect(() => {
        if (ordersList === null){
            const config = {
                onError: () => navigate('/login'),
            };
            ordersAPI.ORDERS_LIST(config, dispatcher);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <header>
                <MainNavbar/>
            </header>
            <main className="grid place-content-center md:grid-flow-col gap-[8%] min-h-screen h-full w-screen pt-14">
                <section className={`${typeof selectedOrder === 'number' && 'max-md:hidden'} w-[300px] min-h-[35vh] h-full font-bold`}>
                    <h1 className="mt-9 text-2xl">
                        My orders
                    </h1>
                    {fetching && (
                        <ul className="grid gap-4 mt-9 blur-[3px] animate-pulse">
                            {[...Array(2).keys()].map(i => (
                                <li className="flex justify-between h-16 w-full text-base" key={i}>
                                    <span className="flex flex-col justify-center h-full">
                                        <p>01.01.23</p>
                                        <p className='text-sm text-very-light-pink'>
                                            ? Articles
                                        </p>
                                    </span>
                                    <span className="flex items-center gap-4 h-full text-very-light-pink">
                                        <span>$0,00</span>
                                        <IconLittleArrow className='inline-block w-2 h-max mt-0.5'/>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {!fetching && (
                      <>
                        {!ordersList && (
                            <>
                                <p className="mt-9 text-center">
                                    {"There's no orders yet 🧦"}
                                </p>
                                <Link className="primary-button w-3/4 mx-auto mb-24" to={'/'}>Explore now</Link>
                            </>
                        )}
                        {ordersList && (
                            <ul className="grid gap-4 mt-9">
                                {ordersList?.map((order, index) => (
                                    <li key={index}>
                                        <button
                                            className="flex justify-between h-16 w-full text-base"
                                            onClick={() => dispatcher(createSelectedOrder(index))}
                                            type="button"
                                        >
                                            <span className="flex flex-col justify-center h-full">
                                                <p>
                                                    {orderDateFormat(order.createdAt)}
                                                </p>
                                                <p className='text-sm text-very-light-pink'>
                                                    {order?.items?.length} Articles
                                                </p>
                                            </span>
                                            <span className="flex items-center gap-4 h-full text-very-light-pink">
                                                <span>${order?.items?.length > 0 ? reduceTotalPrice(order.items) : '0'},00</span>
                                                <IconLittleArrow className='inline-block w-2 h-max mt-0.5'/>
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                      </>
                    )}
                </section>
                {typeof selectedOrder === 'number' && (
                    <OrderDesc />
                )}
            </main>
        </>
    )
}

export default MyOrders;