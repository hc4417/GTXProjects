<script setup>
import nails from "@/nail-data.json";
import { useRouter } from "vue-router";

const router = useRouter();

const scheduleAppt = () => {
  router.push("/scheduling");
};
</script>

<template>
  <div
    class="ui visible sidebar"
    style="
      background-color: white;
      width: 250px;
      display: flex;
      justify-content: center;
      padding-top: 3rem;
    "
  >
    <a class="apptPage" @click="scheduleAppt">✨ Schedule an Appointment</a>
  </div>
  <div class="pusher">
    <div style="max-height: 80vh; overflow-y: auto">
      <table class="ui celled striped table" style="width: 800px">
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
