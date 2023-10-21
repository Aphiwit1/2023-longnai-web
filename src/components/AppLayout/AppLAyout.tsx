export const AppLayout = ({ children }: any) => {
  return (
    <>
      <section className=" h-screen ">
        <nav className=" h-[70px]  border-2 border-b-gray-200 px-[50px] mx-auto mb-10 flex justify-center items-center">
          <div className="bg-orange-100 px-2 py-1 rounded text-sm">
            
           <span>อัพเดท: สายสีเหลือง 21/0ct/2023</span> 
          </div>
        </nav>

        <div className="h-screen p-5 mb-10">{children}</div>

        {/* <footer className="h-[70px] border-2 border-t-gray-200 px-[50px] mx-auto mb-10 flex justify-center items-center">
                        
                 </footer> */}
      </section>
    </>
  );
};
