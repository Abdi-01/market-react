import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Toast, ToastBody, ToastHeader, Spinner } from 'reactstrap';
// import { connect } from 'react-redux'
// import { login } from '../redux/action'
import Axios from 'axios'

class RegisPopUp extends React.Component {
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

    regisUser = () => {
        var username = this.text.value
        var password = this.pass.value
        Axios.post('http://localhost:2000/dbuser', {
            username: username,
            password: password,
            role: 'user'
        })
            .then((res) => {
                console.log(res.data)
                Axios.get('http://localhost:2000/dbuser')//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                    .then((res) => {
                        this.setState({ data: res.data })//untuk mengubah isi state data
                    })
                // this.componentDidMount()//update pages dengan panggil fungsi get cara 2
            })
            .catch((err) => {
                console.log(err)
            })
    }

    notif = () => {
        return (<Toast>
            <ToastHeader icon={<Spinner size="sm" color="success" />}>
                Registration Successfully
        </ToastHeader>
            <ToastBody>
                Please, login your account after this!
        </ToastBody>
        </Toast>)
    }

    regisSubmit = () => {
        this.regisUser()
        this.toggle()
        this.notif()
    }

    render() {
        return (
            <div>
                <Button color="primary" className="d-inline-block align-top" onClick={this.toggle} style={{ cursor: "pointer" }}>Register</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Register Your Account</ModalHeader>
                    <ModalBody >
                        <Form>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input type="username" name="email" innerRef={(text) => this.text = text} id="exampleEmail" placeholder="Username" ref='Rusername' />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input type="password" name="password" innerRef={(pass) => this.pass = pass} id="examplePassword" placeholder="Password" ref='Rpassword' />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter >
                        <Button color="primary" onClick={this.regisSubmit}>Register</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default RegisPopUp