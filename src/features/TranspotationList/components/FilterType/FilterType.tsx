
import { RapidTransitThemeType } from "../../../../interfaces/enum";

const stationTypeList = [
  {
    typeNo: 0,
    typeName: "แสดงทั้งหมด",
  },
  {
    typeNo: 1,
    typeName: "BTS",
  },
  {
    typeNo: 2,
    typeName: "BTS",
  },
  {
    typeNo: 3,
    typeName: "MRT",
  },
  {
    typeNo: 4,
    typeName: "MRT",
  },
  {
    typeNo: 5,
    typeName: "ARL",
  },
  {
    typeNo: 6,
    typeName: "BTS",
  },
  {
    typeNo: 7,
    typeName: "SRTET",
  },
  {
    typeNo: 8,
    typeName: "SRT",
  },
];

export const FilterType = ({ filterTypeHandler, currentType }: any) => {
  const btnBgThemeFunc = (type: number) => {
    switch (type) {
      case 0:
        return "border-slate-800 text-slate-800 hover:bg-slate-800";
      case RapidTransitThemeType.LIGHT_GREEN:
        return "border-[#74AD46] text-[#74AD46] hover:bg-[#74AD46]";
      case RapidTransitThemeType.DARK_GREEN:
        return "border-[#325C35] text-[#325C35] hover:bg-[#325C35]";
      case RapidTransitThemeType.BLUE:
        return "border-[#365EA1] text-[#365EA1] hover:bg-[#365EA1]";
      case RapidTransitThemeType.PURPLE:
        return "border-[#65327C] text-[#65327C] hover:bg-[#65327C]";
      case RapidTransitThemeType.ARL_COLOR:
        return "border-[#E75656] text-[#E75656] hover:bg-[#E75656]";
      case RapidTransitThemeType.GOLD:
        return "border-[#CD9934] text-[#CD9934] hover:bg-[#CD9934]";
      case RapidTransitThemeType.DARK_RED:
        return "border-[#F60723] text-[#F60723] hover:bg-[#F60723]";
      case RapidTransitThemeType.LIGHT_RED:
        return "border-[#D76A6C] text-[#D76A6C] hover:bg-[#D76A6C]";
    }
  };
  const btnCurrentTypeThemeFunc = (type: number, index:number) => {
    if(type == index) {
        switch (type) {
            case 0:
              return "text-white text-white bg-slate-800";
            case RapidTransitThemeType.LIGHT_GREEN:
              return "text-white  bg-[#74AD46]";
            case RapidTransitThemeType.DARK_GREEN:
              return "text-white  bg-[#325C35]";
            case RapidTransitThemeType.BLUE:
              return "text-white  bg-[#365EA1]";
            case RapidTransitThemeType.PURPLE:
              return "text-white  bg-[#65327C]";
            case RapidTransitThemeType.ARL_COLOR:
              return "text-white  bg-[#E75656]";
            case RapidTransitThemeType.GOLD:
              return "text-white  bg-[#CD9934]";
            case RapidTransitThemeType.DARK_RED:
              return "text-white  bg-[#F60723]";
            case RapidTransitThemeType.LIGHT_RED:
              return "text-white  bg-[#D76A6C]";
          }
        };
    }
  
  return (
    <>
      <div
        className=" flex justify-center gap-2 flex-wrap p-2 mb-10 
"
      >
        {stationTypeList.map((item: any, index: number) => (
          <button
            key={`station-type-${index}`}
            className={`${btnBgThemeFunc(
              index
            )}  ${btnCurrentTypeThemeFunc(index, currentType)} border-2  opacity-100  hover:text-white font-bold py-2 px-4 rounded-full`}
            onClick={() => filterTypeHandler(index)}
          >
            {item.typeName}
          </button>
        ))}
      </div>
    </>
  );
};
