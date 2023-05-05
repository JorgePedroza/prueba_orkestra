import { defineStore } from 'pinia'
import { api } from '../boot/axios'
import { ref } from 'vue'

import { token } from '../constant/servidor'

export const useProductosStore = defineStore('productos', () => {
  const listaProductos = ref([])
  const numeroProductos = ref(10)
  const prouductoBuscado = ref('')


  const configuracion = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  const obtenerProductos = async () => {
    try {
      const { data } = await api.get(`/v1/smart-cart/products?with_selects=0&page=2&limit=${numeroProductos.value}`, configuracion)
      console.log(data)
      listaProductos.value = [...listaProductos.value, ...data.products.data]
    } catch (error) {

    }
  }

  const buscarProducto = async (producto) => {
    try {
      const { data } = await api.get(`/v1/smart-cart/products?with_selects=0&page=2&limit=10&search=${producto}`, configuracion)
      listaProductos.value = data.products.data
    } catch (error) {

    }
  }

  return {
    //state
    listaProductos,
    numeroProductos,
    prouductoBuscado,
    //metods
    obtenerProductos,
    buscarProducto
  }
})
