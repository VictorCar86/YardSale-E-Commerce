import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignoutModal from './SignoutModal';

// eslint-disable-next-line react/prop-types
const AccountMenu = ({ customRef, setStateModal }) => {
    const [signoutModal, setSignoutModal] = useState(false);

    function toggleDialog() {
        if (signoutModal) setStateModal(false);
        setSignoutModal(prev => !prev);
    }

    return (
        <section className='absolute right-0 w-[140px] px-5 pt-5 bg-white border-[1px] border-very-light-pink rounded-md text-black z-30' ref={customRef}>
            <ul className=''>
                <li className='font-bold text-base pb-5 text-end'>
                    <Link to={'/my-orders'}>
                        My orders
                    </Link>
                </li>
                <li className='font-bold text-base pb-5 text-end border-b-[1px] border-very-light-pink'>
                    <Link to={'/my-account'}>
                        My account
                    </Link>
                </li>
                <li className='text-hospital-green h-[60px] pt-5 text-sm text-end'>
                    <button type='button' onClick={toggleDialog}>
                        Sign out
                    </button>
                </li>
            </ul>

            {signoutModal && <SignoutModal toggleModal={toggleDialog}/>}
        </section>
    )
}

export default AccountMenu;