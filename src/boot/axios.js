import axios from 'axios'

const api = axios.create({ baseURL: 'https://dev.orkestra.mx/api' })

export { api }
