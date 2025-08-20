<script setup>
import UploadDocumentsModal from "./components/UploadDocumentsModal.vue";
import DxDataGrid, { DxEditing, DxColumn } from "devextreme-vue/data-grid";
import MidasData from "@/midas-connect-data.json";

const owners = [
  { fullLegalName: "firstName1 lastName1" },
  { fullLegalName: "firstName2 lastName2" },
];
</script>

<template>
  <DxDataGrid
    :data-source="MidasData"
    :show-borders="true"
    :show-row-lines="true"
    :word-wrap-enabled="true"
    :hover-state-enabled="true"
    :row-alternation-enabled="true"
  >
    <DxColumn data-field="fullLegalName" caption="Beneficial Owner" />
    <DxColumn data-field="documentName" />
    <DxColumn data-field="documentId" />
    <DxColumn data-field="status" />
    <DxColumn caption="Action" cell-template="action-cell" alignment="center" />
    <template #action-cell="{ data: beneficialOwner }">
      <UploadDocumentsModal
        :selectedBeneficialOwner="beneficialOwner.data"
        :modalId="'upload-modal-' + index"
      />
    </template>
  </DxDataGrid>
</template> 