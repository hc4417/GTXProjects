<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useProfilesStore} from '@/store'
import TextInputField from './components/TextInputField.vue'
import SubmitButton from './components/SubmitButton.vue'

const store = useProfilesStore()
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
const userId = computed(()=>
  store.userId
)

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
    
    <TextInputField
      label = "First Name"
      v-model = "form.firstName"
      :maxLength = "50"
      placeholder = "First Name"
    />

    <TextInputField
      label = "Last Name"
      v-model = "form.lastName"
      :maxLength = "50"
      placeholder = "Last Name"
    />

    <TextInputField
      label = "Hometown"
      v-model = "form.hometown"
      :maxLength = "100"
      placeholder = "Hometown"
    />

    <TextInputField
      label = "Current City"
      v-model = "form.currentCity"
      :maxLength = "100"
      placeholder = "Current City"
    />

    <input type = "checkbox" id = "checkbox" v-model = "checked"/>
    <label for = "checkbox"> Dual Citizenship</label> 

    <div class = "buttonContainer">
      <button @click = "clearForm">Clear</button>
      <SubmitButton
        label = "Submit"
        @click = "submitForm"
      />
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
