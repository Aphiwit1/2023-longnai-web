

export const Loading = () => {
  return (
    <>
    <section className="flex justify-center my-5 gap-x-3 text-orange-500 items-center">
    <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <span>กำลังค้นหาข้อมูล...</span>
    </section>
      

    </>
  );
};
