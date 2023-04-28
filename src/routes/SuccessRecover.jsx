const SuccessRecover = () => {
    return (
        <main>
            <section className='w-full h-screen grid place-items-center'>
                <div className="grid w-[300px]">
                    {/* <img src="./logos/logo_yard_sale.svg" alt="logo" className="logo" /> */}

                    <h1 className="text-lg my-3 font-bold text-center h-6">
                        Create a new password
                    </h1>
                    <p className="text-very-light-pink text-base mb-8 font-light h-5 text-center">
                        Enter a new password for your account
                    </p>

                    <form action="/" className="flex flex-col">
                        <label htmlFor="password_#1" className="font-bold text-sm mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password_#1"
                            placeholder="*********"
                            className="bg-input-field h-[42px] p-2 mb-3 rounded-lg text-base"
                        />

                        <label htmlFor="password_#2" className="font-bold text-sm mb-1">
                            Repeat password
                        </label>
                        <input
                            type="password"
                            id="password_#2"
                            placeholder="*********"
                            className="bg-input-field h-[42px] p-2 mb-3 rounded-lg"
                        />

                        <input type="submit" value="Confirm" className="primary-button" />
                    </form>
                </div>
            </section>
        </main>
    )
}

export default SuccessRecover;