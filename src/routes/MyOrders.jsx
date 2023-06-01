import MainNavbar from "../containers/MainNavbar";
import IconLittleArrow from "../assets/icons/IconLittleArrow";

const MyOrders = () => {
    return (
        <>
            <header>
                <MainNavbar/>
            </header>
            <main className="grid place-content-center min-h-screen h-full w-screen pt-14">
                <section className="w-[300px] h-full font-bold">
                    <h1 className="mt-9 text-2xl">
                        My orders
                    </h1>
                    <ul className="grid gap-4 mt-9">
                        {[...Array(6).keys()].map(i => (
                            <li key={i}>
                                <button className="flex justify-between h-16 w-full text-base" type="button">
                                    <span className="flex flex-col justify-center h-full">
                                        <p>04.05.23</p>
                                        <p className='text-sm text-very-light-pink'>
                                            6 Articles
                                        </p>
                                    </span>
                                    <span className="flex items-center gap-4 h-full text-very-light-pink">
                                        <span>$ 300,00</span>
                                        <IconLittleArrow className='inline-block w-2 h-max mt-0.5'/>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    )
}

export default MyOrders;