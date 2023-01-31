<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <h1>Welcome to Seller Registration</h1>
  </template>
  <script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    components: {
    },
    props: {
      headerText: {
        type: String,
        default: 'header'
      },
      list: {
        type: Array,
        default: () => {
          return []
        }
      },
      options: {
        type: Object,
        default: () => {
          return null
        }
      }
    },
    setup(props) {
      console.log("Selleer Component")
    }
  })
  </script>
  <style>
  </style>
  