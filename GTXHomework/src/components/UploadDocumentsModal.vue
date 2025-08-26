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

const openUploadPopup = () => {
  const modalSelector = `#${props.modalId}`;
  $(modalSelector)
    .modal({
      closable: false,

      onApprove() {
        const updatedOwner = {
          ...props.selectedBeneficialOwner,
          fileName: uploadedFileName.value,
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

const openFileDialog = () => {
  fileInputEl.value && fileInputEl.value.click();
};

// Handling file input
const fileOnChange = (file) => {
  if (file) {
    uploadedFile.value = file;
    fileUrl.value = URL.createObjectURL(file);
    if (fileInputEl.value) fileInputEl.value.value = "";
  }
};

const fileInputEl = ref(null); // file input element
const uploadedFile = ref(null); // file data
const fileUrl = ref(null); // file URL

const fileValidityChecker = (file) => {
  if (file) {
    if (file.type !== "application/pdf") {
      return false;
    }

    return true;
  }
};

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
      <div
        :class="{
          'successful-upload-box': uploadedFile,
          'file-upload-box': !uploadedFile,
          'error-upload-box':
            uploadedFile && !fileValidityChecker(uploadedFile),
        }"
        @click="openFileDialog"
      >
        <i
          :class="{
            huge: true,
            'check circle outline icon': uploadedFile,
            'times circle outline icon':
              uploadedFile && !fileValidityChecker(uploadedFile),
            'upload icon': !uploadedFile,
          }"
        ></i>
        <div class="upload-box-text">
          <h3 v-if="!uploadedFile">
            Drag 'n' drop files here, or click to select files
          </h3>
          <h3 v-else :title="uploadedFileName">
            {{ uploadedFileNameDisplay }} ({{ fileSizeKb }} KB)
            <i
              class="circle times icon"
              @click.stop="clearSelection"
              title="Clear selection"
            ></i>
            <div
              style="display: flex; justify-content: center"
              v-if="!fileValidityChecker(uploadedFile)"
            >
              File must be a PDF
            </div>
            <div
              style="display: flex; justify-content: center"
              v-if="fileValidityChecker(uploadedFile)"
            >
              File ready for upload
            </div>
          </h3>
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
  gap: 1rem;
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
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  border-style: dotted;
  color: #8fb694;
}

.error-upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 300px;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  border-style: dotted;
  color: #b16f6f;
  background: #f5e6e6;
}

/*FIXME: dragover styling doesn't apply consistently*/
.file-upload-box.is-dragover {
  border-color: rgb(166, 187, 219) !important;
  background: #ebeff7 !important;
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
</style>