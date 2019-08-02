import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Reducer, { initialState } from "./reducer";

const Store = React.createContext();

/**
 * 
 * @see {@link https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c} 
 */

const Wrapper = styled.div`
    position: relative;
`;

export const StoreProvider = (props) => {
    const { config } = props;
    const extendedState = Object.assign(initialState, config);
    const [state, dispatch] = React.useReducer(Reducer, extendedState);
    const value = { state, dispatch };
    return (
        <Store.Provider value={value}>
            <Wrapper>{props.children}</Wrapper>
        </Store.Provider>
    );
};
StoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
    config: PropTypes.object.isRequired
};

export default Store;