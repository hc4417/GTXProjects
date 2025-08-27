<script setup>
import { onMounted, ref } from "vue";
import UploadDocumentsModal from "./components/UploadDocumentsModal.vue";
import PreviewFileUploadModal from "./components/PreviewFileUploadModal.vue";
import DxDataGrid, {
  DxEditing,
  DxColumn,
  DxPaging,
  DxPager,
  DxHeaderFilter,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import MidasData from "@/midas-connect-data.json";

const reactiveMidasData = ref([...MidasData]);

// Retrieves data updates
const handleStatusUpdate = (updatedOwner) => {
  const row = reactiveMidasData.value.find((r) => r.id === updatedOwner.id);
  if (row) {
    row.status = "Received";
    row.fileName = updatedOwner.fileName;
    row.fileNameDisplay = updatedOwner.fileNameDisplay;
    row.fileUrl = updatedOwner.fileUrl;
  }
};

// Changes row style to indicate where documents are receieved
const onRowPrepared = (e) => {
  if (e.rowType === "data") {
    if (e.data.status == "Received") {
      e.rowElement.classList.add("file-received-row");
    }
  }
};
</script>

<template>
  <div class="dx-data-grid-container">
    <DxDataGrid
      :data-source="reactiveMidasData"
      :show-borders="true"
      :show-row-lines="true"
      :word-wrap-enabled="true"
      :row-alternation-enabled="true"
      @row-prepared="onRowPrepared"
    >
      >
      <DxSearchPanel :visible="true" />
      <DxHeaderFilter :visible="true" />
      <DxPaging :page-size="12" />
      <DxPager :show-info="true" :show-navigation-buttons="true" />

      <DxColumn data-field="fullLegalName" caption="Beneficial Owner" />
      <DxColumn :allow-header-filtering="false" data-field="documentName" />
      <DxColumn
        :allow-header-filtering="false"
        data-field="documentId"
        alignment="left"
      />
      <DxColumn data-field="status" alignment="center" :width="200" />
      <DxColumn
        :allow-header-filtering="false"
        :width="200"
        caption="Action"
        cell-template="action-cell"
        alignment="center"
      />
      <template #action-cell="{ data: beneficialOwner }">
        <!--Action cell content changes depending on bo doc status -->
        <UploadDocumentsModal
          v-if="beneficialOwner.data.status !== 'Received'"
          :selectedBeneficialOwner="beneficialOwner.data"
          :modalId="'upload-modal-' + beneficialOwner.data.id"
          @statusUpdate="handleStatusUpdate"
        />
        <span v-else :title="beneficialOwner.data.fileName"
          >{{ beneficialOwner.data.fileNameDisplay }}
          <PreviewFileUploadModal
            :modalId="'preview-modal-' + beneficialOwner.data.id"
            :previewSrc="beneficialOwner.data.fileUrl"
            :previewFileName="beneficialOwner.data.fileName"
          />
        </span>
      </template>
    </DxDataGrid>
  </div>
</template> 

