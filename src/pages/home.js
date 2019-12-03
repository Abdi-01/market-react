import React, { Component } from 'react'
import ImgSlide from '../components/carousel'
import Productcard from '../components/card'
import Axios from 'axios'
// import { connect } from 'react-redux'

class Home extends Component {
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
    render() {
        return (
            <div>
                <div style={{height:550}}>
                    <ImgSlide></ImgSlide>
                </div>
                <br/>
                <div>
                    <Productcard key={this.state.data.id} dbProduct={this.state.data}></Productcard>
                </div>
            </div>
        )
    }
}

export default Home
////cek github