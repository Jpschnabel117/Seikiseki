export const toggleFetchingWorldGeoData = (data) => {
  return {
    type: 'TOGGLE_FETCHING_WORLD_GEO_DATA',
    payload: {data},
  };
};
export const toggleFetchingLaunchSites = (data) => {
  return {
    type: 'TOGGLE_FETCHING_LAUNCH_SITES',
    payload: {data},
  };
};
export const toggleFetchingLaunches = (data) => {
  return {
    type: 'TOGGLE_FETCHING_LAUNCHES',
    payload: {data},
  };
};
export const fillLocationData = (data) => {
  return {
    type: 'FILL_LOCATION_DATA',
    payload: {data},
  };
};
export const populateWorldMapData = (data) => {
  return {
    type: 'WORLD_MAP_DATA',
    payload: {data},
  };
};
export const togglePopup = (data) => {
  return {
    type: 'TOGGLE_POPUP',
    payload: {data},
  };
};
export const changeDateRange = (data) => {
  return {
    type: 'CHANGE_DATE_RANGE',
    payload: {data},
  };
};
export const changeBrushRange = (data) => {
  return {
    type: 'CHANGE_BRUSH_RANGE',
    payload: {data},
  };
};
export const populateLaunchIndex = (data) => {
  return {
    type: 'FILL_LAUNCH_INDEX',
    payload: {data},
  };
};
export const populateLaunchIndexBrushed = (data) => {
  return {
    type: 'FILL_LAUNCH_INDEX_BRUSHED',
    payload: {data},
  };
};
export const populateLaunchArray = (data) => {
  return {
    type: 'FILL_LAUNCH_ARRAY',
    payload: {data},
  };
};
