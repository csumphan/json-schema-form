import React, { Component } from "react"
import { render } from "react-dom"
import * as deepmerge from 'deepmerge'
import axios from 'axios'
import Form from "react-jsonschema-form"
import Typeahead from '../FormWidgets/Typeahead'

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
      this.setState({
        schema: {
          definitions: newDefinitions,
          ...newSchema
        }
      })
    })
    .catch(err => {
      this.setState({ schema: { ...this.props.schema[this.props.formKey].form } })
    })
  }

  onFormChange = (formData) => {
    console.log('formdata', formData)
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
    console.log('ui', uiSchema)
    console.log('schema', this.state.schema)
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
            widgets={{
              typeahead: Typeahead
            }}
            onChange={({ formData }) => this.onFormChange(formData)}
            onSubmit={this.onSubmitForm}
            onError={onError}
            formData={this.state.formData}
            // fields={fields}
          />
        }
      </div>
    )
  }
}


export default JSONForm
