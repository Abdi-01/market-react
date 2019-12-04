import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Toast, ToastBody, ToastHeader, Spinner } from 'reactstrap';
import { connect } from 'react-redux'
import { login } from '../redux/action'
import Axios from 'axios'

class RegisPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            num: false,
            spec: false,
            show: false,
            char: false,
            border: false
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    regisUser = () => {
        let { char, spec, num } = this.state
        var username = this.text.value
        var password = this.pass.value
        var confpassword = this.confpass.value
        if (password !== confpassword) {
            alert('Invalid Password Confirmation')
        }
        else {
            Axios.get(`http://localhost:2000/dbuser?username=${username}`)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.length !== 0) {
                        alert('Username has been taken')
                    }
                    else {
                        if (char && spec && num) {
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
                                            this.props.login(res.data)///direct langsung ke login
                                        })
                                    // this.componentDidMount()//update pages dengan panggil fungsi get cara 2
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                    }

                })
        }
    }
    //onchange, menjalankan fungsi setiap update isi
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

    ///cek password
    handleChange = (e) => {
        let pass = e.target.value
        let num = /[0-9]/
        let spec = /[$#@!%^&*()]/
        this.setState({
            num: num.test(pass),
            spec: spec.test(pass),
            char: pass.length > 7,
            border: (num.test(pass) && spec.test(pass) && pass.length > 7)
        })
    }
    showReq = () => {
        this.setState({ show: true })
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
                                <Input type="password" name="password" innerRef={(pass) => this.pass = pass} onChange={this.handleChange} id="examplePassword" placeholder="Password" minLength="8" ref='Rpassword' />
                                <Input type="password" name="password" innerRef={(confpass) => this.confpass = confpass} id="confPassword" placeholder="Confirmation Password" ref='Rpassword' />
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

const mapStateToProps = (state) => {
    return{
        username: state.user.username
    }
}

export default connect(mapStateToProps, { login })(RegisPopUp)