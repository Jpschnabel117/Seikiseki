import { feature } from "topojson-client";

let initialState = {
    locations : {},
    worldMapData : {},
    isFetching : false,
    countries:{},
    worldGeoData : {},
};

const container = (state=initialState, action) => {
    switch (action.type){
        case 'FILL_LOCATION_DATA' : {
            const locationData = action.payload;
            const newState = Object.assign({}, {...state}, {locations:locationData});
            return newState;
        }
        case 'WORLD_MAP_DATA' : {
            const { data } = action.payload;
            const { worldMapData } = data;
            const countries = worldMapData.objects.ne_50m_admin_0_countries;
            const worldGeoData = feature(worldMapData, countries);
            const newState = Object.assign({}, {...state}, {countries:countries, worldMapData:worldMapData, worldGeoData:worldGeoData});
            return newState;

        }

        case 'TOGGLE_FETCHING' : {
            const value  = action.payload;
            console.log("flip", value.data)
            const newState = Object.assign({}, {...state}, {isFinite:value.data});
            return newState;            
        }

    default:
        return state
    }
}
export default container;