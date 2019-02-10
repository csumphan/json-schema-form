import axios from 'axios'

const HOST = 'http://128.195.53.164:1086'

export const get = async (path) => {

  const result = await axios({
    method: 'get',
    url: `${HOST}${path}`,
    responseType: 'application/json'
  })
  
  return result
}

export const getTypes = async (schema, formKey) => {
  const supportedTypes = Object.keys(schema)

  const result = await axios({
    method: 'get',
    url: `${HOST}${schema[formKey].path}`,
    responseType: 'application/json'
  })

  const newSchema = { ...schema[formKey].form }

  for (let key in newSchema.properties) {
    if (supportedTypes.includes(newSchema.properties[key].type)) {
      newSchema.properties[key] = {
        ...newSchema.properties[key],
        type: 'string',
        enum: result.data.map(val => val.id)
      }
    }
  }

  return newSchema
}
