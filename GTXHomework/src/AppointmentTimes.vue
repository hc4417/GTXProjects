<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const returnToCalendar = () => {
  router.push("/calendar");
};
</script>

<template>
  <div
    class="ui calendar"
    id="inline_calendar"
    style="padding-left: 15rem; width: 800px"
  >
    <table class="ui celled center aligned unstackable table hour four column">
      <thead>
        <tr class="clickable" @click="returnToCalendar">
          <th colspan="4">
            <!--{{ Month }} {{ Day}} {{ Year }}-->
            July 13, 2025
          </th>
        </tr>
        <tr></tr>
      </thead>
      <tbody>
        <tr>
          <td>8:00 AM</td>
          <td>9:00 AM</td>
          <td>10:00 AM</td>
          <td>11:00 AM</td>
        </tr>
        <tr>
          <td>1:00 PM</td>
          <td>2:00 PM</td>
          <td>3:00 PM</td>
          <td>4:00 PM</td>
        </tr>
        <tr>
          <td>5:00 PM</td>
          <td>6:00 PM</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
tr.clickable {
  cursor: pointer;
}
</style>