<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  selectedBeneficialOwner: Object,
  modalId: String,
});

const uploadedFile = ref(null);

const openUploadPopup = () => {
  const modalSelector = `#${props.modalId}`;
  $(modalSelector)
    .modal({
      closable: false,

      onApprove() {},
      onDeny() {
        uploadedFile.value.value = "";
      },
    })
    .modal("show");
};

const onDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    uploadedFile.value.files = files;
  }
};
</script>

<template>
  <button class="ui basic button" @click="openUploadPopup()">
    <i class="upload icon"></i> Upload
  </button>

  <div :id="modalId" class="ui small modal">
    <div class="header">
      Upload Documents for {{ selectedBeneficialOwner.fullLegalName }}
      <p>Drag and drop your files here or click to browse.</p>
    </div>
    <div class="content" id="file-upload-container">
      <div id="file-upload-box" @dragover.prevent @drop.prevent="onDrop">
        <i class="big upload icon"></i>
        <p>Drag 'n' drop files here or click to select files</p>
        <input type="file" ref="uploadedFile" />
      </div>
    </div>
    <div class="actions">
      <div class="ui cancel button" data-deny="true">Clear</div>
      <div class="ui approve button">Upload</div>
      <!--TODO: Uploading indicates a status update?-->
    </div>
  </div>
</template> 