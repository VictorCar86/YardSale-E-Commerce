import { useEffect, useRef } from 'react';

type Props = {
    className?: string,
    children?: JSX.Element[]
};

const DialogModal = ({ className = "", children }: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current !== null && !dialogRef.current.open){
            dialogRef.current.showModal();
        }
    }, []);

    return (
        <dialog className={`relative p-0 rounded-md shadow-[0px_2px_14px_0px_#7B7B7B] ${className}`} ref={dialogRef}>
            { children }
        </dialog>
    );
}

export default DialogModal;