<template>
    <br/>
<h1>Welcome to Bid for Good homepage!</h1>
<div class = "parent_sect">
    <FormKit type="group">
        <div>
            <FormKit type="submit" @click="route"
            label="Go to Signup">
            </FormKit>
        </div>
<div>
        <FormKit type="submit" @click="loginRedirect"
label="Go to Login Page">
</FormKit>
</div>
</FormKit>
</div>
</template>


<script lang="ts">
import {defineComponent} from 'vue'
import router from '@/router';
import { FormKit } from '@formkit/vue';
export default defineComponent({
    methods:{
        route(){
        router.push("/");
    },
    loginRedirect(){
        router.push("/login");
    }
    }
})
</script>
<style>
.parent_sect {
display: grid;
grid-template-columns: 1fr 1fr;
}
</style>