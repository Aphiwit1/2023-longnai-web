import { RapidTransitThemeType } from "../../../../interfaces/enum"


export const Tag = ({ detail, index }: any) => {

    const changeTypeToName = (type: number) => {
        switch (type) {
            case 1: case 2: case 6: return "BTS"
            case 3: case 4: case 9: return "MRT"
            case 5: return "ARL"
            case RapidTransitThemeType.DARK_RED: return "SRTET"
            case 8: return "SRT"
        }
    }

    const transitBgThemeFunc = (type: number) => {
        switch (type) {
            case RapidTransitThemeType.LIGHT_GREEN:
                return "bg-[#74AD46]"
            case RapidTransitThemeType.DARK_GREEN:
                return "bg-[#325C35]"
            case RapidTransitThemeType.BLUE:
                return "bg-[#365EA1]"
            case RapidTransitThemeType.PURPLE:
                return "bg-[#65327C]"
            case RapidTransitThemeType.ARL_COLOR:
                return "bg-[#E75656]"
            case RapidTransitThemeType.GOLD:
                return "bg-[#CD9934]"
            case RapidTransitThemeType.DARK_RED:
                return "bg-[#F60723]"
            case RapidTransitThemeType.LIGHT_RED:
                return "bg-[#D76A6C]"
        }
    }

    const transitBorderThemeFunc = (type: number) => {
        switch (type) {
            case RapidTransitThemeType.LIGHT_GREEN:
                return "border-[#74AD46] text-[#74AD46]  border-[#74AD46]"
            case RapidTransitThemeType.DARK_GREEN:
                return "border-[#325C35] text-[#325C35] border-[#325C35]"
            case RapidTransitThemeType.BLUE:
                return "border-[#365EA1] text-[#365EA1] border-[#365EA1]"
            case RapidTransitThemeType.PURPLE:
                return "border-[#65327C] text-[#65327C] border-[#65327C]"
            case RapidTransitThemeType.ARL_COLOR:
                return "border-[#E75656] text-[#E75656] border-[#E75656]"
            case RapidTransitThemeType.GOLD:
                return "border-[#CD9934] text-[#CD9934] border-[#CD9934]"
            case RapidTransitThemeType.DARK_RED:
                return "border-[#F60723] text-[#F60723] border-[#F60723]"
            case RapidTransitThemeType.LIGHT_RED:
                return "border-[#D76A6C] text-[#D76A6C] border-[#D76A6C]"
        }
    }

    

    const distanceFormatter = (distance: any) => {
        const dist = distance.toFixed(2)
        if (dist > 1 && dist <= 100) {
            return `${dist} km`
        } else if (dist < 1) {
            return `${dist * 1000} m`
        } else if (dist > 100) {
            return `มากกว่า 100 km`
        }
    }

 

    const transitType = changeTypeToName(detail.type)
    const distanceKilomester = distanceFormatter(detail.distance)
    const bgTheme = transitBgThemeFunc(detail.type)
    const borderTheme = transitBorderThemeFunc(detail.type)
    const nearestStyle = index == 0 ? `shadow-xl rounded-tl-none ${borderTheme}  ` : ''



    return (
        <section className={`relative flex bg-whte border-2  min-w-[300px] max-w-[800px]  justify-between gap-x-5 p-3 rounded-xl ${nearestStyle}`}>
            
            {index === 0 &&   <div className={` absolute top-[-24px] text-center left-[-2px] rounded-t-md  p-1 min-w-[80px] text-xs text-white ${bgTheme}`}>
                ใกล้ที่สุด
            </div>}
          
            <div className='flex flex-col w-full gap-y-2'>
                <div className='flex gap-x-4 justify-between'>
                    <div className={`${bgTheme} text-white text-xs flex justify-center items-center  px-3 py-1 rounded-xl min-w-[60px]`}>{transitType}</div>
                    <div className="">{detail.name_th}</div>
                    <div className="text-right">
                        logo
                    </div>
                </div>

                <div className="flex gap-x-4  items-center justify-between">
                    <div className={`${borderTheme} border-2 text-xs flex justify-center items-center  px-3 py-1 rounded-xl min-w-[60px]`}>{detail.id}</div>
                    <div className=" text-slate-600">{detail.name_en}</div>
                    <div className="text-xs text-right">
                        {distanceKilomester}
                    </div>
                </div>
            </div>
        </section>
    )
}
