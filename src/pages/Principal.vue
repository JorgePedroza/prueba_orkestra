<template>
  <div class="contenedor-busqueda">
    <div class="contenedor-input">
      <div style="display: flex">
        <input
          v-model="prouductoBuscado"
          class="input-buscar"
          type="search"
          placeholder="Buscar producto"
        />

        <router-link to="/scan" custom v-slot="{ navigate }">
          <button class="button-scan" @click="navigate" role="link">
            <font-awesome-icon icon="fa-solid fa-barcode" />
          </button>
        </router-link>
      </div>

      <div class="contenedor-filtrado">Filtrado</div>
    </div>
  </div>

  <div class="scrolling-component" ref="scrollComponent">
    <div class="contenedor" v-for="producto in listaProductos" :key="producto">
      <div class="card">
        <div>
          <img
            :src="
              producto.images.length
                ? `${producto.images[0].path}${producto.images[0].file}`
                : imageNotFound
            "
            alt="Avatar"
            style="width: 100%"
          />
        </div>

        <div class="contendor-descripcion">
          <h2>{{ producto.product_name }}</h2>
          <h4>{{ producto.brand_name }}</h4>
          <div>{{ producto.color_name }}</div>
          <p>{{ producto.product_description }}</p>
          <span>{{
            producto.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            })
          }}</span>
          <div
            class="precio-descuento"
            v-if="producto.price_with_discount !== 0"
          >
            Descuento:{{
              producto.price_with_discount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              })
            }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="listaProductos.length === 0">
      <div align="center" style="padding-top: 10rem">
            <font-awesome-icon icon="fa-solid fa-cancel" size="4x" color="red" />
        <p style="color: red">Productos no encontrados</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch, onUnmounted } from "vue"
import { storeToRefs } from "pinia"

import { useProductosStore } from "../stores/productos"

import { imageNotFound } from "../constant/servidor"

export default defineComponent({
  components: {},
  setup() {
    const useProductos = useProductosStore()
    const { obtenerProductos, buscarProducto } = useProductos
    const { listaProductos, numeroProductos, prouductoBuscado } = storeToRefs(useProductos)

    const scrollComponent = ref(null)

    onMounted(() => {
      window.addEventListener("scroll", handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll)
    })

    const handleScroll = async () => {
      let element = scrollComponent.value
      if (element.getBoundingClientRect().bottom < window.innerHeight) {
        window.removeEventListener("scroll", handleScroll)
        numeroProductos.value = numeroProductos.value + 10
        await obtenerProductos()
        window.addEventListener("scroll", handleScroll)
      }
    }

    watch(prouductoBuscado, async (valorNuevo, valorViejo) => {
      await buscarProducto(valorNuevo)
    })

    return {
      //state
      listaProductos,
      scrollComponent,
      imageNotFound,
      //metods
      prouductoBuscado
    }
  }
})
</script>

<style>
.contenedor {
  display: flex;
  justify-content: center;
}
</style>
