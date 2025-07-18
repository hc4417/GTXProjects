<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProfilesStore } from "@/store";

const store = useProfilesStore();
const router = useRouter();

const timeSelected = ref(false);
const paymentReview = ref(false);

const returnToCalendar = () => {
  router.push("/calendar");
};
const timeSelect = () => {
  timeSelected.value = !timeSelected.value;
};
const redirectToPayment = () => {
  if (timeSelected.value) {
    paymentReview.value = true;
  }
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
          <td class="unconfirmed" style="opacity: 0.5">8:00 AM</td>
          <td>9:00 AM</td>
          <td>10:00 AM</td>
          <td>11:00 AM</td>
        </tr>
        <tr>
          <td class="unconfirmed" style="opacity: 0.5">1:00 PM</td>
          <td
            class="clickable"
            @click="timeSelect"
            :class="{ pickedSlot: timeSelected }"
          >
            2:00 PM
          </td>
          <td class="unconfirmed" style="opacity: 0.5">3:00 PM</td>
          <td>4:00 PM</td>
        </tr>
        <tr>
          <td>5:00 PM</td>
          <td>6:00 PM</td>
          <td></td>
          <td
            :class="{
              unconfirmed: !timeSelected,
              confirmed: timeSelected,
              plainClick: timeSelected,
            }"
            @click="redirectToPayment"
          >
            Select
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div
    class="ui dimmer modals page transition visible active"
    style="display: flex !important"
    v-if="paymentReview"
  >
    <div
      class="ui standard test modal transition visible active front"
      style="display: block !important"
    >
      <div class="header">Review Appointment Details</div>
      <div class="image content">
        <div class="ui medium image"></div>
        <!--replace w drop down of nail images?-->
        <div class="description">
          <div class="ui header">Date:</div>
          <p>Time:</p>
          <p>Confirm your appointment?</p>
        </div>
      </div>
      <div class="actions">
        <button class="ui black deny button" @click="returnToCalendar">
          Cancel
        </button>
        <button class="ui positive right labeled icon button">Confirm</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
tr.clickable {
  cursor: pointer;
}
td.clickable {
  cursor: pointer;
}
td.clickable:hover {
  background: rgba(252, 236, 193, 0.688);
}
</style>