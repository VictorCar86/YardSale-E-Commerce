import { AiFillBug } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import MainNavbar from '../containers/MainNavbar';

const Error404 = () => {
    const navigate = useNavigate();
    return (
        <>
            <header>
                <MainNavbar />
            </header>
            <main className='grid place-content-center min-h-screen w-full'>
                <section className='h-full w-full'>
                    <p className='flex justify-center items-center gap-3'>
                        <AiFillBug className='w-16 h-max fill-hospital-green'/>
                        <span className='text-hospital-green text-[80px] font-bold'>
                            404
                        </span>
                    </p>
                    <h1 className='-mt-2 mb-3 text-center text-3xl font-bold'>
                        Page not found
                    </h1>
                    <p className='max-w-md w-full px-3 text-center text-very-light-pink'>
                        {"We're sorry, the page you requested could not be found. Please go back to the homepage"}
                    </p>
                    <button className='primary-button w-[300px] mt-6 mx-auto mb-0' onClick={() => navigate('/')} type='button'>
                        Go Home
                    </button>
                </section>
            </main>
        </>
    )
}

export default Error404;