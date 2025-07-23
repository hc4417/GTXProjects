<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useProfilesStore } from "@/store";

const store = useProfilesStore();
const userId = computed(() => store.userId);

const router = useRouter();
const backToLanding = () => {
  router.push("/");
};

// Form setup
const form = ref({
  firstName: "",
  lastName: "",
  hometown: "",
  currentCity: "",
});
const checked = ref(false);
const favoriteFoods = ref(["Tofu stew", "Salmon", "Tom Yum"]);

// Handles form submission
const submitted = ref(false);
const submitForm = () => {
  if (
    form.value.firstName.trim() === "" ||
    form.value.lastName.trim() === "" ||
    form.value.hometown.trim() === "" ||
    form.value.currentCity.trim() === ""
  ) {
    $.toast({
      message: "Please fill out all fields before submitting.",
      showProgress: "bottom",
      classProgress: "red",
    });
    return;
  }
  submitted.value = true;
  const profile = {
    fullName: form.value.firstName + " " + form.value.lastName,
    origin: form.value.hometown,
    currentCity: form.value.currentCity,
    dualCitizen: checked.value,
  };

  // Stores login status and user's name
  store.saveProfile(userId.value, profile);
  localStorage.setItem("userName", form.value.firstName);
  localStorage.setItem("loginSuccess", "true");
  router.push("/profile");
};

// Clears form input fields
const clearForm = () => {
  form.value.firstName = "";
  form.value.lastName = "";
  form.value.hometown = "";
  form.value.currentCity = "";
  checked.value = false;
  submitted.value = false;
};
</script>

<template>
  <div class="back-forth-container">
    <button class="back-forth-button" @click="backToLanding">
      Back to Login
    </button>
  </div>

  <!-- Form, collects user information -->
  <div class="center-container">
    <div class="form">
      First Name <br />
      <input
        v-model="form.firstName"
        class="full-length"
        placeholder="First Name"
      />
      <small>{{ form.firstName.length }}/50 characters</small>

      Last Name <br />
      <input
        v-model="form.lastName"
        class="full-length"
        placeholder="Last Name"
        maxLength="50"
      />
      <small>{{ form.lastName.length }}/50 characters</small>

      Hometown <br />
      <input
        v-model="form.hometown"
        class="full-length"
        placeholder="Hometown"
      />
      <small>{{ form.hometown.length }}/100 characters</small>

      Current City <br />
      <input
        v-model="form.currentCity"
        class="full-length"
        placeholder="Current City"
      />
      <small>{{ form.currentCity.length }}/100 characters</small>

      <input type="checkbox" id="checkbox" v-model="checked" />
      <label for="checkbox"> Dual Citizenship</label>

      <div class="button-container">
        <button @click="clearForm">Clear</button>
        <button type="button" @click="submitForm">Submit</button> <br /><br />
      </div>

      <!-- Displays form input back to user-->
      <div class="results">
        Result:

        <!-- Version 1: Displays form input upon submission-->
        <!--
        <div v-if = "submitted">
          
          <p>Hi, I am {{form.firstName}} {{form.lastName}}. I am originally from {{form.hometown}}, currently residing in {{form.currentCity}}.</p>
        </div>
        -->

        <!-- Version 2: Displays form input reactively in real time, bg changes color depending on user's dual citizenship status-->
        <div :class="{ blue: !checked, orange: checked }">
          <p>
            Hi, I am {{ form.firstName }} {{ form.lastName }}. I am originally
            from {{ form.hometown }}, currently residing in
            {{ form.currentCity }}.
          </p>
        </div>
      </div>
      <br />

      <!-- Lists favorite foods from hard coded array -->
      Favorite Foods:
      <div v-if="submitted">
        <ol>
          <li v-for="(food, index) in favoriteFoods" :key="index">
            {{ food }}
          </li>
        </ol>
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
