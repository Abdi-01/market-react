import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { login } from '../redux/action'
import RegisPopUp from './registerPopUp'
import Axios from 'axios'

class LoginPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false  
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    loginUser = () => {
                var username = this.text.value
                var password = this.pass.value
                if(username===''||password===''){
                    alert('Fill in all the forms')
                }
                else{
                    Axios.get(`http://localhost:2000/dbuser?username=${username}&password=${password}`,{ //tanda tanya digunakan utk mencari
                        username,
                        password
                    })
                    .then((res)=>{
                        if(res.data.length===0){
                            alert('username or password invalid')
                        }
                        else{
                            console.log(res.data)
                            this.props.login(res.data[0])//masuk authAction.js
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
            }

        render() {
            return (
                <div>
                    <div className="row">
                    <Button color="primary" onClick={this.toggle}>Login</Button>&nbsp;
                    <RegisPopUp></RegisPopUp>
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader>Login Your Account</ModalHeader>
                        <ModalBody >
                            <Form>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Input type="username" name="email" innerRef={(text) => this.text = text} id="exampleEmail" placeholder="Username" />
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Input type="password" name="password" innerRef={(pass) => this.pass = pass} id="examplePassword" placeholder="Password" />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter >
                            <Button color="primary" onClick={this.loginUser}>Login</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        }
    }

    const mapStatetoProps = (state) => {
        return {
            username: state.user.username,
            role: state.user.role
        }
    }

    export default connect(mapStatetoProps, { login })(LoginPopUp)