<script setup>
import { defineProps } from "vue";

const props = defineProps({
  modalId: String,
  previewSrc: String,
  previewFileName: String,
});

const openPreviewPopup = () => {
  const modalSelector = `#${props.modalId}`;
  $(modalSelector).modal("show");
};

const closePreviewPopup = () => {
  const modalSelector = `#${props.modalId}`;
  $(modalSelector).modal("hide");
};
</script>

<template>
  <i class="eye icon" @click="openPreviewPopup"></i>
  <div :id="modalId" class="ui small upload modal">
    <div class="header modal-times-header">
      Preview {{ previewFileName }}
      <i class="times icon close-icon" @click="closePreviewPopup"></i>
    </div>
    <div class="content" style="margin: 0 auto">
      <iframe
        :src="previewSrc + '#zoom=85'"
        width="700"
        height="400"
        style="margin-top: 20px; border: 1px solid #ddd; border-radius: 5px"
      ></iframe>
    </div>
  </div>
</template>