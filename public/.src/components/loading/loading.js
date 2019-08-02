import React, { useContext } from "react";
import styled from "styled-components";
import spinner from "../../static/spinner.gif";
import Store from "../../redux/store";

class Loading extends React.Component {
    static contextType = Store;
    render() {
        const Container = styled.div`
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0; left: 0;
            text-align: center;
            background-color: #fff;
            z-index: 99;
            opacity: .89;
        `;

        const { state } = this.context;
        console.log("Loading Context");
        return state.isLoading && (
            <Container className="h-100 d-flex">
                <img src={spinner} width={50} className="justify-content-center align-self-center mx-auto d-block" />
            </Container>
        );
    }
};

export default Loading;