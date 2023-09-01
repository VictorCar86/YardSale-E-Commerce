import { useDispatch, useSelector } from "react-redux";
import { OrderInfo, OrderList, deleteSelectedOrder, ordersState } from "../context/sliceOrdersState";
import { createProductPreview } from "../context/sliceProductsState";
import { productPreviewModal } from "../context/sliceModalsState";
import IconLittleArrow from "../assets/icons/IconLittleArrow";
import floorTotalPrice from "../utils/floorTotalPrice";

const OrderDesc = () => {
    const dispatcher = useDispatch();
    const mainOrdersState = useSelector(ordersState);
    const { ordersList, selectedOrder } = mainOrdersState;
    const currentOrder = ordersList[selectedOrder ?? Infinity];

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

    function productPreview(item: OrderInfo) {
        dispatcher(createProductPreview(item));
        dispatcher(productPreviewModal());
    }

    return (
        <aside className="w-[325px] h-full py-9 font-bold">
            <article className="flex gap-3">
                <button className="md:hidden" onClick={() => dispatcher(deleteSelectedOrder())} type="button">
                    <IconLittleArrow className='w-3 h-max rotate-180 cursor-pointer'/>
                </button>
                <h1 className="mb-0.5 text-2xl">
                    My order
                </h1>
            </article>

            <article className="flex justify-between items-center px-6 py-4 mt-9 rounded-lg bg-very-light-pink/10">
                <span className="flex flex-col justify-center h-full">
                    <p>
                        {orderDateFormat(currentOrder.createdAt)}
                    </p>
                    <p className='text-sm text-very-light-pink'>
                        {currentOrder.items.length} Articles
                    </p>
                </span>
                <span className="font-bold">
                    $ {reduceTotalPrice(currentOrder.items)}
                </span>
            </article>

            <ul className="grid gap-4 max-h-[50vh] px-1.5 py-1 mt-8 overflow-y-auto overflow-x-hidden">
                {currentOrder.items.map((item, index) => (
                    <li className="flex justify-between items-center h-16 w-full text-base" key={index}>
                        <button onClick={() => productPreview(item)} type="button">
                            <figure className="flex items-center gap-4 h-full">
                                <img
                                    className="w-16 h-16 rounded-md shadow-[0px_0px_3px_0px_#7B7B7B]"
                                    src={item.image}
                                    alt={item.name}
                                />
                                <figcaption className='mr-3 text-very-light-pink whitespace-nowrap overflow-ellipsis overflow-hidden'>
                                    {item.name}
                                </figcaption>
                            </figure>
                        </button>
                        <span>
                            <span className="mt-[3px] mr-2 text-sm">
                                x{item.Order_Product.productAmount}
                            </span>
                            <span className='font-bold'>
                                ${item.price}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default OrderDesc;