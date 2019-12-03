import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap';
import { connect } from 'react-redux' //harus ada untuk terhubung dengan global state
import { logout } from '../redux/action' //mengakses function dari action
import { Link } from 'react-router-dom'

class UserDropdown extends Component {
    
    render() {
        return (
            <UncontrolledDropdown style={{marginRight:15}}>
                <DropdownToggle caret>
                    Hi, {this.props.username}
                </DropdownToggle>
                <DropdownMenu>
                    {/* <DropdownItem header>Profile</DropdownItem> */}
                    <DropdownItem >Profile</DropdownItem>
                    <DropdownItem>Contact</DropdownItem>
                    <DropdownItem>Setting</DropdownItem>
                    {this.props.role === 'admin'
                        ?
                        <Link to='/AdminPage'>
                            <DropdownItem>My Product</DropdownItem>
                        </Link>
                        :
                        <Link to='/UserPage'>
                            <DropdownItem>My Cart <Badge color="success">0</Badge></DropdownItem>
                        </Link>
                    }
                    <DropdownItem divider />
                    <DropdownItem onClick={this.props.logout}>Logout</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username, //state.user mengarah ke reducer/index.js, state.user.username mengarah ke authreducer.js
        role: state.user.role
    }
}

export default connect(mapStatetoProps, { logout })(UserDropdown)
