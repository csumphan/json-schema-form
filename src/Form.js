import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios'

import Form from "react-jsonschema-form";

import './Form.css'

const uiSchema = {
  "firstName": {
    "ui:autofocus": true,
    "ui:emptyValue": ""
  },
  "age": {
    "ui:widget": "updown",
    "ui:title": "Age of person",
    "ui:description": "(earthian year)"
  },
  "bio": {
    "ui:widget": "textarea"
  },
  "password": {
    "ui:widget": "password",
    "ui:help": "Hint: Make it strong!"
  },
  "date": {
    "ui:widget": "alt-datetime"
  },
  "telephone": {
    "ui:options": {
      "inputType": "tel"
    }
  }
}

const HOST = 'http://128.195.53.164:1086'

class JSONForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      schema: null
    }
  }
  componentDidMount() {
    axios({
      method: 'get',
      url: `${HOST}/spacetype`,
      responseType: 'application/json'
    })
    .then((res) => {
      const newSchema = { ...this.props.schema }

      for (let key in newSchema.properties) {
        if (newSchema.properties[key].type === 'space_types') {
          newSchema.properties[key] = {
            ...newSchema.properties[key],
            type: 'string',
            enum: res.data.map(val => val.id)
          }
        }
      }
      this.setState({schema: newSchema})
    })
  }
  render() {
    const { onChange, onSubmit, onError } = this.props
    return (
      <div>
        {
          !this.state.schema
          ?
          <p>sdf</p>
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
