<!-- form -->
<template>
  <div class="backForthContainer">
    <button class="backForthButton" @click="BackToLanding">
      Back to Login
    </button>
  </div>

  <div class="form">
    First Name <br />
    <input
      v-model="form.firstName"
      class="fullLength"
      placeholder="First Name"
    />
    <small>{{ form.firstName.length }}/50 characters</small>

    Last Name <br />
    <input
      v-model="form.lastName"
      class="fullLength"
      placeholder="Last Name"
      maxLength="50"
    />
    <small>{{ form.lastName.length }}/50 characters</small>

    Hometown <br />
    <input v-model="form.hometown" class="fullLength" placeholder="Hometown" />
    <small>{{ form.hometown.length }}/100 characters</small>

    Current City <br />
    <input
      v-model="form.currentCity"
      class="fullLength"
      placeholder="Current City"
    />
    <small>{{ form.currentCity.length }}/100 characters</small>

    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox"> Dual Citizenship</label>

    <div class="buttonContainer">
      <button @click="Cleared">Clear</button>
      <button type="button" @click="Submitted">Submit</button> <br /><br />
    </div>

    <div class="results">
      Result:
      <!-- Version 1
        <div v-if = "submitted">
          
          <p>Hi, I am {{form.firstName}} {{form.lastName}}. I am originally from {{form.hometown}}, currently residing in {{form.currentCity}}.</p>
        </div>
        -->

      <!-- Version 2-->
      <div :class="{ blue: !checked, orange: checked }">
        <p>
          Hi, I am {{ form.firstName }} {{ form.lastName }}. I am originally
          from {{ form.hometown }}, currently residing in
          {{ form.currentCity }}.
        </p>
      </div>
    </div>

    <br />
    Favorite Foods:
    <div v-if="submitted">
      <ol>
        <li v-for="(food, index) in favoriteFoods" :key="index">{{ food }}</li>
      </ol>
    </div>
  </div>
</template>

<!--Data Retrieval + Button Method-->
<script>
import { useProfilesStore } from "@/store";

export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        hometown: "",
        currentCity: "",
      },

      checked: false,
      submitted: false,
      shakeForm: false,

      favoriteFoods: ["Tofu Stew", "Salmon", "Tom Yum"],
    };
  },
  created() {
    this.store = useProfilesStore();
  },
  computed: {
    userId() {
      return this.store.userId;
    },
  },
  methods: {
    Submitted() {
      if (
        this.form.firstName.trim() === "" ||
        this.form.lastName.trim() === "" ||
        this.form.hometown.trim() === "" ||
        this.form.currentCity.trim() === ""
      ) {
        $.toast({
          message: "Please fill out all fields.",
          position: "top left",
          showProgress: "bottom",
          classProgress: "red",
        });
        return;
      }

      this.submitted = true;
      const profile = {
        fullName: this.form.firstName + " " + this.form.lastName,
        origin: this.form.hometown,
        currentCity: this.form.currentCity,
        dualCitizen: this.checked,
      };
      this.store.saveProfile(this.store.userId, profile);
      localStorage.setItem("userName", this.form.firstName);
      localStorage.setItem("loginSuccess", "true");
      this.$router.push("/profile");
    },

    Cleared() {
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.hometown = "";
      this.form.currentCity = "";
      this.checked = false;
      this.submitted = false;
    },
    BackToLanding() {
      this.$router.push("/");
    },
  },
};
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
