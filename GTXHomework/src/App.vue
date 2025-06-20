
<!-- form -->
<template> 
  <div class = "form">

    First Name <br>
    <input v-model = "form.firstName" class = "fullLength" placeholder = "First Name"/> <br>

    Last Name <br>
    <input v-model = "form.lastName" class = "fullLength" placeholder = "Last Name"/> <br>

    Hometown <br>
    <input v-model = "form.hometown" class = "fullLength" placeholder = "Hometown"/> <br>

    Current City <br>
    <input v-model = "form.currentCity" class = "fullLength" placeholder = "Current City"/> <br><br>
    
    <input type = "checkbox" id = "checkbox" v-model = "checked"/>
    <label for = "checkbox"> Dual Citizenship</label> <br>

    <div class = "buttonContainer">
    <button @click = "Cleared">Clear</button>
    <button @click = "Submitted">Submit</button> <br><br>
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

<!--Data Retrieval + Button Method-->
<script>
export default {
  data(){
    return{
      form: {
        firstName:'',
        lastName:'',
        hometown:'',
        currentCity:''
      },

      checked: false,
      submitted:false,

      favoriteFoods: ['Tofu Stew', 'Salmon', 'Tom Yum']
    }
  },
  methods:{
    Submitted(){
      this.submitted = true
    },
    Cleared(){
      this.form.firstName ='';
      this.form.lastName ='';
      this.form.hometown ='';
      this.form.currentCity ='';
      this.checked = false;
      this.submitted = false;
    }
  }
}

</script>


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
