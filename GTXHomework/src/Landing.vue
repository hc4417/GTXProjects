<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProfilesStore } from "@/store";

const store = useProfilesStore();
const router = useRouter();
const route = useRoute();

const visibilityStatus = ["show", "hide"];
const passwordType = ["password", "text"];
const form = ref({
  username: "",
  pswrd: "",
});
const visPos = ref(0);
const loginStatus = ref(localStorage.getItem("loginSuccess") === "true");
const userName = ref(localStorage.getItem("userName"));
const isNestedRoute = computed(() => route.path === "/loggedIn-profile");

const logout = () => {
  localStorage.removeItem("loginSuccess");
  localStorage.removeItem("userName");
  loginStatus.value = "false";
  userName.value = "";
};

const goToForm = () => {
  if (
    form.value.username.trim() === "hchoi@corp.globetax.com" &&
    form.value.pswrd.trim() === "ABC123"
  ) {
    store.setUserId(form.value.username);
    router.push("/calendar");
  } else if (
    form.value.username.trim() === "" ||
    form.value.pswrd.trim() === ""
  ) {
    $.toast({
      class: "center-toast",
      message: "Please fill out all fields.",
      displayTime: 0,
    });
  } else {
    form.value.username = "";
    form.value.pswrd = "";
    $.toast({
      class: "center-toast",
      message: "Wrong username or password.",
      displayTime: 0,
    });
  }
};
const visibility = computed(() => visibilityStatus[visPos.value]);
const password = computed(() => passwordType[visPos.value]);
const toggleVisibility = () => {
  visPos.value = (visPos.value + 1) % 2;
};
</script>

<template>
  <router-view />

  <div v-if="!isNestedRoute">
    <div class="ui secondary mini clearing segment" style="clear: both">
      <button class="ui red mini right floated button" @click="logout">
        Log out
      </button>
    </div>
    <div class="center-container">
      <form class="login-form" autocomplete="autocomplete">
        <br />Username <br />
        <input
          v-model="form.username"
          class="fullLength"
          placeholder="Enter your username"
        />

        <div class="passwordWrapper">
          <span style="font-weight: bold">Password</span><br />

          <input
            :type="password"
            v-model="form.pswrd"
            class="fullLength"
            placeholder="Enter your password"
          />

          <button class="visibilityButton" @click="toggleVisibility">
            {{ visibility }}
          </button>
        </div>

        <div class="buttonContainer">
          <router-link to="/loggedIn-profile" v-if="loginStatus"
            >Already logged in as {{ userName }}</router-link
          >
          <button @click="goToForm">
            Login
            <i class="right chevron icon"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>