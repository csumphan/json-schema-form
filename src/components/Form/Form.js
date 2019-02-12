import React, { Component } from "react"
import { render } from "react-dom"
import * as deepmerge from 'deepmerge'
import axios from 'axios'
import Form from "react-jsonschema-form"
// import { withRouter } from 'react-router-dom'

import { getTypes, getDefinitionTypes, post } from '../../utils/api'

import ui from './uiSchema.json'
import './Form.css'

// 1. check schema for TIPPER specific types
// 2. update all invalid types to valid ones through api call


class JSONForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      schema: null,
      formData: this.props.formData
    }
  }
  componentDidMount() {
    //used to fill (custom TIPPERS types for form select field)
    Promise.all([getTypes(this.props.schema, this.props.formKey), getDefinitionTypes(this.props.definitions, this.props.schema, this.props.formKey)])
    .then(([newSchema, newDefinitions]) => {
      this.setState({ schema: { definitions: newDefinitions, ...newSchema }})
    })
    .catch(err => {
      this.setState({ schema: { ...this.props.schema[this.props.formKey].form } })
    })
  }

  onFormChange = (formData) => {
    this.setState({ formData: formData })
  }

  onSubmitForm = () => {
    const body = {
      users: [this.state.formData]
    }

    post(this.props.schema[this.props.formKey].path, [this.state.formData])
    .then(() => {
      this.props.history.push(`/${this.props.formKey}`)
    })
  }

  render() {
    let uiSchema = ui
    if (ui && this.props.uiSchema) {
     uiSchema = deepmerge(ui, this.props.uiSchema)
    }
    console.log('form', this.state.formData)
    const { onChange, onSubmit, onError } = this.props
    return (
      <div>
        {
          !this.state.schema
          ?
          null
          :
          <Form
            className='form'
            schema={this.state.schema}
            uiSchema={uiSchema}
            onChange={({ formData }) => this.onFormChange(formData)}
            onSubmit={this.onSubmitForm}
            onError={onError}
            formData={this.state.formData}
          />
        }
      </div>
    )
  }
}


export default JSONForm
