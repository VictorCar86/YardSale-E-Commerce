import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import DialogModal from "../components/DialogModal";
import LogoYardSale from "../assets/logos/LogoYardSale";

type Props = {
    closeModal: () => void,
};

const AdviceSessionModal = ({ closeModal }: Props): JSX.Element => {
    const htmlTag = document.getElementsByTagName('html')[0];
    htmlTag.style.overflowY = 'hidden';
    htmlTag.style.touchAction = 'none';

    function callbackCloseModal() {
        htmlTag.style.overflowY = 'auto';
        htmlTag.style.touchAction = 'auto';
        closeModal();
    }

    return (
        <DialogModal className="overflow-visible">
            <button
                className="absolute -top-3 -right-3 z-30 p-2 rounded-full bg-white shadow-[0px_0px_2px_1px_#7B7B7B]"
                onClick={callbackCloseModal}
                type="button"
            >
                <IoMdClose className='inline-block w-7 h-min fill-very-light-pink'/>
            </button>

            <section className="relative w-full max-w-[380px] pt-10 pb-3 px-12">
                <LogoYardSale className="w-4/5 mx-auto" />

                <span className="inline-block pt-7 pb-5 text-lg font-bold text-center">
                    <p className="mb-2 text-3xl">Hi! 👋</p>
                    <p>To buy, log in to your account or create a new one</p>
                </span>

                <Link className="primary-button mb-5" onClick={callbackCloseModal} to={'/signup'}>
                    Create account
                </Link>
                <Link className="secondary-button" onClick={callbackCloseModal} to={'/login'}>
                    Log in
                </Link>
            </section>
        </DialogModal>
    );
}

export default AdviceSessionModal;