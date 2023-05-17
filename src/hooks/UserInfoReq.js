import { useEffect } from 'react';
import { userState } from '../context/sliceUserState';
import { useDispatch, useSelector } from 'react-redux';
import fetchUser from '../utils/fetchUser';

const whiteList = ['/my-account'];

const UserInfoReq = () => {
    const { userInfo } = useSelector(userState);
    const dispatcher = useDispatch();
    useEffect(() => {
        if (userInfo === null && !whiteList.includes(location.pathname)){
            fetchUser.USER_INFO({}, dispatcher);
        }
    }, [userInfo, dispatcher]);
}

export default UserInfoReq;