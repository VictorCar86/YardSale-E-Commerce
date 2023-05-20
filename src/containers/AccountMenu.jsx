import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignoutModal from '../components/SignoutModal';

// eslint-disable-next-line react/prop-types
const AccountMenu = ({ customRef, setStateModal }) => {
    const [signoutModal, setSignoutModal] = useState(false);

    function toggleDialog() {
        if (signoutModal) setStateModal(false);
        setSignoutModal(prev => !prev);
    }

    return (
        <section className='absolute right-0 w-[140px] px-5 pt-5 bg-white border-[1px] border-very-light-pink rounded-md text-black' ref={customRef}>
            <ul className=''>
                <li className='font-bold text-base pb-5 text-end'>
                    <Link to={''}>
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
// const AccountMenu = ({ customRef, setStateModal }) => {
//     const dispatcher = useDispatch();
//     const dialogRef = useRef(null);

//     function toggleDialog() {
//         const dialog = dialogRef.current;
//         if (dialog.open) {
//             dialog.close();
//             setStateModal(false);
//         }
//         else dialog.showModal();
//     }

//     function closeSession() {
//         toggleDialog();
//         const fetchConfig = {};
//         fetchUser.SIGNOUT(fetchConfig, dispatcher);
//     }

//     return (
//         <section className='absolute right-0 w-[140px] px-5 pt-5 bg-white border-[1px] border-very-light-pink rounded-md text-black' ref={customRef}>
//             <ul className=''>
//                 <li className='font-bold text-base pb-5 text-end'>
//                     <Link to={''}>
//                         My orders
//                     </Link>
//                 </li>
//                 <li className='font-bold text-base pb-5 text-end border-b-[1px] border-very-light-pink'>
//                     <Link to={'/my-account'}>
//                         My account
//                     </Link>
//                 </li>
//                 <li className='text-hospital-green h-[60px] pt-5 text-sm text-end'>
//                     <button type='button' onClick={toggleDialog}>
//                         Sign out
//                     </button>
//                 </li>
//             </ul>

//             <dialog className='p-0 rounded-md shadow-[0px_2px_14px_0px_gray]' ref={dialogRef}>
//                 <div className='flex justify-end h-6 m-4'>
//                     <button type='button' onClick={toggleDialog}>
//                         <IoMdClose className='inline-block w-[22px] h-min fill-gray-400'/>
//                     </button>
//                 </div>
//                 <div className='p-4 border-t-2 border-b-2 border-gray-300'>
//                     <GoAlert className='inline-block mr-2 fill-red-600'/>
//                     <span>Do you really wish to leave and sign out? All the unsaved changes will be lost.</span>
//                 </div>
//                 <div className='flex justify-end gap-4 m-4'>
//                     <button className='alert-button m-0 px-4' onClick={closeSession}>
//                         Yes, Sign Out
//                     </button>
//                     <button className='secondary-button m-0 px-4' onClick={toggleDialog}>
//                         No, Cancel
//                     </button>
//                 </div>
//             </dialog>
//         </section>
//     )
// }

export default AccountMenu;