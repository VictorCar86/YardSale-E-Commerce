import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoadingPage = (): JSX.Element => {
    return (
        <main className='fixed grid place-content-center h-screen w-screen bg-white/30'>
            <AiOutlineLoading3Quarters className='inline-block w-32 h-max fill-very-light-pink animate-spin'/>
        </main>
    )
}

export default LoadingPage;