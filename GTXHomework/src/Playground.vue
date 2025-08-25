<script setup>
import { onMounted, ref } from "vue";
import UploadDocumentsModal from "./components/UploadDocumentsModal.vue";
import DxDataGrid, {
  DxEditing,
  DxColumn,
  DxPaging,
  DxPager,
  DxHeaderFilter,
} from "devextreme-vue/data-grid";
import MidasData from "@/midas-connect-data.json";

const reactiveMidasData = ref([...MidasData]);

const handleStatusUpdate = (updatedOwner) => {
  const row = reactiveMidasData.value.find((r) => r.id === updatedOwner.id);
  if (row) {
    row.status = "Received";
    row.fileName = updatedOwner.fileName;
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
      :hover-state-enabled="true"
      :row-alternation-enabled="true"
    >
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
        <UploadDocumentsModal
          v-if="beneficialOwner.data.status !== 'Received'"
          :selectedBeneficialOwner="beneficialOwner.data"
          :modalId="'upload-modal-' + beneficialOwner.data.id"
          @statusUpdate="handleStatusUpdate"
        />
        <span v-else>{{ beneficialOwner.data.fileName }}</span>
      </template>
    </DxDataGrid>
  </div>
</template> 
