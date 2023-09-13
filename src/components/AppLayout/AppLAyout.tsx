

export const AppLayout = ({ children }: any) => {
    return (
        <>
            <section className=" h-screen ">
                <nav className=" h-[70px]  border-2 border-b-gray-200 px-[50px] mx-auto mb-10 flex justify-center items-center">
                </nav>
                
                <div className='h-screen p-5 mb-10'>
                    {children}
                </div>

                {/* <footer className="h-[70px] border-2 border-t-gray-200 px-[50px] mx-auto mb-10 flex justify-center items-center">
                        
                 </footer> */}
            </section>

        </>
    )
}
