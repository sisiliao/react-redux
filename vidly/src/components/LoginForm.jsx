/**
 * 1. 写一个login form
 * 2. onChange to update state - done
 * 3. Conditional rendering error message - done
 * 4. Submit handler - done
 * 5. refactor form input to a component Input
 * 6. Implement validation with joi
 * 7. refactor form to a component
 */

import React from 'react'
import Form from './common/Form'
import Joi from 'joi'

class LoginForm extends Form {
  constructor(props) {
    super(props)
    this.state = {
      data: { username: '', password: '' },
      errors: {},
    }
  }

  validationKeys = {
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')),
  }

  schema = Joi.object(this.validationKeys)

  doSubmit = () => {
    console.log('Submitted......')
  }

  render() {
    const {
      data: { username, password },
      errors,
    } = this.state

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    )
  }
}

export default LoginForm
