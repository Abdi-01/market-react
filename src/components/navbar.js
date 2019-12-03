import React from 'react'
import {
    // Button,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginPopUp from './loginpopUp'
// import RegisPopUp from './registerPopUp'
import UserDropdown from './dropdown'

class Header extends React.Component {
    state = {
        isOpen: false
    };
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Link className="navbar-brand mb-0 h1" to='/'>
                    <img src="https://pbs.twimg.com/profile_images/3316493842/a58ce0bd8ef2884c36f3071f06e953a7_400x400.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
                        Market Cube
                        <NavbarToggler onClick={this.toggle} />
                    </Link>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                {/* <RegisPopUp></RegisPopUp> */}
                            </NavItem>
                        </Nav>
                    </Collapse>
                    {this.props.username
                        ?
                        <UserDropdown></UserDropdown>
                        :
                        <LoginPopUp></LoginPopUp>
                    }
                </Navbar>
            </div >
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username,
        role: state.user.role
    }
}

export default connect(mapStatetoProps)(Header)