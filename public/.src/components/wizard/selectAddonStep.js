import React from "react";
import styled from "styled-components";
import { DropDownQty } from './DropDownQty';
import addon_image from "../../static/force-alarm-addons.png";

import {
    Container,
    Jumbotron,
    Row, 
    Col,
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    CardDeck, Card, CardBody, CardText
} from "reactstrap";

const PlanName = styled(CardText)`
color: #c32c1e;
font-size: 22px;
margin-bottom: 0px;
`;

const CenterRow = styled(Row)`
justify-content: center;
`


class SelectAddons extends React.Component {
    state = {
        isOpen: false,
        quantity: 1,
    }

    handleBackButton = (e) => {
        e.preventDefault();
        this.props.handleBack();
    }
    handleNoButton = (e) => {
        e.preventDefault();
    }
    handleAddonSelect = (e, addon) => {
        const { quantity } = this.state;
        e.preventDefault();
        this.props.handleStep(addon, quantity);
    }
    handleForwardButton = (e) => {
        e.preventDefault();
        this.props.handleForward();
    }
    getAddons = () => {
        return this.props.addons;
    }
    toggleDropdown = () => {
        this.setState(prevState => ({
          isOpen: !prevState.isOpen
        }));
      }
    
    handleItemClick = (quantity) => {
        this.setState({ quantity })
    }

    setDropdownList = (drop) => {
        this.setState((prevState) => {
            return {
                dropDownsItems: {...prevState, [drop.key]: drop.value},
            }
        })
    }

    render() {
        const addons = this.getAddons();
        console.log({ addons });
        const renderAddons = addons.map( (addon, indx) => {
            const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency:'USD' });
            const PriceFormatted = `RD${formatter.format(addon.price)}`
            
            return (
                <Col md={{ size: 8, offset: 4 }} xs={{ size: 12 }}>
                <Row>
                <Col md={3} xs={6}>
                <CenterRow>
                {/* <div className="mb-3"> */}
                <img 
                className="img-thumbnail p-4" 
                src={addon_image} style={{backgroundColor:"#691206"}} />
                {/* </div> */}
                </CenterRow>
                <CenterRow xs={12}>
                <a href="#" className="details_link">ver detalles</a>
                </CenterRow> 
                </Col>
                <Col md={5} xs={6} className="text-left">
                <Row>
                <Col>
                <Row>
                <PlanName>
                <span className="text-uppercase font-weight-bold">{addon.post_title}</span>
                </PlanName>
                <p className="my-3 h3 card-price-style">
                {PriceFormatted} <span className="car-price-description-small">/Adicionales en la renta</span>
                </p>
                </Row>
                <Row>
                <Col xs="3">
                <div className="qty-option-container">
                <p className="mb-0">Cantidad</p>
                <DropDownQty productQuantity={(quantity) => this.setState({ quantity })} />
                </div>
                </Col>
                <Col xs="8" className="pt-16">
                <Button color="danger" onClick={e=>this.handleAddonSelect(e, addon)}>Añadir al Carrito</Button>
                </Col>
                </Row>
                </Col>
                </Row>
                </Col>
                </Row>
                </Col>
                );
            });
            return (
                <React.Fragment>
                <Jumbotron tag="section" className="text-center" style={{backgroundColor:"white", borderRadius:"none"}}>
                <Container>
                <h2 className="text-center jumbotron-heading display-5 mb-4">¿Agregamos nuestro <strong>seguro contra robo</strong>?</h2>
                </Container>
                <Container fluid>
                <Row>
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                <CardDeck>
                {renderAddons}
                </CardDeck>
                <Row className="mt-4 text-center">
                <Col xs="12" md={{ size: 6, offset: 3 }}>
                <Row>
                <Col>  
                <Button block onClick={this.handleBackButton} color="secondary">Atrás</Button>
                </Col>
                <Col>
                <Button block onClick={this.handleForwardButton} color="danger">No, Continuemos</Button>
                </Col>
                </Row>
                </Col>
                </Row>
                </Col>
                </Row>
                </Container>    
                </Jumbotron>
                </React.Fragment>
                );
            }
        }
        
        export default SelectAddons;