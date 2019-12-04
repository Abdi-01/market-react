import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/home'
import AdminPage from './pages/adminpage'
import UserPage from './pages/userpage'
import Header from './components/navbar'  //harus berupa titlecase contoh Navbar bukan navbar
import { connect } from 'react-redux'
import { login } from './redux/action' //menjalankan agar ID login yang sudah masuk tetap ada saat direfresh
import Axios from 'axios'
// import logo from './logo.svg';

class App extends Component {

  componentDidMount() {
    let userlogin = localStorage.getItem('userlogin')
    if (userlogin) {
      console.log(userlogin)
      Axios.get(`http://localhost:2000/dbuser?username=${userlogin}`)
        .then((res) => {
          console.log(res.data)
          this.props.login(res.data[0])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  render() {
    return (
      <div>
        <Header></Header>
        <Route path='/' component={Home} exact />
        <Route path='/AdminPage' component={AdminPage} />
        <Route path='/UserPage' component={UserPage} />
        {/* <Route path='/navbar' component={Navbar} /> */}
      </div>
    )
  }
}

// const mapStatetoProps = (state) => {
//   return {
//       username: state.user.username,
//   }
// }
export default connect(null, { login })(App)