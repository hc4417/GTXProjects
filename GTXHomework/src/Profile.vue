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

    </div>

    <div class = "profile-form">
        
        <div class = "profile-container">
            <img v-if = userId src = C:\Users\hchoi\GTXProjects\Projects\GTXHomework\src\assets\businessCat.jpg class = "profile-pic">

            <div class = "profile-info">
                Username: {{userId}} <br>
                Full Name: {{profile.fullName}} <br>
                City of Origin: {{profile.origin}} <br>
                Current City of Residence: <p>{{profile.currentCity}} </p><br>
                <p v-if=profile.dualCitizen><span style = "font-weight:bold;"> Dual citizen </span></p>
                <img v-if = profile.dualCitizen src = C:\Users\hchoi\GTXProjects\Projects\GTXHomework\src\assets\checkIcon.png class = "icon">
            </div>

        </div>

    </div>

</template>

<!--Data Retrieval + Button Method-->
<script>
import { mapState } from 'vuex'

export default {
  data(){
    return{
      
    }
  },
  computed: {
        ...mapState({
        userId: state => state.userId,
        profile: state => state.profiles[state.userId]
    }),
  },
  methods:{
    BackToLanding(){
      this.$router.push('/')
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
