import { useEffect, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { KEY, SKYTRAIN_LOCATIONS } from "./key";
import { Tag } from "./components/Tag/Tag";
import { SuggestDestination } from "./components/SuggestDestination/SuggestDestination";
import { NotFound } from "../NotFound/NotFound";
import { FilterType } from "./components/FilterType/FilterType";
import { Loading } from "../Loading/Loading";

import { FaLocationDot } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";


interface Station {
  distance: number;
  id: string;
  name_th: string;
  name_en: string;
  type: number;
  type_name: string;
  have_parking: number;
  lat: number;
  long: number;
}

const YourComponent = () => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: KEY,
    options: {
      componentRestrictions: {
        country: "TH",
      },
    },
  });

  const [minDistance, setMinDistance] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [stationList, setStationList] = useState<Station[]>([]);
  const [filterbyType, setFilterbyType] = useState<number>(0);

  useEffect(() => {
    if (placePredictions.length) {
      console.log('placePredictions.length >>', )
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails: any) => savePlaceDetailsToState(placeDetails) // Implement this function
      );
    } 

  }, [placePredictions, filterbyType]);

  useEffect(() => {
    debouncedGetPlacePredictions({ input: searchValue });
  }, [searchValue]);

  const debounce = (func: any, delay: any) => {
    let timeoutId: any;
    return function (...args: any) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedGetPlacePredictions = debounce(getPlacePredictions, 1000);

  const savePlaceDetailsToState = (placeDetails: any) => {
    const lat2 = placeDetails.geometry.location.lat();
    const long2 = placeDetails.geometry.location.lng();

    let distances: any;
    if (filterbyType == 0) {
      distances = SKYTRAIN_LOCATIONS.map((location) => {
        const lat1 = location.lat;
        const long1 = location.long;
        const distance = calculateDistance(lat1, long1, lat2, long2);
        return { ...location, distance };
      });
    } else if (filterbyType > 0) {
      distances = SKYTRAIN_LOCATIONS.filter((location) => {
        return location.type == filterbyType;
      }).map((location) => {
        const lat1 = location.lat;
        const long1 = location.long;
        const distance = calculateDistance(lat1, long1, lat2, long2);
        return { ...location, distance };
      });
    }

    distances.sort((a: any, b: any) => a.distance - b.distance);
    if (distances.length > 0) {
      const nearestLocation = distances[0];
      setMinDistance(nearestLocation.distance);
      setStationList(distances);
    }
  };

  const renderItem = (item: any) => {
    return (
      item.description && (
        <SuggestDestination
          key={item.place_id}
          text={item.description}
          getValueSuggestion={getValueSuggestion}
        />
      )
    );
  };

  const handleFilterTypeSelection = (selectedType: any) => {
    // Do something with the selected filter type, e.g., update state
    console.log("selectedType ", selectedType);
    setFilterbyType(selectedType);
  };

  const calculateDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    // Radius of the Earth in kilometers
    const R = 6371;

    // Convert latitude and longitude from degrees to radians
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;

    // Haversine formula
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const getValueSuggestion = (text: string) => {
    setSearchValue(text);
    console.log(searchValue);
    setFilterbyType(0)
  };

  console.log("station list >>", stationList);

  return (
    <>
      {/* Input for autocomplete */}
      <section className="max-w-[1000px] mx-auto">
        <h1 className="text-center font-semibold text-2xl sm:text-5xl mb-10 text-slate-800">
          <div className="mb-2 sm:mb-5">
            ค้นหา{" "}
            <span className="text-orange-500">สถานีรถไฟฟ้าที่ใกล้ที่สุด</span>
          </div>

          <div>จากสถานที่ ที่คุณต้องการ</div>
        </h1>

        <section className="relative mx-auto mb-3">
          <input
            type="text"
            id="large-input"
            className="drop-shadow-sm rounded-xl block w-full p-4 text-gray-900 border border-gray-200 sm:text-md pr-10"
            value={searchValue} // Bind input value to the searchValue state
            onChange={(evt) => {
              // Update the searchValue state when the input changes
              setSearchValue(evt.target.value);

              // Call the debounced function here
              debouncedGetPlacePredictions({ input: evt.target.value });
            }}
            placeholder="Find place nearest..."
          />
          {!minDistance || !searchValue && (
            <div className="absolute top-4 right-3 text-2xl text-orange-500">
              <FaLocationDot />
            </div>
          )}

          {minDistance && searchValue && (
            <div
              className="absolute top-4 right-3 text-2xl text-slate-800 cursor-pointer"
              onClick={() => setSearchValue("")}
            >
              <MdCancel/>
            </div>
          )}
        </section>

        {/* Loading indicator */}
        {isPlacePredictionsLoading && (
          <>
            <Loading />
          </>
        )}

        {/* Render prediction items */}
        <div className="mb-5">
          {placePredictions.map((item) => renderItem(item))}
        </div>

           {/* Display the minimum distance and type name */}
           {!minDistance &&  !searchValue && <NotFound title="ไม่พบสถานีที่ค้นหา" description="ไม่พบสถานีรถไฟฟ้าในบริเวณที่คุณค้นหา ให้ลองค้นหาสถานที่อื่นๆ หรือตรวจสอบสถานที่หรือระยะทางอีกครั้งเพื่อหาทางที่ใกล้เคียงใหม่!" />}

        {minDistance &&  searchValue && (
          <FilterType
            filterTypeHandler={handleFilterTypeSelection}
            currentType={filterbyType}
          />
        )}



     

        {minDistance !== null && searchValue &&  (
          <section className="flex  gap-2 sm:gap-5 flex-wrap justify-center">
            {stationList &&
              stationList.slice(0, 6).filter((item:any) => {
                if(filterbyType === 0) return item
                return item.type === filterbyType
            }).map((item, index: number) => (
                <Tag detail={item} distance={minDistance} index={index} />
              ))}
          </section>
        )}

            {/* {!minDistance && !searchValue && (
              <NotFound title="ระบุสถานที่ของคุณ" description="คุณสามารถค้นหาสถานที่ที่คุณต้องการทราบว่าใกล้ระไฟฟ้าอะไร"/>
            )} */}
       
      </section>
    </>
  );
};

export default YourComponent;
