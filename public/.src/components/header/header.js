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
import logo from "../../static/force-alarm-logo-white.png";
import shopping_cart from "../../static/force-alarm-shopping-cart.png";
import styled from "styled-components";
import Store from "../../redux/store";

const NavLinkStyled = styled(NavLink)`
    color: #fff;
`;

const HeaderContainer = styled.div`
    background-color: #AD301F;
    color: #fff;
`;

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
        const formatter = new Intl.NumberFormat('es-US', { style: "currency", currency: "USD" });
        const total = formatter.format( state.data.total || 0);

        return (
            <React.Fragment>
                <HeaderContainer className="px-5">
                    <div className="row justify-content-between align-items-center pt-3">
                        <div className="col-4">
                            <div>
                                <img src={logo} width="175" />
                            </div>
                            <div>
                                <small>Tu seguridad en tus manos.</small>
                            </div>
                        </div>
                        <div className="col-4 text-right">
                            <span><img src={shopping_cart} width="22" /></span>
                            <span className="ml-2">{state.data.selection.length}</span>
                        </div>
                    </div>
                    <div className="row justify-content-between align-items-center pt-5 pb-3">
                        <div className="col-4">
                            <div>
                                <a className="text-white" href="/">Volver a Página Principal</a>
                            </div>
                        </div>
                        <div className="col-4 text-right h3">
                            <span className="ml-2">Total RD {total}</span>
                        </div>
                    </div>
                </HeaderContainer>
                <Navbar dark expand="md" style={{backgroundColor:""}}>
                    {/* <NavbarBrand href="/">volver</NavbarBrand> */}
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLinkStyled>Total RD {total}</NavLinkStyled>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
            </React.Fragment>
        );
    }
}
export default Header;