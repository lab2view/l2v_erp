<template>
  <!-- page-wrapper Start-->
  <BaseFormModal
    title="Confirmer l'approvisionnement"
    :with-close-action="false"
    :submit-form="submitSelectArticleFromForm"
  >
    <div class="form-group">
      <BaseSelect
        v-model="article_from_id"
        label="Selectionner l'article source"
        :options="packableArticles"
        key-label="name"
        key-value="id"
        :required="true"
      />
    </div>
    <template #footer>
      <BaseButton
        :text="$t('common.cancel')"
        class="btn btn-secondary btn-block"
        @click.prevent="$emit('cancel')"
      />
      <BaseButton
        :text="$t('common.confirm')"
        class="btn btn-primary btn-block"
        type="submit"
      />
    </template>
  </BaseFormModal>
  <!-- page-wrapper end-->
</template>
<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';

export default {
  name: 'SaleSessionPacking',
  components: { BaseSelect, BaseFormModal, BaseButton },
  props: {
    packableArticles: {
      type: Array,
      required: true,
    },
  },
  emits: ['cancel', 'processing'],
  data() {
    return {
      article_from_id: null,
    };
  },
  methods: {
    submitSelectArticleFromForm() {
      this.$emit('processing', this.article_from_id);
    },
  },
};
</script>

<style scoped></style>
