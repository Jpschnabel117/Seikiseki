let initialState = {
    locations : {},
    worldMapData : {},
    svg : ''
};

const container = (state=initialState, action) => {
    switch (action.type){
        case 'FILL_LOCATION_DATA' : {
            const locationData = action.payload;
            const newState = Object.assign({}, {...state}, {locations:locationData});
            return newState;
        }
    default:
        return state
    }
}
export default container;