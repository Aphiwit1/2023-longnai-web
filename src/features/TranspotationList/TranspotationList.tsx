import { useEffect, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { KEY, SKYTRAIN_LOCATIONS } from './key';
import { Tag } from './components/Tag/Tag';
import { SuggestDestination } from './components/SuggestDestination/SuggestDestination';

const YourComponent = () => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: KEY,
  });



  const [minDistance, setMinDistance] = useState(null);
  const [minDistanceTypeName, setMinDistanceTypeName] = useState(null);
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
  }, [placePredictions]);

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

    // Calculate the distances to Skytrain locations and find the minimum
    let minDist: any = null;
    let minDistTypeName = null;

    SKYTRAIN_LOCATIONS.forEach((location) => {
      const lat1 = location.lat;
      const long1 = location.long;
      const distance = calculateDistance(lat1, long1, lat2, long2);
      if (minDist === null || distance < minDist) {
        minDist = distance;
        minDistTypeName = location.name_th;
        setMinPlaceDescription(location)
      }
    });

    setMinDistance(minDist);
    setMinDistanceTypeName(minDistTypeName);
  };

  const renderItem = (item: any) => {
    // Implement your rendering logic for each prediction item
    return item && <SuggestDestination key={item.place_id} text={item.description} />;
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

  return (
    <>
      {/* Input for autocomplete */}
      <section className='px-5 max-w-[1000px] mx-auto'>
        <section className=" mx-auto mb-3">
          <input type="text" id="large-input" className=" drop-shadow-sm rounded-xl block w-full p-4 text-gray-900 border border-gray-200  sm:text-md"
            onChange={(evt) => {
              // Call the debounced function here
              debouncedGetPlacePredictions({ input: evt.target.value });
            }}
            placeholder="Find place nearest..."
          />
        </section>


        {/* Loading indicator */}
        {isPlacePredictionsLoading && <div>Loading...</div>}

        {/* Render prediction items */}
        {placePredictions.map((item) => renderItem(item))}
        <SuggestDestination />

        {/* Display the minimum distance and type name */}
        {!minDistance && (
          <div>
            NOT FOUND
          </div>
        )}
        {minDistance !== null && (
          <section className="flex gap-2 flex-wrap justify-center">
            <Tag detail={minPlaceDescription} distance={minDistance} />
          </section>
        )}
      </section>

    </>
  );
};

export default YourComponent;