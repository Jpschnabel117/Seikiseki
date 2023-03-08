let initialState = {
    isOpen : false,
    site_name : "Tanegashima Space Center",
};

const popup = (state=initialState, action) => {
    switch (action.type){
        case 'TOGGLE_POPUP' : {
            const { data } = action.payload;
            let newState = { ...state }
            if(state.isOpen){
               newState = Object.assign({}, {...state}, {isOpen:!state.isOpen});
            }
            else{
              newState = Object.assign({}, {...state}, {site_name:data, isOpen:!state.isOpen})  
            }
            return newState;
        }
        case 'UPDATE_SITE_NAME' : {
            const { data } = action.payload;
            const { site_name } = data;

            const newState = Object.assign({}, {...state}, {site_name:site_name});
            return newState;
        }
       

    default:
        return state
    }
}
export default popup;