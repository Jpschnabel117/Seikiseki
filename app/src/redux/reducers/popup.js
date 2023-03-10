const initialState = {
  isOpen: false,
  site_name: '',
};

const popup = (state=initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_POPUP': {
      const {data} = action.payload;
      let newState = {...state};
      if (state.isOpen) {
        newState = Object.assign({}, {...state}, {isOpen: !state.isOpen});
      } else {
        newState = Object.assign({}, {...state},
            {site_name: data, isOpen: !state.isOpen});
      }
      return newState;
    }


    default:
      return state;
  }
};
export default popup;
