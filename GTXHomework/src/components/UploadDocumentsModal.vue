<script setup>
import { onMounted, computed, ref, defineProps } from "vue";

const props = defineProps({
  selectedBeneficialOwner: Object,
  modalId: String,
});

const uploadedFile = ref(null);
const fileName = computed(() => {
  return uploadedFile.name;
});

onMounted(() => {
  console.log("The component was mounted.");
  let $form = $(".file-upload-box");
  $form
    .on(
      "drag dragstart dragend dragover dragenter dragleave drop",
      function (e) {
        e.preventDefault();
        e.stopPropagation();
      }
    )
    .on("dragover dragenter", function () {
      $form.addClass("is-dragover");
    })
    .on("dragleave dragend drop", function () {
      $form.removeClass("is-dragover");
    })
    .on("drop", (e) => {
      let file = e.originalEvent.dataTransfer.files[0];
      fileOnChange(file);
    });
});

const fileOnChange = (files) => {
  if (files[0]) {
    uploadedFile.value = files[0];
  }
};

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
    uploadedFile.value = files;
  }
};

// const onDragover = (event) => {};
</script>

<template>
  <button class="ui basic button" @click="openUploadPopup()">
    <i class="upload icon"></i> Upload
  </button>

  <div :id="modalId" class="ui tiny modal">
    <div class="header">
      Upload Documents for {{ selectedBeneficialOwner.fullLegalName }}
      <p>Drag and drop your files here or click to browse.</p>
    </div>
    <div class="content file-upload-container">
      <label for="fileInput" class="file-upload-box">
        <!--TODO: Animation when file dragged in and out of upload box space-->
        <input
          type="file"
          id="fileInput"
          ref="uploadedFile"
          @change="fileOnChange($event.target.files[0])"
        />
        <br /><i class="big upload icon"></i>

        <p class="drag-drop-caption">
          Drag 'n' drop files here or click to select files
          {{ fileName }}
        </p>
        <!--TODO: Display file name + size-->
      </label>
    </div>
    <div class="centered actions">
      <div class="ui primary approve button">Upload</div>
      <div class="ui cancel button" data-deny="true">Clear</div>
      <!--TODO: Uploading indicates a status update?-->
    </div>
  </div>
</template> 

<style scoped>
.file-upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 300px;
  padding: 1rem;
  border-radius: 10px;
  border-style: dotted;
  color: #726f6f;
}

.file-upload-box.is-dragover {
  border-color: rgb(134, 160, 199);
  background: #ece7e7;
}

.file-upload-container {
  display: flex;
  justify-content: center;
}

.hidden {
  opacity: 0%;
}

.drag-drop-caption {
  font-size: 18px;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>