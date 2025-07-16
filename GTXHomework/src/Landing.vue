
<template>
  <router-view />

  <div v-if="!isNestedRoute">
    <div class="backForthContainer">
      <button class="backForthButton" @click="Logout">Log Out</button>
    </div>
    <div class="center-container">
      <div class="login-form">
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
          <router-link v-if="loginStatus" to="/loggedIn-Profile">
            Already logged in as {{ userName }}
          </router-link>
          <button @click="goToForm">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProfilesStore } from "@/store";
import { useRoute } from "vue-router";

export default {
  data() {
    const visibilityStatus = ["show", "hide"];
    const passwordType = ["password", "text"];
    const visPos = 0;

    return {
      form: {
        username: "",
        pswrd: "",
      },
      visibilityStatus,
      passwordType,
      visPos,
      visibility: visibilityStatus[visPos],
      password: passwordType[visPos],
      store: null,
      route: null,

      userName: "",
      loginStatus: false,
    };
  },
  created() {
    this.store = useProfilesStore();
    this.route = useRoute();
    this.userName = localStorage.getItem("userName");
    this.loginStatus = localStorage.getItem("loginSuccess") === "true";
  },
  computed: {
    isNestedRoute() {
      return this.$route.path === "/loggedIn-Profile";
    },
  },
  methods: {
    goToForm() {
      if (
        this.form.username.trim() === "hchoi@corp.globetax.com" &&
        this.form.pswrd.trim() === "ABC123"
      ) {
        this.store.setUserId(this.form.username);
        this.$router.push("/form");
      } else if (
        this.form.username.trim() === "" ||
        this.form.pswrd.trim() === ""
      ) {
        $.toast({
          message: "Please fill out all fields.",
          showProgress: "bottom",
          classProgress: "red",
        });
      } else {
        this.form.username = "";
        this.form.pswrd = "";
        $.toast({
          message: "Wrong username or password.",
          position: "top center",
          showProgress: "bottom",
          classProgress: "red",
        });
      }
    },
    Logout() {
      this.userName = "";
      this.loginStatus = "false";

      localStorage.setItem("userName", "");
      localStorage.setItem("loginSuccess", "false");
    },
    toggleVisibility() {
      this.visPos = (this.visPos + 1) % 2;
      this.visibility = this.visibilityStatus[this.visPos];
      this.password = this.passwordType[this.visPos];
    },
  },
};
</script>

<style scoped>
</style>