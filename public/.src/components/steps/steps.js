import React from "react";
import styled from "styled-components";
import { Nav, NavItem, NavLink, Container } from 'reactstrap';
import Store from "../../redux/store";

const Section = styled.section`
    position: relative;
    margin-top: 1em;
    padding: ${props => props.padding ? props.padding : "0px" };
`;
const NavItemStyle = styled(NavItem)`
    position: relative;
    margin: 1em 0;
    list-style: none;

    &:after {
        content: "";
        position: absolute;
        z-index: 1;
        height: 5px;
        width: 100%;
        background-color: ${ props => props.done ? "#93261b" : "#ffb1a7" };
        top: -2.5px;
        left: 0;
    }
    &:first-child:after {
        left: 50%;
        width: 50%;
    }
    &:last-child:after {
        left: 0;
        width: 50%;
    }
`;
const Dot = styled.a`
    position: relative;
    width: 30px;
    height: 30px;
    display: block;
    background-color: ${ props => props.done ? "#2e9842" : "#fff" };
    top: 0;
    left: 50%;
    margin-top: -15px;
    margin-left: -15px;
    border-radius: 50%;
    z-index: 2;
    box-shadow: 0 3px 5px 0px #999;

    ${({ active }) => active && `
        &:after {
            content: '';
            width: 14px;
            height: 14px;
            background: #93261b;
            border-radius: 50px;
            position: absolute;
            top: 8px;
            left: 8px;
        }
    `}
    ${({ done }) => done && `
        &:after {
            content: "\\2713";
            width: 14px;
            height: 14px;
            font-size: 20px;
            color: #fff;
            position: relative;
            top: 7px;
        }
    `}

`;
const ContainerStyled = styled(Container)`
    &:before {
        display: none;
    }
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
            return (
                <NavItemStyle key={`step-key-${step.step}`}>
                    <Dot active={step.step === state.step} done={step.step < state.step } />
                    <NavLink>
                        {step.title}
                    </NavLink>
                </NavItemStyle>
            );
        });
        return (
            <Section padding="1em 0">
                <ContainerStyled>
                    <Nav fill justified>
                        {renderSteps}
                    </Nav>
                </ContainerStyled>
            </Section>
        );
    }
}
export default Steps;