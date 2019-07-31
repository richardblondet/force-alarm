import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
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

class PersonalDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            address: "",
            sector: "",
            date: addDays(new Date(), 1),
            time: setHours( setMinutes( new Date(), 0), 8),
            datePickerOpen: false,
            dateTimeOpen: false
        };
    }
    handleOnChange = (e) => {
        e.preventDefault();
        // console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleDateChange = ( date ) => {
        this.setState({
            date,
            datePickerOpen: false
        });
    }
    handleTimeChange = ( date ) => {
        this.setState({
            time: date,
            dateTimeOpen: false
        });
    }
    handleBackButton = (e) => {
        e.preventDefault();
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
    handleSubmitButton = (e) => {
        e.preventDefault();
        const form = this.state;
        let errors = [];
        console.log("form", form);
        for (let index = 0; index < form.length; index++) {
            const field = form[index];
            if(field === "") {
                errors.push(index);
            }
        }
        console.log("form data errors", errors );
    }
    render() {
        const renderProvinciasOptions = this.getProvincias().map((provincia, indx) => {
            return <option key={`provincia-key-${indx}`}>{provincia}</option>;
        });
        console.log(this.state);
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
                                        <Input 
                                            id="fa-app-name" 
                                            type="text" 
                                            name="name" 
                                            value={this.state.name}
                                            onChange={this.handleOnChange}
                                            placeholder="Nombre y Apellido" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-email">Email</Label>
                                        <Input  
                                            id="fa-app-email" 
                                            type="email" 
                                            name="email" 
                                            value={this.state.email}
                                            onChange={this.handleOnChange}
                                            placeholder="ejemplo@email.com" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-phone">Teléfono de Contacto</Label>
                                        <Input  
                                            id="fa-app-phone"
                                            type="text" 
                                            name="phone" 
                                            value={this.state.phone}
                                            onChange={this.handleOnChange}
                                            placeholder="8095557777" />
                                    </FormGroup>

                                    <legend className="mt-4">Lugar de la Instalación</legend>

                                    <FormGroup>
                                        <Label for="fa-app-province">Provincia</Label>
                                        <Input  
                                            id="fa-app-province"
                                            type="select" 
                                            name="province" 
                                            value={this.state.province}
                                            onChange={this.handleOnChange}
                                            >
                                            {renderProvinciasOptions}
                                        </Input>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <Label for="fa-app-address">Calle y número local o casa</Label>
                                        <Input  
                                            id="fa-app-address" 
                                            type="text" 
                                            name="address" 
                                            value={this.state.address}
                                            onChange={this.handleOnChange}
                                            placeholder="local, casa o residencial" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-sector">Sector</Label>
                                        <Input  
                                            id="fa-app-sector" 
                                            type="text" 
                                            name="sector" 
                                            value={this.state.sector}
                                            onChange={this.handleOnChange}
                                            placeholder="Sector" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-reference">Referencia</Label>
                                        <Input  
                                            id="fa-app-reference" 
                                            type="textarea" 
                                            name="reference" 
                                            value={this.state.reference}
                                            onChange={this.handleOnChange}
                                            placeholder="Cerca de... frente a..." />
                                    </FormGroup>

                                    <legend className="mt-4">Fecha y día de Instalación</legend>

                                    <FormGroup>
                                        <Label for="fa-app-date">Fecha Instalación</Label>
                                        <Input  
                                            id="fa-app-date" 
                                            type="text" 
                                            name="date" 
                                            placeholder="Seleccionar fecha" 
                                            value={format(this.state.date, "dd/MM/yyyy")}
                                            onChange={this.handleOnChange}
                                            onFocus={this.handleFocusOpenDatePicker} />
                                        
                                        {this.state.datePickerOpen && <DatePicker
                                            id="fa-app-date"
                                            className="form-control d-block"
                                            selected={this.state.date}
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
                                        <Input  
                                            id="fa-app-time"
                                            type="text"
                                            name="time"
                                            placeholder="Seleccionar hora"
                                            value={format(this.state.time, "h:mm aa")}
                                            onChange={this.handleOnChange}
                                            onFocus={this.handleFocusOpenTimePicker} />
                                        
                                        {this.state.dateTimeOpen && <DatePicker
                                            id="fa-app-time"
                                            className="form-control"
                                            selected={this.state.time}
                                            onChange={this.handleTimeChange}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={60}
                                            dateFormat="h:mm aa"
                                            timeFormat="h:mm aa"
                                            withPortal
                                            inline
                                            excludeTimes={[ 
                                                setHours(setMinutes(new Date(), 0), 0), 
                                                setHours(setMinutes(new Date(), 0), 1), 
                                                setHours(setMinutes(new Date(), 0), 2), 
                                                setHours(setMinutes(new Date(), 0), 3),
                                                setHours(setMinutes(new Date(), 0), 4),
                                                setHours(setMinutes(new Date(), 0), 5),
                                                setHours(setMinutes(new Date(), 0), 6),
                                                setHours(setMinutes(new Date(), 0), 7),
                                                setHours(setMinutes(new Date(), 0), 19),
                                                setHours(setMinutes(new Date(), 0), 20),
                                                setHours(setMinutes(new Date(), 0), 21),
                                                setHours(setMinutes(new Date(), 0), 22),
                                                setHours(setMinutes(new Date(), 0), 23)
                                            ]}
                                            timeCaption="Hora" />
                                        }
                                    </FormGroup>

                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"  />{' '}
                                            <span className="text-primary">Aceptos los términos y condiciones</span>
                                        </Label>
                                    </FormGroup>

                                    <FormGroup className="mt-4">
                                        <Row>
                                            <Col>
                                                <Button block type="button" color="secondary">Atrás</Button>
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