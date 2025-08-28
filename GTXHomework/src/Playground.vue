<script setup>
import { onMounted, ref, computed } from "vue";
import UploadDocumentsModal from "./components/UploadDocumentsModal.vue";
import PreviewFileUploadModal from "./components/PreviewFileUploadModal.vue";
import DxDataGrid, {
  DxEditing,
  DxColumn,
  DxPaging,
  DxPager,
  DxHeaderFilter,
  DxSearchPanel,
  DxRemoteOperations,
} from "devextreme-vue/data-grid";
import MidasData from "@/midas-connect-data.json";
import GroupCodeData from "@/midas-connect-group-code-data.json";

const reactiveMidasData = ref([...MidasData]);

onMounted(() => {
  $("#group-code-dropdown").dropdown({
    onChange: function (value) {
      selectedGroupCode.value = value;
    },
  });
});

const selectedGroupCode = ref(null);

// Filters documents based on selected group code
const filteredMidasData = computed(() => {
  if (!selectedGroupCode.value) {
    return reactiveMidasData.value;
  }
  return reactiveMidasData.value.filter(
    (item) => item.groupCode === selectedGroupCode.value
  );
});

// Retrieves document data updates
const handleStatusUpdate = (updatedOwner) => {
  const row = reactiveMidasData.value.find((r) => r.id === updatedOwner.id);
  if (row) {
    row.status = "Received";
    row.fileName = updatedOwner.fileName;
    row.fileNameDisplay = updatedOwner.fileNameDisplay;
    row.fileUrl = updatedOwner.fileUrl;
  }
};

// Reacts to document status change
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
    <div class="ui clearable selection dropdown" id="group-code-dropdown">
      <input type="hidden" name="code" />
      <div class="default text">Sort by: Group Code</div>
      <i class="dropdown icon"></i>
      <div class="scrollhint menu">
        <div
          class="item"
          v-for="code in GroupCodeData"
          :key="code.id"
          :data-value="code.groupCode"
          style="display: flex"
        >
          <div>{{ code.groupCode }}</div>
        </div>
      </div>
    </div>

    <DxDataGrid
      :data-source="filteredMidasData"
      :show-borders="true"
      :show-row-lines="true"
      :word-wrap-enabled="true"
      :row-alternation-enabled="true"
      @row-prepared="onRowPrepared"
    >
      <DxHeaderFilter :visible="true" />
      <!--TODO: Auto adjust page size based on screen ratio-->
      <DxPaging :page-size="10" />
      <DxPager :show-info="true" :show-navigation-buttons="true" />
      <DxSearchPanel :visible="true" />
      <DxRemoteOperations :filtering="false" />

      <DxColumn data-field="fullLegalName" caption="Beneficial Owner" />
      <DxColumn :allow-header-filtering="false" data-field="documentName" />
      <DxColumn
        :allow-header-filtering="false"
        data-field="documentId"
        data-type="string"
        alignment="left"
      />
      <DxColumn data-field="status" alignment="center" :width="200" />
      <DxColumn
        :allow-header-filtering="false"
        :allow-search="false"
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

<style scoped>
</style>
