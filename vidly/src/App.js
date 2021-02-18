import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Movie from './components/Movie'
import Navbar from './components/common/Navbar'
import Customer from './components/Customer'
import Rental from './components/Rental'
import NotFound from './components/common/NotFound'
import MovieForm from './components/MovieForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Logout from './components/common/Logout'
import authService from './services/authService'
import ProtectedRoute from './components/common/ProtectedRoute'

class App extends Component {
  state = { user: null }
  componentDidMount = () => {
    const user = authService.getCurrentUser()
    if (user) {
      this.setState({ user: this.mapUserToViewModel(user) })
    }
  }

  mapUserToViewModel = (user) => {
    const userModel = {
      username: user.email,
      name: user.name,
      _id: user._id,
    }
    return userModel
  }
  render() {
    const { user } = this.state
    return (
      <div className='App'>
        <Navbar user={user}></Navbar>
        <div className='content'>
          <Switch>
            <ProtectedRoute path='/movies/:id' component={MovieForm} />
            <Route path='/movies' component={Movie} />
            <Route path='/customers' component={Customer} />
            <Route path='/rentals' component={Rental} />
            <Route path='/notfound' component={NotFound} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={RegisterForm} />
            <Redirect path='/' exact to='/movies' />
            <Redirect to='/notfound' />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
