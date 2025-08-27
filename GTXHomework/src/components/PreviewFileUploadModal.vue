<script setup>
import { defineProps, computed, ref } from "vue";

const props = defineProps({
  modalId: String,
  previewSrc: String,
  previewFileName: String,
});

const reactiveFileName = ref(`${props.previewFileName}`);

// Opens document preview modal with unique modalId, corresponds to bo document
const openPreviewPopup = () => {
  const modalSelector = `#${props.modalId}`;
  $(modalSelector).modal("destroy");
  $(modalSelector).modal("show");
};

// Closes document preview modal
const closePreviewPopup = () => {
  const modalSelector = `#${props.modalId}`;
  $(modalSelector).modal("hide");
};

// Handles file name for display
const uploadedFileNameDisplay = computed(() => {
  const fileName = reactiveFileName.value;
  return fileName.length > 60 ? fileName.slice(0, 60) + "..." : fileName;
});
</script>

<template>
  <i class="eye icon" title="Preview" @click="openPreviewPopup"></i>
  <div :id="modalId" class="ui small upload modal">
    <div class="header modal-times-header">
      <span class="preview-header" :title="reactiveFileName"
        >Preview {{ uploadedFileNameDisplay }}</span
      >
      <i
        class="times icon close-icon"
        title="Exit Preview"
        @click="closePreviewPopup"
      ></i>
    </div>
    <!--Displays pdf preview-->
    <div class="content" style="margin: 0 auto">
      <iframe
        :src="previewSrc + '#zoom=85'"
        class="file-preview-frame"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.file-preview-frame {
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  height: 70vh;
}

.eye.icon:hover {
  cursor: pointer;
}

.preview-header {
  font-weight: bold;
}

.preview-header:hover {
  cursor: default;
}
</style>