import constants from "../constants";
import { getTotal } from "./middlewares.js";

export const initialState = {
    data: {
        total: 0,
        province: false,
        selection: [],
        form: null,
        payment: {},
        status: ""
    },
    plans: [],
    step: 4,
    isLoading: false
};

const Reducer = (state = initialState, action) => {

    /**
     * Simple log for our reducer
     */
    console.log("%c Reducer Action: %s", "font-weight:bold; color: #6B5ADF;", action.type, action );
    
    switch( action.type ) {
        
    case constants.STEP:
        return {
            ...state,
            step: action.data
        };
    case constants.SELECT_PLAN: 
        return {
            ...state,
            data: {
                ...state.data,
                selection: action.data,
                total: getTotal(action.data)
            }
        }
    case constants.SET_USER_DATA: 
        return {
            ...state,
            data: {
                ...state.data,
                form: action.data
            }
        }
    case constants.LOADING_ON: 
        return {
            ...state,
            isLoading: true
        }
    case constants.LOADING_OFF:
        return {
            ...state,
            isLoading: false
        }
    default:
        return state;
    }
};

export default Reducer;