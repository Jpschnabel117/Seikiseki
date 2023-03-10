import { feature } from "topojson-client";

let initialState = {
  locations: {},
  worldMapData: {},
  isFetchingWorldGeoData: false,
  isFetchingLaunchSites: false,
  countries: {},
  worldGeoData: {},
  timeLineDateStart: -220906800, //Jan 01 1963
  timeLineDateEnd: 410245200, //Jan 01 1983
  brushTimeStart: -220906799, //Jan 01 1963 ---v one year
  brushTimeEnd: -189370800, //Jan 01 1964
};

const container = (state = initialState, action) => {
  switch (action.type) {
    case "FILL_LOCATION_DATA": {
      const { data } = action.payload;
      const locations = data.locations;
      console.log("data:", data);
      const newState = Object.assign(
        {},
        { ...state },
        { locations: locations }
      );
      return newState;
    }
    case "WORLD_MAP_DATA": {
      const { data } = action.payload;
      const { worldMapData } = data;
      const countries = worldMapData.objects.ne_50m_admin_0_countries;
      const worldGeoData = feature(worldMapData, countries);
      const newState = Object.assign(
        {},
        { ...state },
        {
          countries: countries,
          worldMapData: worldMapData,
          worldGeoData: worldGeoData,
        }
      );
      return newState;
    }

    case "TOGGLE_FETCHING_WORLD_GEO_DATA": {
      const value = action.payload;
      console.log("flip", value.data);
      const newState = Object.assign(
        {},
        { ...state },
        { isFetchingWorldGeoData: value.data }
      );
      return newState;
    }
    case "TOGGLE_FETCHING_LAUNCH_SITES": {
      const value = action.payload;
      console.log("flip", value.data);
      const newState = Object.assign(
        {},
        { ...state },
        { isFetchingLaunchSites: value.data }
      );
      return newState;
    }

    case "CHANGE_DATE_RANGE": {
      const {data} = action.payload;

      console.log("NEW RANGE:", data);
      const newState = Object.assign(
        {},
        { ...state },
        { timeLineDateStart: data[0], timeLineDateEnd: data[1] }
      );
      return newState;
    }

    default:
      return state;
  }
};
export default container;
