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
    Form, FormGroup, Label, Input, FormText, FormFeedback,
    Alert
} from "reactstrap";

import MaskedInput from "react-text-mask";

import { getExcludeTimes } from '../../functions';

const PROVINCIAS = [
    'Santo Domingo',
    'Santiago',
    'Punta Cana'
];

const TODAY = new Date();

// const initialDataTest = {
//     name: "Richard Blondet",
//     email: "test0@richardblondet.com",
//     phone: "8094758085",
//     cedula: "001-2003899-2",
//     address: "Calle San Juan Bautista",
//     sector: "Mirador Norte",
//     reference: "Frente a la casa",
//     date: addDays( TODAY, 1),
//     time: setHours( setMinutes( TODAY, 0), 8)
// };

const initialDataTest = {
    cedula: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    sector: "",
    reference: "",
    date: addDays( TODAY, 1),
    time: setHours( setMinutes( TODAY, 0), 9),
}

class PersonalDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TODAY,
            form: initialDataTest,
            datePickerOpen: false,
            dateTimeOpen: false,
            errors: [],
            bockedDateList: [],
            excludeTime: []
        };
    }
    componentDidMount() {
        let { form, bockedDateList } = this.props;
        let excludeTimesList = getExcludeTimes();

        bockedDateList.forEach(bocked => {
                console.log('bocked', bocked);
                const { id, count } = bocked;
                if(id === '9:00 am' &&  count >= 3) {
                    excludeTimesList.push(setHours(setMinutes(TODAY, 0), 9))
                } else if (id === '11:00 am' &&  count >= 3) {
                    excludeTimesList.push(setHours(setMinutes(TODAY, 0), 11))                    
                } else if (id === '1:00 pm' &&  count >= 3) {
                    excludeTimesList.push(setHours(setMinutes(TODAY, 0), 13))
                } else if (id === '3:00 pm' &&  count >= 3) {
                    excludeTimesList.push(setHours(setMinutes(TODAY, 0), 15))
                } else if (id === '5:00 pm' &&  count >= 3) {
                    excludeTimesList.push(setHours(setMinutes(TODAY, 0), 17))
                } else if (id === '5:30 pm' &&  count >= 3) {
                    excludeTimesList.push(setHours(setMinutes(TODAY, 30), 17))
                }

        });

        this.setState({
            excludeTime: excludeTimesList
        });

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
        let { form, errors } = this.state;
        form[e.target.name] = e.target.value;
        errors = [];
        this.setState({
            form, errors
        });
    }
    handleDateChange = ( date ) => {
        console.log({ date });
        this.props.CheckBookedTime(date);
        let { form } = this.state;
        form.date = date;
        this.setState({
            form,
            datePickerOpen: false
        });
    }
    handleTimeChange = ( date ) => {
        let { form } = this.state;
        // match date
        date.setMonth( form.date.getMonth() );
        date.setDate( form.date.getDate() );
        form.time = date;
        console.log("date", date );
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
        return this.props.provincias || PROVINCIAS;
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
            if( "cedula" === fieldName && /(\d{1,3})-(\d{1,7})-(\d{1})/.test( form[fieldName ]) === false ) {
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
    handleTermsClick = (e) => {
        e.preventDefault();
        this.props.showTermsModal();
    }
    render() {
        const renderProvinciasOptions = this.getProvincias().map((provincia, indx) => {
            return <option key={`provincia-key-${indx}`} value={provincia}>{provincia}</option>;
        });
        const { form, errors } = this.state;
        return (
            <React.Fragment>
                <Jumbotron tag="section" style={{backgroundColor:"white", borderRadius:"none"}}>
                    <Container fluid>
                        {errors.length > 0 && <Row>
                            <Col xs="12" md={{ size: 4, offset: 4 }}>
                                <Alert color="danger">
                                    {`Debes revisar los siguientes campos: ${errors.join(", ")}.`}
                                </Alert>
                            </Col>
                        </Row>}
                        <Row>
                            <Col xs="12" md={{ size: 4, offset: 4 }}>
                                <Form onSubmit={this.handleSubmitButton}>
                                    <legend>Datos Personales</legend>
                                    
                                    <FormGroup>
                                        <Label for="fa-app-name">Nombre Completo</Label>
                                        <Input required 
                                            id="fa-app-name"
                                            type="text" 
                                            name="name" 
                                            value={form.name}
                                            onChange={this.handleOnChange}
                                            placeholder="Nombres y Apellidos"
                                            invalid={errors.includes("name") ? true:false}
                                            title="Introduce tu nombre completo"
                                             />
                                            <FormFeedback>Introduce tu nombre completo</FormFeedback>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-cedula">Cédula</Label>
                                        <MaskedInput
                                            id="fa-app-cedula"
                                            type="text" 
                                            name="cedula"
                                            mask={[
                                                /\d/, /\d/, /\d/,
                                                '-',
                                                /\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,
                                                '-',
                                                /\d/
                                            ]}
                                            className="form-control"
                                            placeholder="Introduce tu cédula de 11 dígitos"
                                            guide={false}
                                            onChange={this.handleOnChange}
                                            value={form.cedula}
                                            invalid={errors.includes("cedula") ? true:false} 
                                            required
                                            title="Introduce tu cédula de 11 dígitos"
                                            render={(ref, props) => (
                                                <Input innerRef={ref} {...props} />
                                            )} />
                                            <FormFeedback>Introduce tu cédula de 11 dígitos</FormFeedback>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-email">Email</Label>
                                        <Input required  
                                            id="fa-app-email" 
                                            type="email" 
                                            name="email" 
                                            value={form.email}
                                            onChange={this.handleOnChange}
                                            invalid={errors.includes("email") ? true:false} 
                                            title="Inserta un correo electrónico válido"
                                            placeholder="nombre@correo.com" />
                                            <FormFeedback>Inserta un correo electrónico válido</FormFeedback>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-phone">Teléfono de Contacto</Label>
                                        <MaskedInput
                                            id="fa-app-phone"
                                            type="text" 
                                            name="phone" 
                                            value={form.phone}
                                            onChange={this.handleOnChange}
                                            placeholder="(809) 555-7777"
                                            className="form-control"
                                            mask={[
                                                '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/
                                            ]}
                                            guide={false}
                                            invalid={errors.includes("phone") ? true:false} 
                                            required
                                            title="Introduce un número de contacto"
                                            render={(ref, props) => (
                                                <Input innerRef={ref} {...props} />
                                            )} />
                                            <FormFeedback>Introduce un número de contacto</FormFeedback>
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
                                            title="Selecciona la provincia de tu ubicación"
                                            invalid={errors.includes("province") ? true:false} 
                                            >
                                            <option value="">SELECCIONAR PROVINCIA</option>
                                            {renderProvinciasOptions}
                                        </Input>
                                        <FormFeedback>Selecciona la provincia de tu ubicación</FormFeedback>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <Label for="fa-app-address">Calle y número local o casa</Label>
                                        <Input required  
                                            id="fa-app-address" 
                                            type="text" 
                                            name="address" 
                                            value={form.address}
                                            title="Introduce la dirección de instalación"
                                            onChange={this.handleOnChange}
                                            invalid={errors.includes("address") ? true:false} 
                                            placeholder="local, casa o residencial" />
                                            <FormFeedback>Introduce la dirección de instalación</FormFeedback>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-sector">Sector</Label>
                                        <Input required  
                                            id="fa-app-sector" 
                                            type="text"
                                            name="sector"
                                            value={form.sector}
                                            onChange={this.handleOnChange}
                                            invalid={errors.includes("sector") ? true:false}
                                            title="Introduce tu sector"
                                            placeholder="Sector" />
                                            <FormFeedback>Introduce tu sector</FormFeedback>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="fa-app-reference">Referencia</Label>
                                        <Input required  
                                            id="fa-app-reference" 
                                            type="textarea" 
                                            name="reference" 
                                            value={form.reference}
                                            onChange={this.handleOnChange}
                                            invalid={errors.includes("reference") ? true:false}
                                            title="Introduce una referencia"
                                            placeholder="Cerca de... frente a..." />
                                            <FormFeedback>Introduce una referencia</FormFeedback>
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
                                            timeIntervals={30}
                                            dateFormat="h:mm aa"
                                            timeFormat="h:mm aa"
                                            withPortal
                                            inline
                                            excludeTimes={this.state.excludeTime}
                                            timeCaption="Hora" />
                                        }
                                    </FormGroup>

                                    <FormGroup check>
                                        <Label check>
                                            <Input required type="checkbox"  />{' '}
                                            Acepto los <a className="text-primary" onClick={this.handleTermsClick}>términos y condiciones</a> de contrato.
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