<template>

    <div class="congrats">
    <img src="../../assets/error_pc_crash.gif" />
    </div>
    <h1 class="congrats" style="font-size: 75px;">Oh no!</h1>            
    <h6>The page you requested doesn't exist!</h6>
    <br/>
    <br/>
    <div class="center">
    <FormKit type="button" 
    label="Go Back"
    style="background-color: seagreen"
    @click="goBack"
    />

    </div>
      </template>
      
      <script lang="ts">
      import router from "@/router";
      import { FormKit } from "@formkit/vue";
    import { def } from "@vue/shared";
      import { defineComponent } from "vue";
      export default defineComponent({
        methods: {
          goBack() {
            router.push("/");
          },
        },
      });
    
      </script>
      
      <style scoped>
      * {
        box-sizing: border-box;
        font-family: Verdana, sans-serif;
      }
      .center{
        display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      font-size: 25px;
      margin-right: 20px;
      padding-right: 20px;
      }
    
      .congrats{
        color:salmon;
        display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      font-size: 50px;
    }
    h6{
      color:salmon;
        display: flex;
      justify-content: center;
      align-items: center;
      font-size: smaller;
    }
    
    .parent_sect {
      display: grid;
      grid-template-columns: 
      1fr 1fr;
    }
      
      </style>