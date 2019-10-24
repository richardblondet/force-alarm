import React from "react";
import PropTypes from "prop-types";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
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
    Form, FormGroup, Label, Input, FormFeedback
} from "reactstrap";

const initialDataTest = {
    number: "",
    name: "",
    expiry: "", // mes/año (2 dígitos)
    cvc: "",
    issuer: "", // visa o mastercard
    focused: "",
    formData: null,
    comprobante: false,
    rnc: "",
    nombre_rnc: "",
    comprobante_fiscal: "Persona Física",
    isValid: false,
    errors: []
};

/**
 * Test cc with @see {@link https://www.easy400.net/js2/regexp/ccnums.html}
 */
class PaymentDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialDataTest;
    }
    componentDidMount() {
        let { form } = this.props;

        if( form ) {
            this.setState({
                form
            });
        } else {
            this.setState({
                form: initialDataTest
            });
        }
    }
    handleOnChange = ({ target }) => {
        let errors = [];
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }
        if( target.pattern && new RegExp(target.pattern).test(target.value) === false) {
            errors.push( target.name );
        }

        this.setState({ 
            [target.name]: target.type === "checkbox" ? target.checked : target.value,
            errors
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
        let errors = [];
        const data = [...e.target.elements].filter(d => d.name).reduce((acc, d) => {
            if (d.value === "" || !d.value || ( d.pattern && new RegExp(d.pattern).test(d.value) === false )) {
                errors.push( d.name );
            }
            acc[d.name] = d.value;
            return acc;
        }, {});
        if ( !data.issuer ) {
            errors.push("number");
        }
        if( errors.length < 1) {
            this.props.handleStep( data );
        } else {
            this.setState({ errors });
        }
    }
    render() {
        const { name, number, expiry, cvc, focused, issuer, comprobante, rnc, nombre_rnc, comprobante_fiscal, errors } = this.state;
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
                                            invalid={errors.includes("number")}
                                            title="Inserta un número de tarjeta válido"
                                        />
                                        <FormFeedback>Inserta un número de tarjeta válido</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Nombre en Tarjeta"
                                            required
                                            pattern="(^[A-Za-z ]+$)"
                                            onChange={this.handleOnChange}
                                            onFocus={this.handleInputFocus}
                                            invalid={errors.includes("name")}
                                            title="Inserta nombre de tarjeta válido"
                                        />
                                        <FormFeedback>Inserta nombre de tarjeta válido</FormFeedback>
                                    </FormGroup>
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Input
                                                    type="tel"
                                                    name="expiry"
                                                    placeholder="Expira"
                                                    pattern="\d\d/\d\d\d\d"
                                                    required
                                                    onChange={this.handleOnChange}
                                                    onFocus={this.handleInputFocus}
                                                    invalid={errors.includes("expiry")}
                                                    title="Inserta una fecha de expiración válida"
                                                />
                                                <FormFeedback>Inserta una fecha de expiración válida, formato MM/YYYY</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Input
                                                    type="tel"
                                                    name="cvc"
                                                    placeholder="CVC"
                                                    pattern="\d{3,4}"
                                                    required
                                                    onChange={this.handleOnChange}
                                                    onFocus={this.handleInputFocus}
                                                    invalid={errors.includes("cvc")}
                                                    title="Inserta código CVC válido"
                                                />
                                                <FormFeedback>Inserta código CVC válido</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <input type="hidden" name="issuer" value={issuer} onChange={this.handleOnChange} />
                                    <FormGroup>
                                        <hr />
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input 
                                                type="checkbox"
                                                name="comprobante"  
                                                onChange={this.handleOnChange}
                                            />{" "}
                                            Comprobante Fiscal
                                        </Label>
                                    </FormGroup>
                                    { comprobante && <div>
                                        <Row>
                                            <Col xs="12" sm="12">
                                                <FormGroup className="mt-3">
                                                    <Input required  
                                                    id="fa-app-comprobante_fiscal"
                                                    type="select"
                                                    name="comprobante_fiscal"
                                                    value={comprobante_fiscal}
                                                    onChange={this.handleOnChange}
                                                    title="Selecciona la provincia de tu ubicación"
                                                    >
                                                        <option>Persona Física</option>
                                                        <option>Empresa </option>
                                                        <option>Zona Franca </option>
                                                        <option>Régimen Gubernamental</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="6">
                                                <FormGroup className="mt-3">
                                                    <Input
                                                        type="number"
                                                        name="rnc"
                                                        value={rnc}
                                                        placeholder="RNC"
                                                        pattern="\d{9,11}"
                                                        required
                                                        invalid={errors.includes("rnc") ? true:false}
                                                        onChange={this.handleOnChange}
                                                        title="Inserta un RNC válido de 11 dígitos"
                                                    />
                                                    <FormFeedback>Inserta un RNC válido de 11 dígitos</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="6">
                                                <FormGroup className="mt-3">
                                                    <Input
                                                        type="text"
                                                        name="nombre_rnc"
                                                        value={nombre_rnc}
                                                        placeholder={`Nombre ${comprobante_fiscal}`}
                                                        required
                                                        onChange={this.handleOnChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>}
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

PaymentDataForm.propTypes = {
    handleBack: PropTypes.func,
    handleStep: PropTypes.func
};

export default PaymentDataForm;