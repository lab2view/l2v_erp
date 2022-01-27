<template>
  <tr>
    <td>{{ article.package.label }}</td>
    <td>
      <base-input-group
        v-model="quantity"
        text="number"
        required
        :disabled="!is_form"
      >
        <button
          :class="is_form ? 'btn-success' : 'btn-secondary'"
          :disabled="is_form && !is_edited"
          :title="$t(`${is_form ? 'common.save' : 'common.update'}`)"
          class="btn btn-iconsolid"
          type="button"
          @click.prevent="onInputBtnClick"
        >
          <i :class="`fa fa-${is_form ? 'check' : 'edit'}`"></i>
        </button>
      </base-input-group>
    </td>
    <td class="font-primary f-w-600">{{ article.name }}</td>
    <td>
      <BaseButton
        v-if="!article.not_deletable"
        type="button"
        class="btn btn-iconsolid btn-danger btn-sm"
        :title="$t('common.delete')"
        @click.prevent="deleteArticle(article)"
      >
        <i class="fa fa-trash-o" />
      </BaseButton>
    </td>
  </tr>
</template>

<script>
import BaseButton from '../common/BaseButton.vue';
import BaseInputGroup from '../common/BaseInputGroup.vue';
export default {
  components: { BaseInputGroup, BaseButton },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      is_form: false,
      is_edited: false,
      loading: false,
      errors: [],
      quantity: null,
    };
  },
  watch: {
    quantity(value) {
      if (value !== this.article.quantity) {
        this.is_edited = true;
      }
    },
  },
  created() {
    this.quantity = this.article.quantity;
  },
  methods: {
    deleteArticle(article) {
      if (confirm(this.$t('messages.confirmDelete', { label: article.name })))
        this.$store.dispatch('article/deleteArticle', article.id);
    },
    onInputBtnClick() {
      if (this.is_form) {
        this.loading = true;
        this.$store
          .dispatch('article/updateArticle', {
            ...this.article,
            quantity: this.quantity,
          })
          .then(() => {
            this.is_edited = false;
            this.errors = [];
          })
          .catch((error) => (this.errors = error.response?.data?.errors))
          .finally(() => (this.loading = false));
      } else this.is_form = !this.is_form;
    },
  },
};
</script>

<style scoped></style>
