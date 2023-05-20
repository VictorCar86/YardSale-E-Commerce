import { IoMdClose } from 'react-icons/io';
import { GoAlert } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import userAPI from '../utils/requests/UserAPI';

// eslint-disable-next-line react/prop-types
const SignoutModal = ({ toggleModal }) => {
    const dispatcher = useDispatch();
    const dialogRef = useRef(null);

    useEffect(() => {
        if (dialogRef.current !== null && !dialogRef.current.open){
            dialogRef.current.showModal();
        }
    }, []);

    function closeSession() {
        toggleModal();
        userAPI.SIGNOUT({}, dispatcher);
    }

    return (
        <dialog className='p-0 rounded-md shadow-[0px_2px_14px_0px_gray]' ref={dialogRef}>
            <div className='flex justify-end h-6 m-4'>
                <button type='button' onClick={toggleModal}>
                    <IoMdClose className='inline-block w-[22px] h-min fill-gray-400'/>
                </button>
            </div>
            <div className='p-4 border-t-2 border-b-2 border-gray-300'>
                <GoAlert className='inline-block mr-2 fill-red-600'/>
                <span>Do you really wish to leave and sign out? All the unsaved changes will be lost.</span>
            </div>
            <div className='flex justify-end gap-4 m-4'>
                <button className='alert-button m-0 px-4' onClick={closeSession}>
                    Yes, Sign Out
                </button>
                <button className='secondary-button m-0 px-4' onClick={toggleModal}>
                    No, Cancel
                </button>
            </div>
        </dialog>
    )
}

export default SignoutModal;