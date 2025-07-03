<script setup>
import {computed, ref} from 'vue'
import {useRouter } from 'vue-router'
import {useProfilesStore} from '@/store'

const store = useProfilesStore()
const router = useRouter()

const visibilityStatus = [
  'show',
  'hide'
]
const passwordType = [
  'password',
  'text'
]
const form = ref({
  username:'',
  pswrd: ''
})
const visPos = ref(0)

const goToForm = ()=>{
  if (
        form.value.username.trim() === 'hchoi@corp.globetax.com' &&
        form.value.pswrd.trim() === 'ABC123'
      ) {
        store.setUserId(form.value.username)
        router.push('/form')

      } else if(
        form.value.username.trim() === '' ||
        form.value.pswrd.trim() === ''
      ){
        alert("Please fill out all fields.")
      }else{
        form.value.username ='';
        form.value.pswrd ='';
        alert("Wrong username or password.")
      }
}
const visibility = computed(()=>
  visibilityStatus[visPos.value]
)
const password = computed(()=>
  passwordType[visPos.value]
)
const toggleVisibility = () =>{
  visPos.value = (visPos.value + 1) % 2;
}
</script>

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

<style scoped>
    
</style>