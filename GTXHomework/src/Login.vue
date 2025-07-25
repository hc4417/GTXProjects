<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProfilesStore } from "@/store";

const store = useProfilesStore();

const router = useRouter();
const route = useRoute();
const isNestedRoute = computed(() => route.path === "/loggedIn-profile");

const form = ref({
  username: "",
  pswrd: "",
});

const loginStatus = ref(localStorage.getItem("loginSuccess") === "true");
const userName = ref(localStorage.getItem("userName"));

// Handles user logout
const logout = () => {
  localStorage.removeItem("loginSuccess");
  localStorage.removeItem("userName");
  loginStatus.value = "false";
  userName.value = "";
};

// Handles login form submission
const goToForm = () => {
  if (
    form.value.username.trim() === "hchoi@corp.globetax.com" &&
    form.value.pswrd.trim() === "ABC123"
  ) {
    store.setUserId(form.value.username);
    localStorage.setItem("userName", "Heather Choi");
    localStorage.setItem("loginSuccess", "true");
    router.push("/calendar");
  } else if (
    form.value.username.trim() === "" ||
    form.value.pswrd.trim() === ""
  ) {
    $.toast({
      position: "top center",
      message: "Please fill out all fields.",
      displayTime: 0,
    });
  } else {
    form.value.username = "";
    form.value.pswrd = "";
    $.toast({
      position: "top center",
      message: "Wrong username or password.",
      displayTime: 0,
    });
  }
};

// Toggle password visibility
const visibilityStatus = ref(false); // false = hidden password
const visibility = ref("show");
const toggleVisibility = () => {
  visibilityStatus.value = !visibilityStatus.value;
  visibility.value = visibilityStatus.value ? "hide" : "show";
};
</script>

<template>
  <!--Displays nested route component (Profile.vue)-->
  <router-view />

  <!-- Login form-->
  <div v-if="!isNestedRoute">
    <div class="ui secondary mini clearing segment" style="clear: both">
      <button class="ui red mini right floated button" @click="logout">
        Sign out
      </button>
    </div>
    <div class="center-container">
      <form class="login-form" autocomplete="autocomplete">
        <br />Username <br />
        <input
          v-model="form.username"
          class="full-length"
          autocomplete="email"
          placeholder="Enter your username"
        />

        <div class="password-wrapper">
          <span style="font-weight: bold">Password</span><br />
          <!--TODO: Change input font size to match hidden password-->
          <input
            :type="visibilityStatus ? 'text' : 'password'"
            v-model="form.pswrd"
            class="full-length"
            autocomplete="current-password"
            style="padding-right: 3rem"
            placeholder="Enter your password"
          />
          <button
            type="button"
            class="visibility-button"
            @click.prevent="toggleVisibility"
          >
            {{ visibility }}
          </button>
        </div>

        <div class="button-container">
          <router-link to="/loggedIn-profile" v-if="loginStatus"
            >Already logged in as {{ userName }}</router-link
          >
          <button @click.prevent="goToForm" class="clickable">
            Sign in
            <i class="right chevron icon"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
