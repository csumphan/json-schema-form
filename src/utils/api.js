import axios from 'axios'

const HOST = 'http://128.195.53.163:1086'

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

      newSchema.properties[key] = {
        ...newSchema.properties[key],
        type: 'string',
        enum: result.data.map(val => val.id)
      }
    }
  }
  return newSchema
}

//given definitions, replace all TIPPERS specific types to a form that react-json-schema can read
export const getDefinitionTypes = async (definitions, schema, formKey) => {
  const supportedTypes = Object.keys(schema)

  let newDefinitions = { ...definitions }
  const usedDefs = schema[formKey].definitionsUsed ? schema[formKey].definitionsUsed : []

  for (let i = 0; i < usedDefs.length; i++) {
    const defKey = usedDefs[i]

    for (let i in newDefinitions[defKey].properties) {
      if (supportedTypes.includes(newDefinitions[defKey].properties[i].type)) {

        const result = await axios({
          method: 'get',
          url: `${HOST}${schema[newDefinitions[defKey].properties[i].type].path}`,
          responseType: 'application/json'
        })

        if (result.data.length > 0) {
          newDefinitions[defKey].properties[i] = {
            ...newDefinitions[defKey].properties[i],
            type: 'string',
            enum: result.data.map(val => val.id)
          }
        }
        else {
          delete newDefinitions[defKey].properties[i]
        }

      }
    }
  }

  return newDefinitions
}
