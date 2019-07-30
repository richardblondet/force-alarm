import React from "react";
import PropTypes from "prop-types";
import Reducer, { initialState } from "./reducer";

const Store = React.createContext();

/**
 * 
 * @see {@link https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c} 
 */

export const StoreProvider = (props) => {
    const { config } = props;
    const extendedState = Object.assign(initialState, config);
    const [state, dispatch] = React.useReducer(Reducer, extendedState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
StoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
    config: PropTypes.object.isRequired
};

export default Store;