import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/home'
import AdminPage from './pages/adminpage'
import UserPage from './pages/userpage'
import Header from './components/navbar'  //harus berupa titlecase contoh Navbar bukan navbar
// import logo from './logo.svg';

class App extends Component {
  render(){
    return(
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

export default App;