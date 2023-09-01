import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderInfo, OrderList, createSelectedOrder, ordersState } from "../context/sliceOrdersState";
import { Link, useNavigate } from "react-router-dom";
import MainNavbar from "../containers/MainNavbar";
import OrderDesc from "../containers/OrderDesc";
import ordersAPI from "../utils/requests/OrdersAPI";
import IconLittleArrow from "../assets/icons/IconLittleArrow";
import floorTotalPrice from "../utils/floorTotalPrice";

const MyOrders = (): JSX.Element => {
    const dispatcher = useDispatch();
    const mainOrdersState = useSelector(ordersState);
    const { ordersList, selectedOrder, fetching } = mainOrdersState;
    const navigate = useNavigate();

    function orderDateFormat(date: OrderList['createdAt']) {
        if (!date) return false;
        const d = new Date(date);
        return `${d.getMonth()}.${d.getDay()}.${d.getFullYear()}`
    }

    function reduceTotalPrice(items: OrderInfo[]) {
        const cb = (prev: number, current: OrderInfo) => {
            return prev + (current.price * current.Order_Product.productAmount);
        }
        return floorTotalPrice(items.reduce(cb, 0));
    }

    useEffect(() => {
        if (ordersList === null){
            const config = {
                onError: () => navigate('/login'),
            };
            ordersAPI.ORDERS_LIST(config, dispatcher);
        }
    }, []);

    return (
        <>
            <header>
                <MainNavbar/>
            </header>
            <main className="grid place-content-center md:grid-flow-col gap-[8%] min-h-screen h-full w-full pt-14">
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
                        {!ordersList.length && (
                            <>
                                <p className="mt-9 text-center font-medium">
                                    {"There's no orders yet 🧦"}
                                </p>
                                <Link className="primary-button w-3/4 mx-auto mb-24" to={'/'}>Explore now</Link>
                            </>
                        )}
                        {ordersList.length && (
                            <ul className="grid gap-4 max-h-[63.5vh] px-1.5 py-1 mt-8 overflow-y-auto overflow-x-hidden">
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
                                                <span>${order?.items?.length > 0 ? reduceTotalPrice(order.items) : '0'}</span>
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