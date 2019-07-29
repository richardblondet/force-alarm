import constants from "../constants";

export const initialState = {
    data: {
        total: 0,
        province: false,
        selection: [],
        form: {},
        payment: {},
        status: ""
    },
    plans: [],
    step: 0
};

const Reducer = (state = initialState, action) => {
    
    /**
     * Simple log for our reducer
     */
    console.log("%c Reducer Action: %s", "font-weight:bold;", action.type, action );
    
    switch( action.type ) {
        
    case constants.STEP:
        return {
            ...state,
            step: action.data
        };
            
    default:
        return state;
    }
};

export default Reducer;