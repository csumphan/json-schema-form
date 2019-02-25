import axios from 'axios'
// import deepMap from 'deep-map'
import _ from 'lodash'

const HOST = 'http://128.195.53.163:1086'



// used to search through an object recursively replacing specific keys
// with a transformed value. (needed for deeply nested object)
const deepMap = async (obj, iterator, context) => {
    const newMap = await _.transform(obj, async (result, val, key) => {
      if (_.isObject(val)) {
        result[key] = await deepMap(val, iterator, context)
      }
      else {
        const change = await iterator.call(context, val, key, obj)
        console.log('change', change)
        if (change) {
          console.log('change2', change)
          result[key] = change[0]
          result['enum'] = change[1].enum
        }
        else {
          result[key] = val
        }
      }
    }, {})

    return newMap
}

export const get = async (path) => {

  const result = await axios({
    method: 'get',
    url: `${HOST}${path}`,
    responseType: 'application/json'
  })

  return result
}

export const post = async (path, body) => {
  const result = await axios({
    method: 'post',
    url: `${HOST}${path}`,
    responseType: 'application/json',
    contentType: 'application/json',
    data: body
  })

  return result
}

//takes the object value from the key form (schema)
//uses the type to get path
export const getTypes = async (schema, formKey) => {
  const supportedTypes = Object.keys(schema)

  const newSchema = { ...schema[formKey].form }

  for (let key in newSchema.properties) {
    if (supportedTypes.includes(newSchema.properties[key].type)) {
      const result = await axios({
        method: 'get',
        url: `${HOST}${schema[newSchema.properties[key].type].path}`,
        responseType: 'application/json'
      })

      if (result.data && result.data.length > 0) {
        newSchema.properties[key] = {
          ...newSchema.properties[key],
          type: 'string',
          enum: result.data.map(val => val.id)
        }
      }
      else {
        delete newSchema.properties[key]
      }
    }
  }
  // console.log('endd', newSchemaProp)
  return newSchema
}

//given definitions, replace all TIPPERS specific types to a form that react-json-schema can read
export const getDefinitionTypes = async (definitions, schema, formKey) => {
  const supportedTypes = Object.keys(schema)

  let newDefinitions = {}
  const usedDefs = schema[formKey].definitionsUsed ? schema[formKey].definitionsUsed : []

  for (let i = 0; i < usedDefs.length; i++) {
    const defKey = usedDefs[i]
    newDefinitions[defKey] = {}

    for (let i in definitions[defKey].properties) {

      if (supportedTypes.includes(definitions[defKey].properties[i].type)) {

        const result = await axios({
          method: 'get',
          url: `${HOST}${schema[definitions[defKey].properties[i].type].path}`,
          responseType: 'application/json'
        })
        console.log('defres', result, `${HOST}${schema[definitions[defKey].properties[i].type].path}`)
        if (result.data && result.data.length > 0) {
          definitions[defKey].properties[i] = {
            ...definitions[defKey].properties[i],
            type: 'string',
            enum: result.data.map(val => val.id)
          }
        }
        else {
          delete definitions[defKey].properties[i]
        }
      }
      newDefinitions[defKey] = { ...definitions[defKey] }
    }
  }

  return newDefinitions
}
