import { useEffect } from 'react';
import { userState } from '../context/sliceUserState';
import { shoppingCartState } from '../context/sliceShoppingCartState';
import { useDispatch, useSelector } from 'react-redux';
import userAPI from '../utils/requests/UserAPI';
import shoppingCartAPI from '../utils/requests/ShoppingCartAPI';

const whiteList: string[] = ['/my-account'];

const InitialRequests = (): JSX.Element => {
    const { userInfo } = useSelector(userState);
    const { itemsList } = useSelector(shoppingCartState);
    const dispatcher = useDispatch();

    useEffect(() => {
        if (!userInfo.email && !whiteList.includes(location.pathname)) {
            userAPI.USER_INFO({}, dispatcher);
        }
        if (!itemsList.length) {
            shoppingCartAPI.CART_ITEMS({}, dispatcher);
        }
    }, []);

    return (false as unknown) as JSX.Element;
}

export default InitialRequests;