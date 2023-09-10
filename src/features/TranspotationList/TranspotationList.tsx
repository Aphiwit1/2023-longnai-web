import { useEffect, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { KEY, SKYTRAIN_LOCATIONS } from './key';
import { Tag } from './components/Tag/Tag';
import { SuggestDestination } from './components/SuggestDestination/SuggestDestination';
import { NotFound } from './components/NotFound/NotFound';

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
        country: 'TH'
      },
    },
  });



  const [minDistance, setMinDistance] = useState<number | null>(null);
  const [minDistanceTypeName, setMinDistanceTypeName] = useState<string | null>(null);
  const [minPlaceDescription, setMinPlaceDescription] = useState({
    id: '',
    name_th: '',
    name_en: '',
    type: 0,
    type_name: '',
    have_parking: 0,
    lat: 0,
    long: 0,
  })
  const [searchValue, setSearchValue] = useState('')


  const [stationList, setStationList] = useState<Station[]>([]);

  const [filterbyType, setFilterbyType] = useState<number>(0);



  useEffect(() => {
    // Fetch place details for the first element in placePredictions array
    if (placePredictions.length) {
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails: any) => savePlaceDetailsToState(placeDetails) // Implement this function
      );
    }
  }, [placePredictions, filterbyType]);

  useEffect(() => {
    // This effect will run whenever searchValue changes

    // Call the debounced function here
    debouncedGetPlacePredictions({ input: searchValue });

    // You can also add any other actions you want to perform here

  }, [searchValue]); // Set searchValue as the dependency

  // Implement a debounce function
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
    // Extract latitude and longitude from place details
    const lat2 = placeDetails.geometry.location.lat();
    const long2 = placeDetails.geometry.location.lng();

    // Calculate the distances to Skytrain locations and store them in an array

    let distances: any

    if (filterbyType == 0) {
      distances = SKYTRAIN_LOCATIONS.map((location) => {
        const lat1 = location.lat;
        const long1 = location.long;
        const distance = calculateDistance(lat1, long1, lat2, long2);
        return { ...location, distance };
      });
    } else if (filterbyType > 0) {
      distances = SKYTRAIN_LOCATIONS.filter((location) => {
        return location.type == filterbyType
      }).map((location) => {
        const lat1 = location.lat;
        const long1 = location.long;
        const distance = calculateDistance(lat1, long1, lat2, long2);
        return { ...location, distance };
      });
    }


    console.log(distances)

    // Sort the distances array by distance (minDist to maxDist)
    distances.sort((a: any, b: any) => a.distance - b.distance);

    // Update the state with the sorted distances
    if (distances.length > 0) {
      const nearestLocation = distances[0];
      setMinDistance(nearestLocation.distance);
      setMinDistanceTypeName(nearestLocation.name_th);
      setMinPlaceDescription(nearestLocation);
      setStationList(distances)
    }
  };

  const renderItem = (item: any) => {
    // Implement your rendering logic for each prediction item
    return item.description && <SuggestDestination key={item.place_id} text={item.description} getValueSuggestion={getValueSuggestion} />;
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
    setSearchValue(text)
    console.log(searchValue)
  }

  return (
    <>
      {/* Input for autocomplete */}
      <section className='max-w-[1000px] mx-auto'>
        <h1 className="text-center font-semibold text-2xl sm:text-5xl mb-10 text-slate-800">

          <div className="mb-2 sm:mb-5">
            ค้นหา <span className="text-orange-500">สถานีรถไฟฟ้าที่ใกล้ที่สุด</span>
          </div>

          <div>
            จากสถานที่ ที่คุณต้องการ
          </div>

        </h1>

        <section className=" mx-auto mb-3">
          <input
            type="text"
            id="large-input"
            className="drop-shadow-sm rounded-xl block w-full p-4 text-gray-900 border border-gray-200 sm:text-md"
            value={searchValue} // Bind input value to the searchValue state
            onChange={(evt) => {
              // Update the searchValue state when the input changes
              setSearchValue(evt.target.value);

              // Call the debounced function here
              debouncedGetPlacePredictions({ input: evt.target.value });
            }}
            placeholder="Find place nearest..."
          />
        </section>


        {/* Loading indicator */}
        {isPlacePredictionsLoading && <div>Loading...</div>}



        {/* Render prediction items */}
        <div className="mb-5">
          {placePredictions.map((item) => renderItem(item))}
        </div>

        <div className=" flex justify-center gap-2 flex-wrap p-2">
          <button className="border-2 border-slate-700 text-slate-700  opacity-100    font-bold py-2 px-4 rounded-full" onClick={() => setFilterbyType(0)}>แสดงทั้งหมด</button>
          <button className="border-2 border-[#74AD46] text-[#74AD46]   opacity-100    font-bold py-2 px-4 rounded-full" onClick={() => setFilterbyType(1)}>BTS</button>
          <button className="border-2 border-[#325C35] text-[#325C35]  opacity-100    font-bold py-2 px-4 rounded-full" onClick={() => setFilterbyType(2)}>BTS</button>
          <button className="border-2 border-[#365EA1] text-[#365EA1]  opacity-100     font-bold py-2 px-4 rounded-full" onClick={() => setFilterbyType(3)}>MRT</button>
          <button className="border-2 border-[#65327C] text-[#65327C]  opacity-100     font-bold py-2 px-4 rounded-full" onClick={() => setFilterbyType(4)}>MRT</button>
          <button className="border-2 border-[#E75656] text-[#E75656]  opacity-100     font-bold py-2 px-4 rounded-full" onClick={() => setFilterbyType(5)}>ARL</button>
          <button className="border-2 border-[#CD9934] text-[#CD9934]  opacity-100     font-bold py-2 px-4 rounded-full" onClick={() => setFilterbyType(6)}>BTS</button>
          <button className="border-2 border-[#F60723] text-[#F60723]  opacity-100     font-bold py-2 px-4 rounded-full" onClick={() => setFilterbyType(7)}>SRTET</button>
          <button className="border-2 border-[#D76A6C] text-[#D76A6C]  opacity-100     font-bold py-2 px-4 rounded-full" onClick={() => setFilterbyType(8)}>SRT</button>
        </div>

        {/* <SuggestDestination /> */}

        {/* Display the minimum distance and type name */}

        {!minDistance && <NotFound />}

        {minDistance !== null && (
          <section className="flex  gap-2 sm:gap-5 flex-wrap justify-center">
            {stationList && stationList.map((item) => (
              <Tag detail={item} distance={minDistance} />
            ))}

          </section>
        )}
      </section>

    </>
  );
};

export default YourComponent;