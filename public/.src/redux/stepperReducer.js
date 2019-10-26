import constants from "../constants";

const initialState = {
  
}

const stepperReducer = (state = initialState, action) => { 
  switch( action.type ) { 
    case constants.LOADING_ON: 
    return {
        ...state,
        isLoading: true
    }
  }
}

export default stepperReducer;