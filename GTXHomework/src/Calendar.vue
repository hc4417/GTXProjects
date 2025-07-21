<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const isNestedRoute = computed(() => route.name === "apptTimes");

const home = () => {
  router.push("/");
};
const lookbook = () => {
  router.push("/nail-catalog");
};
const scheduleAppt = () => {
  router.push("/calendar");
};
const redirectToApptTimes = (day) => {
  let dateTime = new Date(2025, 6, day);
  let datetimeBase64 = btoa(dateTime);
  router.push(`/calendar/appointment/${datetimeBase64}`);
};
</script>

<template>
  <router-view />
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
    <a class="home" @click="home">🏠 Home </a>
    <a class="lookbook" @click="lookbook">📖 Lookbook</a>
    <a class="apptPage" @click="scheduleAppt">✨ Schedule an Appointment</a>
  </div>

  <div class="pusher">
    <div
      v-if="!isNestedRoute"
      class="ui calendar"
      id="inline_calendar"
      style="padding-left: 15rem; width: 800px"
    >
      <table
        class="ui celled center aligned unstackable table day seven column"
      >
        <thead>
          <tr>
            <th colspan="7">
              <!--{{ Month }} {{ Year }}-->
              July 2025
            </th>
          </tr>
          <tr>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          <tr class="week">
            <td></td>
            <td></td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr class="week">
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
          </tr>
          <tr class="week">
            <td class="clickable" @click="redirectToApptTimes(13)">13</td>
            <td>14</td>
            <td>15</td>
            <td>16</td>
            <td>17</td>
            <td>18</td>
            <td>19</td>
          </tr>
          <tr class="week">
            <td>20</td>
            <td>21</td>
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td>25</td>
            <td>26</td>
          </tr>
          <tr class="week">
            <td>27</td>
            <td>28</td>
            <td>29</td>
            <td>30</td>
            <td>31</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.week {
  height: 70px;
}
td.clickable {
  cursor: pointer;
}
td.clickable:hover {
  background: rgba(176, 211, 241, 0.5);
}
</style>