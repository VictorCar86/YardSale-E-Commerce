import { RiErrorWarningFill } from 'react-icons/ri';

const FormError = ({ text = "" }): JSX.Element => {
    return (
        <article className='flex justify-center items-center gap-3 p-4 mb-2 text-red-600 font-bold rounded-md border border-solid border-red-800 bg-red-300'>
            <RiErrorWarningFill className='h-min w-6 fill-red-800' />
            <span className='max-w-[230px]'>
                { text }
            </span>
        </article>
    )
}

export default FormError;