import { useEffect } from 'react';
import { userState } from '../context/sliceUserState';
import { useDispatch, useSelector } from 'react-redux';
import userAPI from '../utils/requests/UserAPI';

const whiteList = ['/my-account'];

const UserInfoReq = () => {
    const { userInfo } = useSelector(userState);
    const dispatcher = useDispatch();
    useEffect(() => {
        if (userInfo === null && !whiteList.includes(location.pathname)){
            userAPI.USER_INFO({}, dispatcher);
        }
    }, [userInfo, dispatcher]);
}

export default UserInfoReq;