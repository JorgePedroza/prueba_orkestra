<template>
  <StreamBarcodeReader
    @decode="onDecode"
    @loaded="onLoaded"
  ></StreamBarcodeReader>
</template>

<script>
import { ref, defineComponent } from "vue"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"

import { StreamBarcodeReader } from "vue-barcode-reader"

import { useProductosStore } from "../stores/productos"

export default defineComponent({
  components: {
    StreamBarcodeReader
  },
  setup() {
    const useProductos = useProductosStore()
    const { buscarProducto } = useProductos
    const { prouductoBuscado } = storeToRefs(useProductos)

    const router = useRouter()

    const onLoaded = () => {
      console.log("loaded")
    }

    const onDecode = async (resultado) => {
      await buscarProducto(resultado)
      prouductoBuscado.value = resultado
      router.push("/")
    }

    return {
      onDecode,
      onLoaded
    }
  }
})
</script>

<style scoped></style>
