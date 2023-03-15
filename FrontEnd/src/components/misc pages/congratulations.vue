<template>

<div class="congrats">
<img src="../../assets/congrats_crackers.gif" />
</div>
<h1 class="congrats">Congratulations!</h1>            

<br/>
<br/>
<div class="center">
<FormKit type="button" 
label="Go to payment page"
style="background-color: seagreen"
@click="goToPayment"
/>
<FormKit type="button"
label="Cancel payment"
style="background-color: red"
@click="goToHomepage"
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
      goToPayment() {
        router.push("/error");
      },
      goToHomepage(){
        router.push("/home");
      }
    },
  });

  </script>
  
  <style>
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

.parent_sect {
  display: grid;
  grid-template-columns: 
  1fr 1fr 1fr;
}
  
  </style>