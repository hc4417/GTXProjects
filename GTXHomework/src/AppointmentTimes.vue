<script setup>
import { ref, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProfilesStore } from "@/store";
import nails from "@/nail-data.json";

const store = useProfilesStore();
const userId = computed(() => store.userId);
const profile = computed(() => store.getProfile(userId.value));
const router = useRouter();
const route = useRoute();

const timeSelected = ref(false);
const paymentReview = ref(false);

const datetimeParam = route.params.dateTime
  ? atob(route.params.dateTime)
  : null;
const dateTimeObject = reactive(new Date(datetimeParam));
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = computed(() => monthNames[dateTimeObject.getMonth()]);
const day = computed(() => dateTimeObject.getDate());
const year = computed(() => dateTimeObject.getFullYear());
const apptDate = month.value + " " + day.value + ", " + year.value;
const setTime = ref(null);

const returnToCalendar = () => {
  router.push("/calendar");
};
const timeSelect = (tempTime) => {
  timeSelected.value = !timeSelected.value;
  setTime.value = tempTime;
};
const confirmSelection = () => {
  if (timeSelected.value) {
    paymentReview.value = true;

    $("#confirmation-modal")
      .modal({
        onShow() {
          $("#nail-style-dropdown").dropdown({});
        },
      })
      .modal("show");
  }
};

const extractTimeForDisplay = computed(() => {
  if (setTime.value === null) return "";

  const dateTimeClone = new Date(dateTimeObject);
  dateTimeClone.setHours(setTime.value);

  const hours = dateTimeClone.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const convertHours = hours % 12 || 12;
  return `${convertHours}:00 ${ampm}`;
});
</script>

<template>
  <div class="ui calendar" style="padding-left: 15rem; width: 800px">
    <table class="ui celled center aligned unstackable table hour four column">
      <thead>
        <tr class="clickable" @click="returnToCalendar">
          <th colspan="4">
            <!--{{ Month }} {{ Day}} {{ Year }}-->
            {{ dateTimeObject }}
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
            @click="timeSelect(14)"
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
            @click="confirmSelection"
          >
            Select
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div id="confirmation-modal" class="ui small modal">
    <div class="header">
      Review Appointment Details
      <div class="ui basic fitted segment">
        <i class="user tie icon"></i>
        {{ profile.fullName }}
      </div>
    </div>

    <div class="content" style="display: flex">
      <div class="ui selection dropdown" id="nail-style-dropdown">
        <input type="hidden" name="nail" />
        <i class="dropdown icon"></i>
        <div class="default text">Nail Designs</div>
        <div class="scrollhint menu">
          <div class="item" v-for="nail in nails" :key="nail.id">
            <img :src="nail.picture" />
          </div>
        </div>
      </div>
      <!--replace w drop down of nail images?-->
      <div class="description">
        <div class="ui header" style="padding-left: 10%">
          Date: {{ apptDate }} <br />
          Time: {{ extractTimeForDisplay }}
        </div>
        <p></p>
      </div>
    </div>
    <div class="actions">
      <button class="ui primary ok button">Confirm</button>
      <button class="ui cancel button" @click="returnToCalendar">Cancel</button>
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