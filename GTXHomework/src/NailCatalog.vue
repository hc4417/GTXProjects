<script setup>
import nails from "@/nail-data.json";
import { useRouter } from "vue-router";

const router = useRouter();
const home = () => {
  router.push("/");
};
const scheduleAppt = () => {
  router.push("/calendar");
};
</script>

<template>
  <!--Sidebar menu with navigation links-->
  <div
    class="ui visible sidebar vertical menu"
    style="
      background-color: white;
      width: 250px;
      display: flex;
      padding-top: 1rem;
      padding-left: 0.5rem;
    "
  >
    <a class="home" @click="home"><i class="home icon"></i> Home </a>
    <a class="lookbook" @click="lookbook"><i class="book icon"></i> Lookbook</a>
    <a class="apptPage" @click="scheduleAppt"
      ><i class="calendar alternate icon"></i> Schedule an Appointment</a
    >
  </div>

  <!--Table displaying nail data from nail-data.json-->
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
          <!--Loops through nails array to render each object's details-->
          <tr v-for="nail in nails" :key="nail.id">
            <td>
              <img :src="nail.picture" style="width: 150px" />
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
