<script setup>
import { onMounted, computed, ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  selectedBeneficialOwner: Object,
  modalId: String,
});

const emit = defineEmits(["statusUpdate"]);

onMounted(() => {
  console.log("The component was mounted.");
  let $form = $(`#${props.modalId} .file-upload-box`);
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

  $(fileInputEl.value).on("change", (e) => {
    const file = e.target.files[0];
    fileOnChange(file);
  });
});

// Opens file upload modal
const openUploadPopup = () => {
  const modalSelector = `#${props.modalId}`;
  $(modalSelector)
    .modal({
      closable: false,

      onApprove() {
        const updatedOwner = {
          ...props.selectedBeneficialOwner,
          fileName: uploadedFileName.value,
          fileNameDisplay: uploadedFileNameDisplay,
          fileUrl: fileUrl.value,
        };
        emit("statusUpdate", updatedOwner);
      },
      onDeny() {
        uploadedFile.value = null;
      },
    })
    .modal("show");
};

// Opens file input
const openFileDialog = () => {
  fileInputEl.value && fileInputEl.value.click();
};

// Handles file input
const fileOnChange = (file) => {
  if (file) {
    uploadedFile.value = file;
    fileUrl.value = URL.createObjectURL(file);
    if (fileInputEl.value) fileInputEl.value.value = "";
  }
};

const fileInputEl = ref(null); // File input element
const uploadedFile = ref(null); // File input data
const fileUrl = ref(null); // File input URL

// Checks validity of input file type
const fileValidityChecker = (file) => {
  if (file) {
    if (file.type !== "application/pdf") {
      return false;
    }

    return true;
  }
  return false;
};

// Computing attributes related to the uploaded file
const uploadedFileName = computed(() => {
  return uploadedFile.value ? uploadedFile.value.name : "";
});

const uploadedFileNameDisplay = computed(() => {
  if (!uploadedFile.value) {
    return "";
  }
  const fileName = uploadedFile.value.name;
  return fileName.length > 25 ? fileName.slice(0, 25) + "..." : fileName;
});

const uploadedFileSize = computed(() => {
  return uploadedFile.value ? uploadedFile.value.size : "";
});

const fileSizeKb = computed(() => {
  return uploadedFileSize.value
    ? (uploadedFileSize.value / 1024).toFixed(2)
    : "";
});

// Determines styling of file upload box
const getUploadBoxClass = computed(() => {
  if (!uploadedFile.value) {
    return null;
  }
  if (fileValidityChecker(uploadedFile.value)) {
    return "successful-upload-box";
  } else {
    return "error-upload-box";
  }
});

// Clears file input
const clearSelection = () => {
  uploadedFile.value = null;
  fileUrl.value = null;
};
</script>

<template>
  <button class="ui basic button" @click="openUploadPopup()">
    <i class="upload icon"></i> Upload
  </button>

  <div :id="modalId" class="ui tiny upload modal">
    <div class="header">
      Upload Documents for {{ selectedBeneficialOwner.fullLegalName }}
    </div>
    <div class="content file-upload-dropzone">
      <input type="file" class="file-input" ref="fileInputEl" accept=".pdf" />
      <div class="file-upload-box" :class="getUploadBoxClass">
        <i
          :class="{
            huge: true,
            'check circle outline icon': fileValidityChecker(uploadedFile),
            'times icon': uploadedFile && !fileValidityChecker(uploadedFile),
            'upload icon': !uploadedFile,
          }"
        ></i>
        <div class="upload-box-text">
          <div v-if="!uploadedFile">
            <h3>
              Drop files here or
              <a class="browse-link" @click="openFileDialog">browse</a>
            </h3>
          </div>
          <div v-else>
            <h3
              style="display: flex; justify-content: center"
              v-if="!fileValidityChecker(uploadedFile)"
            >
              File must be a PDF
            </h3>
            <h3
              style="display: flex; justify-content: center"
              v-if="fileValidityChecker(uploadedFile)"
            >
              File ready for upload
            </h3>
            <h3>
              <span :title="uploadedFileName"
                >{{ uploadedFileNameDisplay }}
              </span>
              <i
                class="circle times icon"
                @click.stop="clearSelection"
                title="Clear selection"
              >
              </i>
            </h3>
            <p style="display: flex; justify-content: center">
              ({{ fileSizeKb }} KB)
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="centered actions">
      <div
        class="ui primary approve button"
        :class="{
          disabled: !uploadedFile || !fileValidityChecker(uploadedFile),
        }"
        data-approve="true"
      >
        Upload
      </div>
      <div class="ui cancel button" data-deny="true">Cancel</div>
    </div>
  </div>
</template> 

<style scoped>
.file-upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  width: 500px;
  height: 300px;
  padding: 1rem;
  border-radius: 10px;
  border-style: dotted;
  color: #b3aeae;
}

.successful-upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 300px;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 10px;
  border-style: dotted;
  color: #339933;
  background: #fdfff5;
}

.error-upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 300px;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 10px;
  border-style: dotted;
  color: #db2828;
  background: #fff6f6;
}

.file-upload-box.is-dragover {
  border-color: rgb(166, 187, 219) !important;
  background: #f1f4f8 !important;
  color: #b3aeae;
}

.file-upload-dropzone {
  display: flex !important;
  justify-content: center !important;
}

.file-input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.drag-drop-caption {
  font-size: 2rem;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.upload.modal > .header {
  background: #ebebeb;
}

.upload-box-text h3 {
  margin: 0.5rem 0;
  line-height: 1.2;
}
</style>