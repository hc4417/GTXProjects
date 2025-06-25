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

    <div class = "form">
        
        Username: {{userId}} <br>
        Full Name: {{profile.fullName}} <br>
        City of Origin: {{profile.origin}} <br>
        Current City of Residence: {{profile.currentCity}}


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
        profile: state => state.profiles[state.userId] || {}
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
