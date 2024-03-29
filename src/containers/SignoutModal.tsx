import { IoMdClose } from 'react-icons/io';
import { GoAlert } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import userAPI from '../utils/requests/UserAPI';
import DialogModal from '../components/DialogModal';
import { useNavigate } from 'react-router-dom';

type Props = { toggleModal: () => void };

const SignoutModal = ({ toggleModal }: Props): JSX.Element => {
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    function closeSession() {
        toggleModal();
        userAPI.SIGNOUT({ onFinally: () => navigate('/') }, dispatcher);
    }

    return (
        <DialogModal>
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
        </DialogModal>
    )
}

export default SignoutModal;