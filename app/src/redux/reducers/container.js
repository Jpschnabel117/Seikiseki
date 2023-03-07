let initialState = {
    locations : {},
    worldMapData : {},
    worldMapSvg : ''
};

const container = (state=initialState, action) => {
    switch (action.type){
        case 'FILL_LOCATION_DATA' : {
            const locationData = action.payload;
            const newState = Object.assign({}, {...state}, {locations:locationData});
            return newState;
        }
        case 'WORLD_MAP_DATA' : {
            const worldMapData = action.payload;
            const newState = Object.assign({}, {...state}, {worldMapData:worldMapData});
            return newState;

        }
        case 'WORLD_MAP_SVG' : {
            const worldMapSvg = action.payload;
            const newState = Object.assign({}, {...state}, {worldMapSvg:worldMapSvg});
            return newState;

        }
    default:
        return state
    }
}
export default container;