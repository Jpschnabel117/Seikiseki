export const fillLocationData = (data) => {
    return {
        type: 'FILL_LOCATION_DATA',
        payload : { data }
    };
};
export const populateWorldMapData = (data) => {
    return {
        type: 'WORLD_MAP_DATA',
        payload : { data }
    };
};
export const populateWorldMapSvg = (data) => {
    return {
        type: 'WORLD_MAP_SVG',
        payload : { data }
    };
};
