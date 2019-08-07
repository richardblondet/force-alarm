import React from "react";
import styled from "styled-components";
/**
 * @see {@link https://reactdatepicker.com/}
 */
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
/**
 * @see {@link https://date-fns.org/docs/Getting-Started}
 */
import { 
    format,
    setHours,
    setMinutes,
    addDays,
    getDay
} from "date-fns";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-fix-styles.css";

registerLocale("es", es);
setDefaultLocale("es");

import {
    Container,
    Jumbotron,
    Row, Col,
    Button,
    Form, FormGroup, Label, Input, FormText
} from "reactstrap";

const PROVINCIAS = [
    'Santo Domingo',
    'Santiago',
    'Punta Cana'
];

const TODAY = new Date();

const initialDataTest = {
    name: "Richard Blondet",
    email: "developer@richardblondet.com",
    phone: "8094758085",
    address: "Calle San Juan Bautista",
    sector: "Mirador Norte",
    reference: "Frente a la casa",
    date: addDays( TODAY, 1),
    time: setHours( setMinutes( TODAY, 0), 8)
};

class PersonalDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TODAY,
            form: {
                name: "",
                email: "",
                phone: "",
                address: "",
                sector: "",
                reference: "",
                date: addDays( TODAY, 1),
                time: setHours( setMinutes( TODAY, 0), 8),
            },
            datePickerOpen: false,
            dateTimeOpen: false,
            errors: []
        };
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
    handleOnChange = (e) => {
        e.preventDefault();
        let { form } = this.state;
        form[e.target.name] = e.target.value
        this.setState({
            form
        });
    }
    handleDateChange = ( date ) => {
        let { form } = this.state;
        form.date = date;
        this.setState({
            form,
            datePickerOpen: false
        });
    }
    handleTimeChange = ( date ) => {
        let { form } = this.state; 
        form.time = date;
        this.setState({
            form,
            dateTimeOpen: false
        });
    }
    handleFocusOpenDatePicker = (e) => {
        e.preventDefault();
        this.setState({
            datePickerOpen: true
        });
    }
    handleFocusOpenTimePicker = (e) => {
        e.preventDefault();
        this.setState({
            dateTimeOpen: true
        });
    }
    handleFilterDate = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    }
    getProvincias = () => {
        return PROVINCIAS;
    }
    handleBackButton = (e) => {
        e.preventDefault();
        this.props.handleBack();
    }
    handleSubmitButton = (e) => {
        e.preventDefault();
        const { form } = this.state;
        let keys = Object.keys(form);
        let errors = [];
        for (let index = 0; index < keys.length; index++) {
            const fieldName = keys[index];
            if( "" === form[fieldName] ) {
                errors.push( fieldName );
            }
        }
        if( errors.length ) {
            this.setState({
                errors
            });
        } else { 
            // form.date = format(form.date, "dd/MM/yyyy");
            // form.time = format(form.time, "h:mm aa");
            this.props.handleStep( form );
        }
    }
    render() {
        const renderProvinciasOptions = this.getProvincias().map((provincia, indx) => {
            return <option key={`provincia-key-${indx}`}>{provincia}</option>;
        });
        const { form } = this.state;
        return (
            <React.Fragment>
                <Jumbotron tag="section" style={{backgroundColor:"white", borderRadius:"none"}}>
                    <Container fluid>
                        <Row>
                            <Col xs="12" md={{ size: 4, offset: 4 }}>
                                <Form onSubmit={this.handleSubmitButton}>
                                    <legend>Datos Personales</legend>
                                    
                                    <FormGroup>
                                        <Label for="fa-app-name">Nombre</Label>
                                        <Input required 
                                            id="fa-app-name" 
                                            type="text" 
                                            name="name" 
                                            value={form.name}
                                            onChange={this.handleOnChange}
                                            placeholder="Nombre y Apellido" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-email">Email</Label>
                                        <Input required  
                                            id="fa-app-email" 
                                            type="email" 
                                            name="email" 
                                            value={form.email}
                                            onChange={this.handleOnChange}
                                            placeholder="ejemplo@email.com" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-phone">Teléfono de Contacto</Label>
                                        <Input required  
                                            id="fa-app-phone"
                                            type="text" 
                                            name="phone" 
                                            value={form.phone}
                                            onChange={this.handleOnChange}
                                            placeholder="8095557777" />
                                    </FormGroup>

                                    <legend className="mt-4">Lugar de la Instalación</legend>

                                    <FormGroup>
                                        <Label for="fa-app-province">Provincia</Label>
                                        <Input required  
                                            id="fa-app-province"
                                            type="select" 
                                            name="province" 
                                            value={form.province}
                                            onChange={this.handleOnChange}
                                            >
                                            {renderProvinciasOptions}
                                        </Input>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <Label for="fa-app-address">Calle y número local o casa</Label>
                                        <Input required  
                                            id="fa-app-address" 
                                            type="text" 
                                            name="address" 
                                            value={form.address}
                                            onChange={this.handleOnChange}
                                            placeholder="local, casa o residencial" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-sector">Sector</Label>
                                        <Input required  
                                            id="fa-app-sector" 
                                            type="text" 
                                            name="sector" 
                                            value={form.sector}
                                            onChange={this.handleOnChange}
                                            placeholder="Sector" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-reference">Referencia</Label>
                                        <Input required  
                                            id="fa-app-reference" 
                                            type="textarea" 
                                            name="reference" 
                                            value={form.reference}
                                            onChange={this.handleOnChange}
                                            placeholder="Cerca de... frente a..." />
                                    </FormGroup>

                                    <legend className="mt-4">Fecha y día de Instalación</legend>

                                    <FormGroup>
                                        <Label for="fa-app-date">Fecha Instalación</Label>
                                        <Input required  
                                            id="fa-app-date" 
                                            type="text" 
                                            name="date" 
                                            placeholder="Seleccionar fecha" 
                                            value={format(form.date, "dd/MM/yyyy")}
                                            onChange={this.handleOnChange}
                                            onFocus={this.handleFocusOpenDatePicker} />
                                        
                                        {this.state.datePickerOpen && <DatePicker
                                            id="fa-app-date"
                                            className="form-control d-block"
                                            selected={form.date}
                                            dateFormat="dd/MM/yyyy"
                                            withPortal
                                            inline
                                            minDate={addDays(new Date(), 1)}
                                            filterDate={this.handleFilterDate}
                                            onChange={this.handleDateChange} /> 
                                        }
                                        
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-time">Hora Instalación</Label>
                                        <Input required  
                                            id="fa-app-time"
                                            type="text"
                                            name="time"
                                            placeholder="Seleccionar hora"
                                            value={format(form.time, "h:mm aa")}
                                            onChange={this.handleOnChange}
                                            onFocus={this.handleFocusOpenTimePicker} />
                                        
                                        {this.state.dateTimeOpen && <DatePicker
                                            id="fa-app-time"
                                            className="form-control"
                                            selected={form.time}
                                            onChange={this.handleTimeChange}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={60}
                                            dateFormat="h:mm aa"
                                            timeFormat="h:mm aa"
                                            withPortal
                                            inline
                                            excludeTimes={[ 
                                                setHours(setMinutes(TODAY, 0), 0), 
                                                setHours(setMinutes(TODAY, 0), 1), 
                                                setHours(setMinutes(TODAY, 0), 2), 
                                                setHours(setMinutes(TODAY, 0), 3),
                                                setHours(setMinutes(TODAY, 0), 4),
                                                setHours(setMinutes(TODAY, 0), 5),
                                                setHours(setMinutes(TODAY, 0), 6),
                                                setHours(setMinutes(TODAY, 0), 7),
                                                setHours(setMinutes(TODAY, 0), 19),
                                                setHours(setMinutes(TODAY, 0), 20),
                                                setHours(setMinutes(TODAY, 0), 21),
                                                setHours(setMinutes(TODAY, 0), 22),
                                                setHours(setMinutes(TODAY, 0), 23)
                                            ]}
                                            timeCaption="Hora" />
                                        }
                                    </FormGroup>

                                    <FormGroup check>
                                        <Label check>
                                            <Input required type="checkbox"  />{' '}
                                            Acepto los <a className="text-primary">términos y condiciones</a> de contrato.
                                        </Label>
                                    </FormGroup>

                                    <FormGroup className="mt-4">
                                        <Row>
                                            <Col>
                                                <Button onClick={this.handleBackButton} block type="button" color="secondary">Atrás</Button>
                                            </Col>
                                            <Col>
                                                <Button block type="submit" color="danger">Siguiente</Button>
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

export default PersonalDataForm;