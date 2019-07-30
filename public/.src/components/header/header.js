import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink 
} from 'reactstrap';
import Store from "../../redux/store";

class Header extends React.Component {
    static contextType = Store;

    
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        
        this.state = {
          isOpen: false
        };
      }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        const { state } = this.context;
        const formatter = new Intl.NumberFormat('es-US', { style: "currency", currency: "USD"});
        const total = formatter.format( state.data.total || 0);

        return (
            <React.Fragment>
                <Navbar dark expand="md" style={{backgroundColor:"rgb(173, 48, 31)"}}>
                    <NavbarBrand href="/">volver</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink>Total RD {total}</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
            </React.Fragment>
        );
    }
}
export default Header;