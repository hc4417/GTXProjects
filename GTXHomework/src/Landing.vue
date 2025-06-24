
<template>
<div class = "form">

    Username <br>
    <input 
    v-model = "form.username" 
    class = "fullLength" 
    placeholder = "Enter your username"
    /> 
    <div>
    Password <br>
    <input 
      :type = "password"
      v-model = "form.pswrd" 
      class = "fullLength" 
      placeholder = "Enter your password" 
    /> 

    <button @click = "toggleVisibility">{{visibility}}</button>   
    </div>
    
    <div class = "buttonContainer">
      <button @click="goToForm">Login</button>
    </div> 
</div>

</template>

<script>
export default {
    data(){
    const visibilityStatus= ['show', 'hide']
    const passwordType = ["password", "text"]
    const visPos = 0
    
    return{
      form: {
        username:'',
        pswrd:'',
      },

      visibilityStatus,
      passwordType,
      visPos,
      visibility: visibilityStatus[visPos],
      password: passwordType[visPos]
      
    }

  },
  methods:{
    goToForm(){
      if (
        this.form.username.trim() === 'hchoi@corp.globetax.com' &&
        this.form.pswrd.trim() === 'ABC123'
      ) {
        this.$router.push('/form')
      } else{
        alert("Wrong username or password.")
      }
    },

    toggleVisibility(){
      this.visPos = (this.visPos + 1) % 2;
      this.visibility = this.visibilityStatus[this.visPos]
      this.password= this.passwordType[this.visPos]
    }
  }      
};

</script>

<style scoped>
    
</style>