// Cara dengan Class Component
import React from 'react';
import {
    Button, Card, CardImg, CardBody, CardDeck,
    CardTitle, CardSubtitle
} from 'reactstrap';
import Axios from 'axios'
import { connect } from 'react-redux'


class productCard extends React.Component {
    state = {
        data: [],
        product: [],
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
    addToCart(id) {
        console.log(id)
        Axios.get(`http://localhost:2000/dbproduct/${id}`)
            .then((res) => {
                //apa yang dilakukan pada data yang benar
                console.log('ini' + this.state.data)
                Axios.post(`http://localhost:2000/dbcart`, {
                    user:this.props.username,
                    nama_barang: res.data.nama_produk,
                    gambar_barang: res.data.gambar_produk,
                    harga_barang: parseInt(res.data.harga)
                })
                    .then((res) => {
                        console.log(res.data)
                    })
            })
            .catch((err) => {
                //apa yang dilakukan pada data yang salah
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <CardDeck >
                    {this.state.data.map((val, index) => {
                        return (
                            <Card key={val.id} body outline color="warning">
                                <CardBody style={{ width: 500, margin: "auto" }} >
                                    <CardImg top width="100%" src={val.gambar_produk} alt="Card image cap"></CardImg>
                                    <CardTitle className="h2">{val.nama_produk}</CardTitle>
                                    <CardSubtitle>IDR. {val.harga.toLocaleString()}</CardSubtitle>
                                    {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                                    {this.props.role === 'user'
                                        ?
                                        <Button color="success" onClick={() => this.addToCart(val.id)}>+ Cart</Button>
                                        :
                                        <Button>Spesification</Button>
                                    }
                                </CardBody>
                            </Card>
                        )
                    })
                    }
                </CardDeck>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username, //state.user mengarah ke reducer/index.js, state.user.username mengarah ke authreducer.js
        role: state.user.role
    }
}

export default connect(mapStatetoProps)(productCard)

// import React from 'react';
// import {
//     Button, Card, CardImg, CardBody, CardGroup,
//     CardHeader, CardSubtitle
// } from 'reactstrap';
// import { connect } from 'react-redux'
// import Axios from 'axios'

// //Cara dengan Function Component
// const productCard = (props) => {
//     return (
//         <div>
//             <CardGroup >
//                 {props.dbProduct.map((val) => {
//                     return (
//                         <Card key={val.id} >
//                                 <CardHeader className="h2">{val.nama_produk}</CardHeader>
//                             <CardBody>
//                                 <CardImg top width="100%" src={val.gambar_produk} alt="Card image cap" style={{ width:460,height: 300, margin:'auto' }}></CardImg>
//                                 <br/>
//                                 <br/>
//                                 <CardSubtitle className="h4">IDR. {val.harga.toLocaleString()}</CardSubtitle>
//                                 {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
//                                 {props.role === 'user'
//                                     ?
//                                     <Button color="success">+ Cart</Button>
//                                     :
//                                     <Button >Spesification</Button>
//                                 }
//                             </CardBody>
//                         </Card>
//                     )
//                 })
//                 }
//             </CardGroup>
//         </div>
//     );
// };

// const mapStatetoProps = (state) => {
//     return {
//         username: state.user.username, //state.user mengarah ke reducer/index.js, state.user.username mengarah ke authreducer.js
//         role: state.user.role
//     }
// }

// export default connect(mapStatetoProps)(productCard)
