<script setup>
import nails from "@/nail-data.json";
import { useRouter } from "vue-router";

// FIXME: store is breaking my page!
// import { useProfilesStore } from "@/store";
// const store = useProfilesStore();
// const userId = computed(() => store.userId);
// const profile = computed(() => store.getProfile(userId.value));

const router = useRouter();
const home = () => {
  router.push("/");
};
const lookbook = () => {
  router.push("/nail-catalog");
};
const scheduleAppt = () => {
  router.push("/calendar");
};
</script>

<template>
  <!--Sidebar menu with navigation links-->
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

  <!--Table displaying nail details from nail-data.json-->
  <div class="pusher">
    <div style="max-height: 80vh; overflow-y: auto">
      <table
        class="ui celled striped table"
        style="width: 800px; margin-left: 15rem"
      >
        <thead>
          <tr>
            <th>Picture</th>
            <th>Shape</th>
            <th>Charms</th>
            <th>Style</th>
            <th>Base Color</th>
          </tr>
        </thead>
        <tbody>
          <!--Loop through nails array to render each object's details-->
          <tr v-for="nail in nails" :key="nail.id">
            <td>
              <img class="nail-img" :src="nail.picture" />
            </td>
            <td>{{ nail.shape }}</td>
            <td>{{ nail.charms }}</td>
            <td>{{ nail.style }}</td>
            <td>{{ nail.baseColor }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.nail-img {
  width: 150px;
}

.nail-img:hover {
  /* width: 150px */
  transform: scale(1.5);
  transform-origin: top left;
  cursor: zoom-in;
}
</style>