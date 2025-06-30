
<template>
<div class = "login-form">
    <br>Username <br>
    <input 
    v-model = "form.username" 
    class = "fullLength" 
    placeholder = "Enter your username"
    /> 
    
    <div class = "passwordWrapper">
    <span style = "font-weight:bold;">Password</span><br>

    <input 
      :type = "password"
      v-model = "form.pswrd" 
      class = "fullLength" 
      placeholder = "Enter your password" 
    /> 
  
      <button class = "visibilityButton" @click = "toggleVisibility">{{visibility}}</button> 

    </div>
    
    <div class = "buttonContainer">
      <button @click="goToForm">Login</button>
    </div> 
</div>

</template>

<script>
import {useProfilesStore} from '@/store'

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
      password: passwordType[visPos],
      store: null
    }

  },
  created(){
    this.store = useProfilesStore()
  },
  methods:{

    goToForm(){
      if (
        this.form.username.trim() === 'hchoi@corp.globetax.com' &&
        this.form.pswrd.trim() === 'ABC123'
      ) {
        this.store.setUserId(this.form.username)
        this.$router.push('/form')

      } else if(
        this.form.username.trim() === '' ||
        this.form.pswrd.trim() === ''
      ){
        alert("Please fill out all fields.")
      }else{
        this.form.username ='';
        this.form.pswrd ='';
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