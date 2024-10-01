import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../context/sliceUserState";
import { shoppingCartState } from "../context/sliceShoppingCartState";
import { ProductInfo, createProductPreview } from "../context/sliceProductsState";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import IconAddToCart from "../assets/icons/IconAddToCart";
import IconAddedToCart from "../assets/icons/IconAddedToCart";
import skeletonImg from "../assets/images/skeleton.webp";
import AdviceSessionModal from "./AdviceSessionModal";
import shoppingCartAPI from "../utils/requests/ShoppingCartAPI";
import { FetchConfig } from "../utils/requests/MakeRequest";

type Props = {
    productData: ProductInfo;
    openModal: () => void;
};

const ProductItemDesc = ({ productData, openModal }: Props): JSX.Element => {
    const mainShopCartState = useSelector(shoppingCartState);
    const { userInfo } = useSelector(userState);
    const { itemsList } = mainShopCartState;
    const dispatcher = useDispatch();

    const alreadyExistItem = useMemo(() => {
        return itemsList?.some((item) => item.id === productData.id);
    }, [itemsList]);

    function createPreview() {
        dispatcher(createProductPreview(productData));
        openModal();
    }

    const [lazyImage, setLazyImage] = useState<string>(skeletonImg);
    const [adviceModal, setAdviceModal] = useState(false);
    const [itemFetching, setItemFetching] = useState(false);

    function sendToCart() {
        if (!userInfo) {
            setAdviceModal(true);
            return;
        }

        setItemFetching(true);

        const fetchConfig: FetchConfig = {
            body: { productId: productData.id },
            onSuccess: () => toast.success("One item was added to your shopping cart!"),
            onFinally: () => setItemFetching(false),
        };
        shoppingCartAPI.ADD_ITEM(fetchConfig, dispatcher);
    }

    return (
        <li className="relative">
            <figure
                className="inline-block sm:w-60 w-[140px] cursor-pointer"
                onClick={createPreview}
            >
                <img
                    className="sm:h-60 h-[140px] sm:w-60 w-[140px] object-cover rounded-2xl shadow-[0px_0px_3px_0px_#7B7B7B]"
                    src={productData.image || lazyImage}
                    alt={productData.name}
                    onLoad={() => setLazyImage(productData.image)}
                />
                <figcaption className="mt-3.5">
                    <p className="font-bold">${productData.price}</p>
                    <p className="w-[70%] text-sm text-very-light-pink overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {productData.name}
                    </p>
                </figcaption>
            </figure>

            <button
                className={`absolute right-1 bottom-2 w-10 h-10 rounded-full ${(alreadyExistItem || itemFetching) && "shadow-[0px_0px_2px_1px_#7B7B7B]"}`}
                onClick={sendToCart}
                disabled={alreadyExistItem || itemFetching}
                type="button"
            >
                {itemFetching && (
                    <AiOutlineLoading3Quarters className="inline-block w-7 h-max fill-very-light-pink animate-spin" />
                )}
                {!itemFetching && (
                    <>
                        {alreadyExistItem && <IconAddedToCart />}
                        {!alreadyExistItem && <IconAddToCart />}
                    </>
                )}
            </button>

            {adviceModal && (
                <AdviceSessionModal closeModal={() => setAdviceModal(false)} />
            )}
        </li>
    );
};

export default ProductItemDesc;
