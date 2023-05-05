<template>
  <div class="contenedor-page">
    <div class="contenedor-regresar">
      <router-link to="/" custom v-slot="{ navigate }">
        <button class="button-regresar" @click="navigate" role="link">
          <font-awesome-icon icon="fa-solid fa-arrow-left" />
          Regresar
        </button>
      </router-link>
      <div style="font-size: 2rem">
        <strong>Escanea el código</strong>
      </div>
    </div>
    <div class="contenedor-scanner">
      <CameraScanner></CameraScanner>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import CameraScanner from "../components/CameraScanner.vue"

export default defineComponent({
  components: {
    CameraScanner
  },
  setup() {
    return {
      //state
      //metods
    }
  }
})
</script>

<style></style>
