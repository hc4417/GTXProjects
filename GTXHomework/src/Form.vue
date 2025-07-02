<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useProfilesStore} from '@/store'

const router = useRouter()
const route = useRoute()

const form = ref({
  firstName: "",
  lastName: "",
  hometown:"",
  currentCity:""
})
const favoriteFoods = ref([
  'Tofu stew',
  'Salmon',
  'Tom Yum'
])
const checked = ref(false)
const submitted = ref(false)
const userId = computed(()=>{
  store.userId
})

const submitForm = () =>{
  if (
        form.value.firstName.trim() === '' ||
        form.value.lastName.trim() === '' ||
        form.value.hometown.trim() === '' ||
        form.value.currentCity.trim() === ''
      ) {
        alert("Please fill out all fields before submitting.");
        return;
      }

      submitted.value = true
      const profile= {
        fullName : form.value.firstName + " " + form.value.lastName,
        origin : form.value.hometown,
        currentCity: form.value.currentCity,
        dualCitizen: checked.value
      }

      store.saveProfile(userId.value, profile)
      router.push('/profile')
}
const clearForm = () =>{
    form.value.firstName ='';
    form.value.lastName ='';
    form.value.hometown ='';
    form.value.currentCity ='';
    checked.value = false;
    submitted.value = false;
}
const BackToLanding = ()=>{
  router.push('/')
}
</script>

<!-- form -->
<template> 
  <div class = "backForthContainer">
    <button class = "backForthButton" @click = "BackToLanding">Back to Login</button> 

  </div>

  <div class = "form" :class="{ shake: shakeForm }">

    First Name <br>
    <input 
    v-model = "form.firstName" 
    class = "fullLength" 
    placeholder = "First Name"
    /> 
    <small>{{form.firstName.length}}/50 characters</small>

    Last Name <br>
    <input 
      v-model = "form.lastName" 
      class = "fullLength" 
      placeholder = "Last Name" 
      maxLength = "50"
    />
    <small>{{form.lastName.length}}/50 characters</small>
     

    Hometown <br>
    <input v-model = "form.hometown" class = "fullLength" placeholder = "Hometown"/>
    <small>{{form.hometown.length}}/100 characters</small>

    Current City <br>
    <input v-model = "form.currentCity" class = "fullLength" placeholder = "Current City"/>
    <small>{{form.currentCity.length}}/100 characters</small>
    
    <input type = "checkbox" id = "checkbox" v-model = "checked"/>
    <label for = "checkbox"> Dual Citizenship</label> 

    <div class = "buttonContainer">
    <button @click = "clearForm">Clear</button>
    <button type="button" @click = "submitForm">Submit</button> <br><br>
  </div>

    <div class = "results">

      Result: 
        <!-- Version 1
        <div v-if = "submitted">
          
          <p>Hi, I am {{form.firstName}} {{form.lastName}}. I am originally from {{form.hometown}}, currently residing in {{form.currentCity}}.</p>
        </div>
        -->
        
        <!-- Version 2-->
        <div :class = "{blue: !checked, orange: checked}">
        <p>Hi, I am {{form.firstName}} {{form.lastName}}. I am originally from {{form.hometown}}, currently residing in {{form.currentCity}}.</p>
        </div>

    </div>

    <br>
    Favorite Foods: 
      <div v-if = "submitted">
        <ol>
          <li v-for = "(food, index) in favoriteFoods" :key = "index">{{food}}</li>
        </ol>
      </div>

  </div>

</template>

<!-- CSS + Conditionals -->
<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  
}

  
  
</style>
