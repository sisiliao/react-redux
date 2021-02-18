import React, { Component } from 'react'
import Form from './common/Form'
import Joi from 'joi'
import userService from '../services/userService'
import authService from '../services/authService'

class RegisterForm extends Form {
  constructor(props) {
    super(props)
    this.state = {
      data: { username: '', password: '', name: '' },
      errors: {},
    }
  }

  validationKeys = {
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')),
    name: Joi.string()
      .regex(/^[a-zA-Z ]*$/, 'Alphabets andspace')
      .required(),
  }

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data)
      authService.loginWithJWT(response.headers['x-auth-token'])
      console.log('Successfully registered')
      window.location = '/'
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        //print error
        console.log(ex.response.data)
        return
      }
    }
  }

  schema = Joi.object(this.validationKeys)

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    )
  }
}

export default RegisterForm
