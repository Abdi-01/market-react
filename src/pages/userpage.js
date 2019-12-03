import React, { Component } from 'react'
import Axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// import { Link } from 'react-router-dom'

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            totalPrice: 0,
            modal: false,
            selectedId: null
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    componentDidMount() {
        Axios.get('http://localhost:2000/dbcart')
            .then((res) => {
                //apa yang dilakukan pada data yang benar
                this.setState({ data: res.data })
                console.log(this.state.data)
            })
            .catch((err) => {
                //apa yang dilakukan pada data yang salah
                console.log(err)
            })
    }
    renderDataUser = () => {
        return this.state.data.map((val, index) => {
            return (
                <tr key={val.id}>
                    <td>{index + 1}</td>
                    <td id={val.id}>{val.nama_barang}</td>
                    <td id={val.id}><img src={val.gambar_barang} alt='Gambar Produk' style={{ width: 200 }}></img></td>
                    <td id={val.id}>IDR. {val.harga_barang.toLocaleString()}</td>
                    <td id={val.id}><button className="btn btn-danger" onClick={() => this.deleteData(val.id)}>Delete</button></td>
                    {/* Jika memanggil function dengan parameter butuh callback '()=>' */}
                </tr>
            )
        })
    }

    totalCart = () => {
        var total = 0
        this.state.data.map((val, index) => {
            total += val.harga_barang
        })
        return total
    }

    checkout = () => {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>Total Paid :</ModalHeader>
                <ModalBody >
                    <h2>IDR. {this.totalCart().toLocaleString()}</h2>
                </ModalBody>
                <ModalFooter >
                    {/* <Link to='/'> */}
                    <Button color="success" onClick={this.okCheckout}>Ok</Button>
                    {/* </Link> */}
                </ModalFooter>
            </Modal>
        )
    }
    okCheckout = () => {
        this.clearCart()
        this.toggle()
    }

    clearCart = () => {
        Axios.get(`http://localhost:2000/dbcart`)
            .then((res) => {
                const dataSelect = res.data;
                this.setState({ dataSelect })
                console.log(dataSelect)
                dataSelect.forEach(val => {//fungsi untuk menghapus satu persatu
                    Axios.delete(`http://localhost:2000/dbcart/${val.id}`)
                        .then((res) => {
                            console.log(res.data)
                            Axios.get('http://localhost:2000/dbcart')//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                                .then((res) => {
                                    this.setState({ data: res.data })//untuk mengubah isi state data
                                })
                        })
                })
                // Axios.get('http://localhost:2000/dbcart')//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                //     .then((res) => {
                //         this.setState({ data: res.data })//untuk mengubah isi state data
                //     })
                // this.componentDidMount()//update pages dengan panggil fungsi get cara 2
            })
            .catch((err) => {
                console.log(err)
            })
    }

    deleteData = (id) => {
        Axios.delete(`http://localhost:2000/dbcart/${id}`)
            .then((res) => {
                const dataSelect = res.data;
                // console.log(dataSelect)
                this.setState({ dataSelect });
                console.log(dataSelect)
                Axios.get('http://localhost:2000/dbcart')//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                    .then((res) => {
                        this.setState({ data: res.data })//untuk mengubah isi state data
                    })
                // this.componentDidMount()//update pages dengan panggil fungsi get cara 2
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <p className="h2">User Cart Product</p>
                <table className="table">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Nama Produk</td>
                            <td>Gambar Produk</td>
                            <td>Harga</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDataUser()}
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Total Cart</td>
                            <td>IDR. {this.totalCart().toLocaleString()}</td>
                            <td>
                                <Button onClick={this.toggle}>Checkout</Button>
                                {this.checkout()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserPage