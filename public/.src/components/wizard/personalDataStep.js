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

const MONTHS = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octobre',
    'Noviembre',
    'Diciembre',
];
const WEEKDAYS_LONG = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
];

const WEEKDAYS_SHORT = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb'];

class PersonalDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: addDays(new Date(), 1),
            time: setHours( setMinutes( new Date(), 0), 8),
            datePickerOpen: false,
            dateTimeOpen: false
        };
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
    handleSubmitButton = (e, addon) => {
        e.preventDefault();
        this.props.handleStep(addon);
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
    render() {
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
                                        <Input type="text" name="name" id="fa-app-name" placeholder="Nombre y Apellido" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-email">Email</Label>
                                        <Input type="email" name="email" id="fa-app-email" placeholder="ejemplo@email.com" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-phone">Teléfono de Contacto</Label>
                                        <Input type="text" name="phone" id="fa-app-phone" placeholder="8095557777" />
                                    </FormGroup>

                                    <legend className="mt-4">Lugar de la Instalación</legend>

                                    <FormGroup>
                                        <Label for="fa-app-province">Provincia</Label>
                                        <Input type="select" name="select" id="fa-app-province">
                                            <option>Provincia 1</option>
                                            <option>Provincia 2</option>
                                            <option>Provincia 3</option>
                                            <option>Provincia 4</option>
                                            <option>Provincia 5</option>
                                        </Input>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <Label for="fa-app-address">Calle y número local o casa</Label>
                                        <Input type="text" name="address" id="fa-app-address" placeholder="local, casa o residencial" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-sector">Sector</Label>
                                        <Input type="text" name="sector" id="fa-app-sector" placeholder="Sector" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-reference">Referencia</Label>
                                        <Input type="textarea" name="name" id="fa-app-reference" placeholder="Cerca de... frente a..." />
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
                                            onChange={this.handleDateChange}
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
                                            onChange={this.handleTimeChange}
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