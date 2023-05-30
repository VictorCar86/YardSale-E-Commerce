const MyOrders = () => {
    return (
        <main>
            <section className="w-full min-h-[87vh] h-full font-bold">
                    <article className='grid w-[300px] md:mt-[30%]'>
                        <h1 className="mt-3 text-lg">My account</h1>
                        <div className="grid gap-2 mt-9 mb-2.5">
                            <article className="mb-1.5 text-sm">
                                <p>First name</p>
                                {/* <p className={`mt-2 text-base text-very-light-pink ${mainUserState.fetching && 'blur-[3px]'}`}>
                                    {userInfo !== null ? userInfo.firstName : 'loading...'}
                                </p> */}
                            </article>

                            <article className="mb-1.5 text-sm">
                                <p>Last name</p>
                                {/* <p className={`mt-2 text-base text-very-light-pink ${mainUserState.fetching && 'blur-[3px]'}`}>
                                    {userInfo !== null ? userInfo.lastName : 'loading...'}
                                </p> */}
                            </article>

                            <article className="mb-1.5 text-sm">
                                <p>Email address</p>
                                {/* <p className={`mt-2 text-base text-very-light-pink ${mainUserState.fetching && 'blur-[3px]'}`}>
                                    {userInfo !== null ? userInfo.email : 'loading...'}
                                </p> */}
                            </article>

                            <article className="mb-1.5 text-sm">
                                <p>Password</p>
                                {/* <p className={`mt-2 text-base text-very-light-pink ${mainUserState.fetching && 'blur-[3px]'}`}>
                                    **********
                                </p> */}
                            </article>
                        </div>

                        <button
                            type="button"
                            className="secondary-button"
                            // onClick={toggleEditMode}
                        >
                            Edit
                        </button>
                    </article>
            </section>
        </main>
    )
}

export default MyOrders;