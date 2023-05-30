import { useEffect } from 'react';
import { userState } from '../context/sliceUserState';
import { shoppingCartState } from '../context/sliceShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import userAPI from '../utils/requests/UserAPI';
import shoppingCartAPI from '../utils/requests/ShoppingCartAPI';

const whiteList = ['/my-account'];

const InitialRequests = () => {
    const { userInfo } = useSelector(userState);
    const { itemsList } = useSelector(shoppingCartState);
    const dispatcher = useDispatch();

    useEffect(() => {
        if (!userInfo && !whiteList.includes(location.pathname)){
            userAPI.USER_INFO({}, dispatcher);
        }
        if (!itemsList){
            shoppingCartAPI.CART_ITEMS({}, dispatcher);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default InitialRequests;