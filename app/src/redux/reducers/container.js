import {feature} from 'topojson-client';

const initialState = {
  locations: {},
  worldMapData: {},
  isFetchingWorldGeoData: false,
  isFetchingLaunchSites: false,
  isFetchingLaunches: false,
  countries: {},
  worldGeoData: {},
  timeLineDateStart: -220906800, // Jan 01 1963
  timeLineDateEnd: 4102452000, // Jan 01 1983
  brushTimeStart: -220906799, // Jan 01 1963 ---v one year
  brushTimeEnd: -189370800, // Jan 01 1964
  launchIndexBrushed: {},
  launchIndex: {},
  launchArray: [],
};

const container = (state = initialState, action) => {
  switch (action.type) {
    case 'FILL_LAUNCH_ARRAY': {
      const {data} = action.payload;
      const launchArray = data;
      const newState = Object.assign(
          {},
          {...state},
          {launchArray: launchArray},
      );
      return newState;
    }
    case 'FILL_LAUNCH_INDEX': {
      const {data} = action.payload;
      const launchIndex = data;
      const newState = Object.assign(
          {},
          {...state},
          {launchIndex: launchIndex},
      );
      return newState;
    }
    case 'FILL_LAUNCH_INDEX_BRUSHED': {
      const {data} = action.payload;
      const launchIndexBrushed = data;
      const newState = Object.assign(
          {},
          {...state},
          {launchIndexBrushed: launchIndexBrushed},
      );
      return newState;
    }
    case 'FILL_LOCATION_DATA': {
      const {data} = action.payload;
      const locations = data.locations;
      const newState = Object.assign(
          {},
          {...state},
          {locations: locations},
      );
      return newState;
    }
    case 'WORLD_MAP_DATA': {
      const {data} = action.payload;
      const {worldMapData} = data;
      const countries = worldMapData.objects.ne_50m_admin_0_countries;
      const worldGeoData = feature(worldMapData, countries);
      const newState = Object.assign(
          {},
          {...state},
          {
            countries: countries,
            worldMapData: worldMapData,
            worldGeoData: worldGeoData,
          },
      );
      return newState;
    }

    case 'TOGGLE_FETCHING_WORLD_GEO_DATA': {
      const value = action.payload;
      const newState = Object.assign(
          {},
          {...state},
          {isFetchingWorldGeoData: value.data},
      );
      return newState;
    }
    case 'TOGGLE_FETCHING_LAUNCH_SITES': {
      const value = action.payload;
      const newState = Object.assign(
          {},
          {...state},
          {isFetchingLaunchSites: value.data},
      );
      return newState;
    }
    case 'TOGGLE_FETCHING_LAUNCHES': {
      const value = action.payload;
      const newState = Object.assign(
          {},
          {...state},
          {isFetchingLaunches: value.data},
      );
      return newState;
    }

    case 'CHANGE_DATE_RANGE': {
      const {data} = action.payload;

      const newState = Object.assign(
          {},
          {...state},
          {timeLineDateStart: data[0], timeLineDateEnd: data[1]},
      );
      return newState;
    }
    case 'CHANGE_BRUSH_RANGE': {
      const {data} = action.payload;
      const newState = Object.assign(
          {},
          {...state},
          {brushTimeStart: data[0], brushTimeEnd: data[1]},
      );
      return newState;
    }

    default:
      return state;
  }
};
export default container;
