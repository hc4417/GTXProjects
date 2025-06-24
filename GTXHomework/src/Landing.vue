
<template>
<div class = "form">

    Username <br>
    <input 
    v-model = "form.username" 
    class = "fullLength" 
    placeholder = "Enter your username"
    /> 

    Password <br>
    <input 
      v-model = "form.pswrd" 
      class = "fullLength" 
      placeholder = "Enter your password" 
    />    

    <div class = "buttonContainer">
      <button @click="goToForm">Login</button>
    </div> 
</div>

</template>

<script>
export default {
    data(){
    return{
      form: {
        username:'',
        pswrd:'',
      },
    }
  },
  methods:{
    goToForm(){
      if (
        this.form.username.trim() === 'hchoi@corp.globetax.com' &&
        this.form.pswrd.trim() === 'ABC123'
      ) {
        this.$router.push('/form')
      }
    },
  }      
};

</script>

<style scoped>
    
</style>