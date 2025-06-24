<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

</script>

<!-- form -->
<template> 
    <div class = "backForthContainer">
    <button class = "backForthButton" @click = "BackToLanding">Back to Login</button> 

    <button class = "backForthButton" @click = "ForwardToProfile">Go to Profile</button>
  </div>

    <div class = "form" :class="{ shake: shakeForm }">

    

    </div>

</template>

<!--Data Retrieval + Button Method-->
<script>
export default {
  data(){
    return{
      
    }
  },
  methods:{
    BackToLanding(){
      this.$router.push('/')
    },
    ForwardToProfile(){
      this.$router.push('/profile')
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
