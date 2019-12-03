import React, { Component } from 'react'
import Axios from 'axios'
// import { Link } from 'react-router-dom'

class AdminPage extends Component {
    state = {
        data: [],
        selectedId: null
    }
    componentDidMount() {
        Axios.get('http://localhost:2000/dbproduct')
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

    editData = (id) => {
        console.log(id)
        this.setState({selectedId: id})
        console.log(this.state.selectedId)
    }

    renderData = () => {
        return this.state.data.map((val, index) => {
            if (this.state.selectedId === val.id) {//ketika isi dari seleectedId = val.id
                return (
                    <tr key={val.id}>
                        <td >{index + 1}</td>
                        <td ><input type="text" className="form-control" id="nama_produk" placeholder="Input Product Name" ref='namaBaru' /></td>
                        <td ><input type="text" className="form-control" id="gambar_produk" placeholder="Input Image Link" ref='gambarBaru' /></td>
                        <td ><input type="number" className="form-control" id="harga" placeholder="Input Price" ref='hargaBaru' /></td>
                        <td ><button className="btn btn-success" onClick={() => this.yesEdit(val.id)}>Yes</button>
                            &nbsp;
                        <button className="btn btn-danger" onClick={this.noEdit}>No</button></td>
                    </tr>
                )
            }
            else {
                return (
                    <tr key={val.id}>
                        <td>{index + 1}</td>
                        <td id={val.id}>{val.nama_produk}</td>
                        <td id={val.id}><img src={val.gambar_produk} alt='Gambar Produk' style={{ width: 200 }}></img></td>
                        <td id={val.id}>IDR. {val.harga.toLocaleString()}</td>
                        <td id={val.id}><button className="btn btn-success" onClick={() => this.editData(val.id)}>Edit</button>
                            &nbsp;
                        <button className="btn btn-danger" onClick={() => this.deleteData(val.id)}>Delete</button></td>
                        {/* Jika memanggil function dengan parameter butuh callback '()=>' */}
                    </tr>
                )
            }
        })
    }

    yesEdit = (id) => {
        var namaprodukBaru = this.refs.namaBaru.value
        var gambarprodukBaru = this.refs.gambarBaru.value
        var hargaBaru = this.refs.hargaBaru.value
        if (namaprodukBaru === '' || gambarprodukBaru === '' || hargaBaru === '') {
            alert('Lengkapi perubahan anda')
        }
        else {
            Axios.put(`http://localhost:2000/dbproduct/${id}`, {
                nama_produk: namaprodukBaru,
                gambar_produk: gambarprodukBaru,
                harga: parseInt(hargaBaru)
            })
                .then((res) => {
                    console.log(res.data)
                    Axios.get(`http://localhost:2000/dbproduct`)//update data
                        .then((res) => {
                            this.setState({ data: res.data, selectedId: null })
                            // this.setState({ selectedId: null })
                        })
                })
        }
    }
    noEdit = () => {
        this.setState({ selectedId: null })
        Axios.get('http://localhost:2000/dbproduct')//update data
    }
    submitData = () => {
        var namaproduk = this.refs.namaproduk.value
        var gambarproduk = this.refs.gambarproduk.value
        var hargaproduk = this.refs.hargaproduk.value
        console.log(namaproduk)
        console.log(gambarproduk)
        console.log(hargaproduk)
        Axios.post('http://localhost:2000/dbproduct', {
            nama_produk: namaproduk,
            gambar_produk: gambarproduk,
            harga: parseInt(hargaproduk)
        })
            .then((res) => {
                console.log(res.data)
                Axios.get('http://localhost:2000/dbproduct')//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                    .then((res) => {
                        this.setState({ data: res.data })//untuk mengubah isi state data
                        this.refs.namaproduk.value = ''
                        this.refs.gambarproduk.value = ''
                        this.refs.hargaproduk.value = ''
                    })
                // this.componentDidMount()//update pages dengan panggil fungsi get cara 2
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    deleteData = (id) => {
        Axios.delete(`http://localhost:2000/dbproduct/${id}`)
            .then((res) => {
                const dataSelect = res.data;
                // console.log(dataSelect)
                this.setState({ dataSelect });
                console.log(dataSelect)
                Axios.get('http://localhost:2000/dbproduct')//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
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
                <p className="h2">Market Cube Product</p>
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
                        {this.renderData()}
                        <tr>
                            <td>#</td>
                            <td>
                                <input type="text" className="form-control" id="nama_produk" placeholder="Input Product Name" ref='namaproduk' />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </td>
                            <td>
                                <input type="text" className="form-control" id="gambar_produk" placeholder="Input Image Link" ref='gambarproduk' />
                            </td>
                            <td>
                                <input type="number" className="form-control" id="harga" placeholder="Input Price" ref='hargaproduk' />
                            </td>
                            <td><button type="submit" className="btn btn-primary sizeBt" onClick={this.submitData}>Submit</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminPage