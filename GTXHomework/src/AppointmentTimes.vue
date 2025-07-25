<script setup>
import { ref, reactive, computed, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProfilesStore } from "@/store";
import nails from "@/nail-data.json";

const store = useProfilesStore();
const userId = computed(() => store.userId);
const profile = computed(() => store.getProfile(userId.value));

const router = useRouter();
const route = useRoute();
const returnToCalendar = () => {
  clearAll();
  router.push("/calendar");
};

// Appointment date setup
const datetimeParam = route.params.dateTime
  ? atob(route.params.dateTime)
  : null;
const dateTimeObject = reactive({
  dateTime: new Date(datetimeParam),
});

// Formats and displays the selected appointment date as "Month Day, Year"
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

// const month = computed(() => monthNames[dateTimeObject.dateTime.getMonth()]);
// const day = computed(() => dateTimeObject.dateTime.getDate());
// const year = computed(() => dateTimeObject.dateTime.getFullYear());

const apptDate = computed(() => {
  let month = monthNames[dateTimeObject?.dateTime.getMonth()];
  let day = dateTimeObject?.dateTime.getDate();
  let year = dateTimeObject?.dateTime.getFullYear();

  return `${month} ${day}, ${year}`;
});

const clearAll = () => {
  selectedTime.value = null;
  dateTimeObject.dateTime = null; //TODO
};

// Handles initial time selection
const isApptTimeSelected = ref(false);
const selectedTime = ref(null);
const timeSelect = (tempTime) => {
  isApptTimeSelected.value = !isApptTimeSelected.value;
  selectedTime.value = tempTime;
};

// Triggers modal to review appointment details
const apptReview = ref(false);
const confirmSelection = async () => {
  // Checking if selected value exists
  if (isApptTimeSelected.value) {
    apptReview.value = true;
    //dateTimeObject.dateTime.setHours(selectedTime.value);
    //dateTimeObject.dateTime = new Date(dateTimeObject.dateTime);

    await nextTick();
    $("#confirmation-modal").modal("destroy");
    $("#confirmation-modal")
      .modal({
        // content: `Date: ${apptDate.value} <br>
        // Time: ${extractTimeForDisplay.value}`,
        onShow() {
          $("#nail-style-dropdown").dropdown({});
        },
        onHidden() {
          $("#nail-style-dropdown").dropdown("clear").dropdown("destroy");
          //$(this).modal("destroy");
          //$("#confirmation-modal").modal("destroy");
        },
      })
      .modal("show");
  }
};

// Formats apppointment time
const extractTimeForDisplay = computed(() => {
  if (selectedTime.value === null) return "";
  const hours = selectedTime.value;
  //dateTimeObject.dateTime.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const convertHours = hours % 12 || 12;
  return `${convertHours}:00 ${ampm}`;
});

// Handles appointment confirmation & redirect
//TODO: confirmation doesn't go through if nothing selected from dropdown
//TODO: all components on page are disabled when toast is active
//TODO: center align message text without displacing buttons
//FIXME: formatting after dropdown selection is messed up
const confirmAppt = () => {
  isApptTimeSelected.value = !isApptTimeSelected.value;
  clearAll();

  $.toast({
    position: "top center",
    message: "Your appointment has been scheduled!",
    displayTime: 0,
    class: "white",
    classActions: "center aligned",
    actions: [
      {
        text: "Continue browsing",
        click: function () {
          router.push("/nail-catalog");
        },
      },
      {
        text: "Log out",
        class: "red",
        click: function () {
          logout();
        },
      },
    ],
  });
};

// Handles user logout
const loginStatus = ref(localStorage.getItem("loginSuccess") === "true");
const userName = ref(localStorage.getItem("userName"));

const logout = () => {
  localStorage.removeItem("loginSuccess");
  localStorage.removeItem("userName");
  loginStatus.value = "false";
  userName.value = "";
  router.push("/");
};
</script>

<template>
  <!-- Table displaying available appointment times-->
  <!-- TODO: change available times depending on DateTimeObject-->
  <div style="padding-left: 15rem; width: 800px">
    <table class="ui celled center aligned unstackable table hour four column">
      <thead>
        <tr @click="returnToCalendar">
          <th class="clickable" colspan="4">
            {{ apptDate }}
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
            :class="{ 'picked-slot': isApptTimeSelected }"
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
              unconfirmed: !isApptTimeSelected,
              confirmed: isApptTimeSelected,
            }"
            @click="confirmSelection"
          >
            Select
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal confirming appointment details-->
  <div id="confirmation-modal" class="ui small modal">
    <div class="header">
      Review Appointment Details
      <div class="ui basic fitted segment">
        <i class="user tie icon"></i>
        {{ profile?.fullName }}
      </div>
    </div>
    <div class="content" style="display: flex">
      <div class="ui selection dropdown" id="nail-style-dropdown">
        <input type="hidden" name="nail" />
        <i class="dropdown icon"></i>
        <div class="default text">Nail Designs</div>
        <div class="scrollhint menu">
          <div
            class="item"
            v-for="nail in nails"
            :key="nail.id"
            style="display: flex"
          >
            <img class="ui avatar image" :src="nail.picture" />
            <div>{{ nail.baseColor }}-{{ nail.theme }}</div>
          </div>
        </div>
      </div>
      <div class="description">
        <div class="ui header" style="padding-left: 10%">
          Date: {{ apptDate }} <br />
          Time: {{ extractTimeForDisplay }}
        </div>
      </div>
    </div>
    <div class="actions">
      <button class="ui primary ok button" @click="confirmAppt">Confirm</button>
      <button class="ui cancel button" @click="returnToCalendar">Cancel</button>
    </div>
  </div>
</template>

<style>
.dropdown.icon {
  color: blue !important;
}

#nail-style-dropdown {
  width: 400px;
}
</style>