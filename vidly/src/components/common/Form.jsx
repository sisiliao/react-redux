import React, { Component } from 'react'
import Joi from 'joi'
import Input from './Input'
import Select from './Select'

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      errors: {},
    }
  }

  validate = () => {
    const options = { abortEarly: false }
    const { error } = this.schema.validate(this.state.data, options)
    if (!error) {
      return
    }
    const errors = {}
    for (let e of error.details) {
      errors[e.path] = e.message
    }
    return errors
  }

  validateProperty = ({ name, value }) => {
    const schema = Joi.object({ [name]: this.validationKeys[name] })
    const { error } = schema.validate({ [name]: value })
    return error ? (error[name] = error.details[0].message) : null
  }

  submitHandler = (e) => {
    e.preventDefault()
    const errors = this.validate()

    this.setState({ errors: errors || {} })
    if (errors) {
      console.log(errors)
      return
    }

    this.doSubmit()
  }

  changeHandler = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errorMessage = this.validateProperty(input)
    if (errorMessage) {
      errors[input.name] = errorMessage
    } else {
      delete errors[input.name]
    }

    const data = { ...this.state.data }
    data[input.name] = input.value

    this.setState({ data, errors })
  }

  renderButton = (label) => {
    return (
      <button type='submit' className='btn btn-primary'>
        {label}
      </button>
    )
  }

  renderInput = (name, label, type = 'text') => {
    const { data, errors } = this.state
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        type={type}
        error={errors[name]}
        onChange={this.changeHandler}
      ></Input>
    )
  }

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.changeHandler}
        error={errors[name]}
      />
    )
  }
}
