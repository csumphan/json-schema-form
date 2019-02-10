import React, { Component } from "react"
import { render } from "react-dom"
import * as deepmerge from 'deepmerge'
import axios from 'axios'
import Form from "react-jsonschema-form"

import { getTypes } from '../../utils/api'

import ui from './uiSchema.json'
import './Form.css'

// 1. check schema for TIPPER specific types
// 2. update all invalid types to valid ones through api call


class JSONForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      schema: null
    }
  }
  componentDidMount() {
    //used to fill (custom TIPPERS types for form select field)
    getTypes(this.props.schema, this.props.formKey)
    .then(newSchema => {
      this.setState({ schema: newSchema })
    })
    .catch(err => console.log(err))
  }
  render() {
    let uiSchema = ui
    if (ui && this.props.uiSchema) {
     uiSchema = deepmerge(ui, this.props.uiSchema)
    }

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
            onChange={onChange}
            onSubmit={onSubmit}
            onError={onError}
          />
        }
      </div>
    )
  }
}


export default JSONForm
