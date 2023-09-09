

export const Tag = ({ detail, distance }: any) => {
    const changeTypeToName = (type: number) => {
        switch (type) {
            case 1 | 2 | 6: return "BTS"
            case 3 | 4 | 9: return "MRT"
            case 5: return "APT"
            default: return "BTS"
        }
    }
    const transitType = changeTypeToName(detail.type)


    return (
        <section className="flex bg-whte border-2  w-[300px]  justify-between gap-x-5 p-2 rounded">
            <div className='flex flex-col w-full gap-y-2'>
                <div className='flex gap-x-4'>
                    <div className="bg-green-500 text-white text-xs flex justify-center items-center  px-3 py-1 rounded-xl  w-1/4">{transitType}</div>
                    <div className="w-1/2">{detail.name_th}</div>
                    <div className="w-1/4 text-right">
                        logo
                    </div>
                </div>

                <div className="flex gap-x-4  items-center">
                    <div className="border-2 border-green-500 text-green-500 text-xs flex justify-center items-center  px-3 py-1 rounded-xl  w-1/4">{detail.id}</div>
                    <div className="w-1/2 text-slate-600">{detail.name_en}</div>
                    <div className="w-1/4 text-xs text-right">
                        {distance} km
                    </div>
                </div>
            </div>
        </section>
    )
}
