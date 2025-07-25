<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useProfilesStore } from "@/store";

const store = useProfilesStore();
const userId = computed(() => store.userId);
const profile = computed(() => store.getProfile(userId.value));

const router = useRouter();
const BackToLanding = () => {
  router.push("/");
};
</script>

<!-- Profile card -->
<template>
  <!--Temporary sidebar menu with navigation links-->
  <div class="ui visible sidebar vertical menu">
    <router-link to="/"><i class="home icon"></i> Home</router-link>
    <router-link to="/nail-catalog"
      ><i class="book icon"></i> Lookbook</router-link
    >
    <router-link to="/calendar"
      ><i class="calendar alternate icon"></i> Schedule an
      Appointment</router-link
    >

    <router-link to="/profile" id="profile-link"
      ><i class="user tie icon"></i> {{ profile?.fullName }}</router-link
    >
  </div>

  <!-- <div class="back-forth-container">
    <button class="back-forth-button" @click="BackToLanding">
      Back to Login
    </button>
  </div> -->

  <div class="profile-card">
    <div class="profile-container">
      <img src="/src/assets/businessCat.jpg" class="profile-pic" />

      <div class="profile-info">
        <p><span class="label">Username: </span>{{ userId }}</p>
        <p><span class="label">Full Name: </span>{{ profile.fullName }}</p>
        <p><span class="label">City of Origin: </span> {{ profile.origin }}</p>
        <p>
          <span class="label">Current City of Residence: </span>
          {{ profile.currentCity }}
        </p>
        <p v-if="profile.dualCitizen">
          <span class="label"> Dual citizen </span>
        </p>
        <img
          v-if="profile.dualCitizen"
          src="/src/assets/checkIcon.png"
          class="icon"
        />
      </div>
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
