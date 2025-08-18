<script setup>
import UploadDocumentsModal from "./components/UploadDocumentsModal.vue";
import { ref } from "vue";

const owners = [
  { fullLegalName: "firstName1 lastName1" },
  { fullLegalName: "firstName2 lastName2" },
];
</script>

<template>
  <!-- <button class="ui primary button" @click="openUploadPopup(bo)">
    <i class="upload icon"></i> Upload
  </button> -->
  <table class="ui celled striped table">
    <thead>
      <tr>
        <th>Beneficial Owner</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(bo, index) in owners" :key="index">
        <td>{{ bo.fullLegalName }}</td>
        <td>
          <UploadDocumentsModal
            :selectedBeneficialOwner="bo"
            :modalId="'upload-modal-' + index"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template> 