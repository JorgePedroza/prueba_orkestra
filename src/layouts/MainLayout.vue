<template>
  <Navbar></Navbar>
  <router-view></router-view>
</template>

<script>
import { defineComponent, onMounted } from "vue"

import Navbar from "../components/Navbar.vue"

import { useProductosStore } from "../stores/productos"

export default defineComponent({
  components: {
    Navbar
  },
  setup() {
    const useProductos = useProductosStore()
    const { obtenerProductos } = useProductos

    onMounted(async () => {
      await obtenerProductos()
    })
  }
})
</script>

<style></style>
