import React from "react";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
  } from "../../functions";
import {
    Container,
    Jumbotron,
    Row, Col,
    Button,
    Form, FormGroup, Label, Input, FormText
} from "reactstrap";
/**
 * Test cc with @see {@link https://www.easy400.net/js2/regexp/ccnums.html}
 */
class PaymentDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "",
            name: "",
            expiry: "", // mes/año (2 dígitos)
            cvc: "",
            issuer: "", // visa o mastercard
            focused: "",
            formData: null,
            comprobante: false,
            no_comprobante: "",
            nombre_comprobante: "",
            isValid: false
        };
    }
    handleOnChange = ({ target }) => {
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }
        this.setState({ 
            [target.name]: target.type === "checkbox" ? target.checked : target.value 
        });
    }
    handleCallback = ({ issuer }, isValid ) => {
        if( isValid ) {
            this.setState({ issuer, isValid });
        }
    }
    handleInputFocus = ({ target }) => {
        this.setState({
          focused: target.name,
        });
    }
    handleBackButton = (e) => {
        e.preventDefault();
        this.props.handleBack();
    }
    handleSubmitButton = (e) => {
        e.preventDefault();

        const data = [...e.target.elements].filter(d => d.name).reduce((acc, d) => {
            acc[d.name] = d.value;
            return acc;
        }, {});

        if( data.issuer ) {
            this.props.handleStep( data );
        }
    }
    render() {
        const { name, number, expiry, cvc, focused, issuer, comprobante, no_comprobante, nombre_comprobante } = this.state;
        return (
            <React.Fragment>
                <Jumbotron tag="section" style={{backgroundColor:"white", borderRadius:"none"}}>
                    <Container fluid>
                        <Row>
                            <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 4, offset: 4 }}>
                                <Form ref={c => (this.form = c)} onSubmit={this.handleSubmitButton}>
                                    <FormGroup className="mb-4">
                                        <Cards
                                            number={number}
                                            name={name}
                                            expiry={expiry}
                                            cvc={cvc}
                                            focused={focused}
                                            callback={this.handleCallback}
                                            issuer="visa|mastercard"
                                            locale={{
                                                valid: "Expira"
                                            }}
                                            placeholders={{ 
                                                name: "NOMBRE EN TARJETA",
                                                cvc: "CVC"
                                            }}
                                            />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="tel"
                                            name="number"
                                            placeholder="Número de Tarjeta"
                                            pattern="[\d| ]{16,22}"
                                            required
                                            onChange={this.handleOnChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Nombre en Tarjeta"
                                            required
                                            onChange={this.handleOnChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs="12" sm="6">
                                                <Input
                                                    type="tel"
                                                    name="expiry"
                                                    placeholder="Expira"
                                                    pattern="\d\d/\d\d"
                                                    required
                                                    onChange={this.handleOnChange}
                                                    onFocus={this.handleInputFocus}
                                                />
                                            </Col>
                                            <Col xs="12" sm="6">
                                                <Input
                                                    type="tel"
                                                    name="cvc"
                                                    placeholder="CVC"
                                                    pattern="\d{3,4}"
                                                    required
                                                    onChange={this.handleOnChange}
                                                    onFocus={this.handleInputFocus}
                                                />
                                            </Col>
                                        </Row>
                                        <input type="hidden" name="issuer" value={issuer} onChange={this.handleOnChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <hr />
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input 
                                                type="checkbox"
                                                name="comprobante"  
                                                onChange={this.handleOnChange}
                                            />{' '}
                                            Comprobante Fiscal
                                        </Label>
                                    </FormGroup>
                                    { comprobante && <FormGroup className="mt-3">
                                        <Row>
                                            <Col xs="12" sm="6">
                                                <Input
                                                    type="number"
                                                    name="no_comprobante"
                                                    value={no_comprobante}
                                                    placeholder="RNC"
                                                    pattern={/\d/}
                                                    required
                                                    onChange={this.handleOnChange}
                                                />
                                            </Col>
                                            <Col xs="12" sm="6">
                                                <Input
                                                    type="text"
                                                    name="nombre_comprobante"
                                                    value={nombre_comprobante}
                                                    placeholder="Entidad"
                                                    required
                                                    onChange={this.handleOnChange}
                                                />
                                            </Col>
                                        </Row> 
                                    </FormGroup> }
                                    <FormGroup className="mt-4">
                                        <Row>
                                            <Col xs="4">
                                                <Button onClick={this.handleBackButton} block type="button" color="secondary">Atrás</Button>
                                            </Col>
                                            <Col xs="8">
                                                <Button block type="submit" color="danger">Procesar Pago</Button>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Container>    
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default PaymentDataForm;