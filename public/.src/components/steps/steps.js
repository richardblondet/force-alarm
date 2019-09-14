import React from "react";
import styled from "styled-components";
import { Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';
import Store from "../../redux/store";
import checked from "../../static/checked.png";

const Section = styled.section`
    position: relative;
    margin-top: 1em;
    padding: ${props => props.padding ? props.padding : "0px" };
`;

const green = "#2E9842";
const pink = "#ffb1a7";
const red = "#93261b";

const NavItemStyle = styled(NavItem)`
    position: relative;
    margin: 1em 0;
    list-style: none;
    
    &:after, &:before {
        content: "";
        position: absolute;
        z-index: 1;
        height: 10px;
        background-color: #ffb1a7;
        top: 3px;
        width: 50%;

        ${({ active }) => active && `
            background-color: #93261b;
        `}
    }
    &:after {
        left: 50%;
        background-color: ${ props => props.done };
    }
    &:before {
        left: 0;
        background-color: ${ props => props.active ? green : props.done };
    }
    &:first-child:before {
        display: none;
    }
    &:last-child:after {
        display: none;
    }
    
`;
const Dot = styled.div`
    position: relative;
    width: 45px;
    height: 45px;
    display: block;
    background-color: ${ props => props.done ? "#2e9842" : "#fff" };
    top: 0;
    left: calc( 50% - 7px );
    right: auto;
    margin-top: -15px;
    margin-left: -15px;
    border-radius: 50%;
    z-index: 2;
    box-shadow: 0 3px 5px 0px #999;

    .isActive, .isDone {
        display: none;
    }
    ${({ active }) => active && `
        .isActive { display: inline-block; }
    `}
    ${({ done }) => done && `
        .isDone { display: inline-block; }
    `}

`;
const CheckMark = styled.img`
    position: absolute;
    left: 10px;
    top: 14px;
`;
const RedDot = styled.div`
    display: inline-block;
    width: 23px;
    height: 23px;
    background: #93261b;
    border-radius: 50px;
    position: absolute;
    top: 11px;
    left: 11px;
`;
const StepNumber = styled.div`
    font-size: 2em;
`;
class Steps extends React.Component {
    static contextType = Store;

    getSteps = () => {
        return [
            {
                step: 0,
                title: "Dimensión de tu hogar"
            },
            {
                step: 1,
                title: "Seleccionar Plan"
            },
            {
                step: 3,
                title: "Ingresar tus datos"
            },
            {
                step: 4,
                title: "Finalizar Orden"
            }
        ];
    }

    render() {
        
        const { state } = this.context;
        const steps = this.getSteps();
        const renderSteps = steps.map((step) => {
            const isActive = step.step === state.step;
            const isDone = step.step < state.step;
            const count = step.step > 2 ? step.step : step.step + 1;
            return (
                <NavItemStyle key={`step-key-${step.step}`} active={isActive} done={isDone ? green : pink}>
                    <Dot active={isActive} done={isDone}>
                        <CheckMark className="isDone" src={checked} />
                        <RedDot className="isActive" />
                    </Dot>
                    <NavLink className="text-center h6 text-secondary font-weight-bold">
                        <StepNumber>{count}</StepNumber>
                        {step.title}
                    </NavLink>
                </NavItemStyle>
            );
        });
        return (
            <Section padding="1em 0">
                <Container fluid>
                    <Row>
                        <Col xs="12" sm={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
                            <Nav fill justified>
                                {renderSteps}
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </Section>
        );
    }
}
export default Steps;