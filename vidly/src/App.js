import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Redirect, Route, Switch } from 'react-router-dom'
import Movie from './components/Movie'
import Navbar from './components/common/Navbar'
import Customer from './components/Customer'
import Rental from './components/Rental'
import NotFound from './components/common/NotFound'
import MovieForm from './components/MovieForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {
  return (
    <div className='App'>
      <Navbar></Navbar>
      <div className='content'>
        <Switch>
          <Route path='/movies/:id' component={MovieForm} />
          <Route path='/movies' component={Movie} />
          <Route path='/customers' component={Customer} />
          <Route path='/rentals' component={Rental} />
          <Route path='/notfound' component={NotFound} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Redirect path='/' exact to='/movies' />
          <Redirect to='/notfound' />
        </Switch>
      </div>

      {/* <Movie></Movie> */}
    </div>
  )
}

export default App
