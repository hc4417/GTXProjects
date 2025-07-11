<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useProfilesStore } from "@/store";

const store = useProfilesStore();
const router = useRouter();

const userId = computed(() => store.userId);
const profile = computed(() => store.getProfile(userId.value));
const BackToLanding = () => {
  router.push("/");
};
</script>

<!-- form -->
<template>
  <div class="backForthContainer">
    <button class="backForthButton" @click="BackToLanding">
      Back to Login
    </button>
  </div>

  <div class="profile-form">
    <div class="profile-container">
      <img
        v-if="userId"
        src="/src/assets/businessCat.jpg"
        class="profile-pic"
      />

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
