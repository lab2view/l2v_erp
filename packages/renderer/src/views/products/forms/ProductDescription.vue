<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitProductForm">
      <div class="card-header pb-0">
        <h5>{{ $t('product.form.description') }}</h5>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <BaseTextArea
            v-model="descriptionField"
            rows="10"
            placeholder="Description..."
            :errors="errors?.description"
          />
        </div>
        <div class="row justify-content-center">
          <BaseButton
            class="btn btn-primary col-auto"
            :text="$t('common.save')"
            icon="fa fa-save"
            :disabled="!is_edited"
            :loading="loading"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseTextArea from '/@/components/common/BaseTextArea.vue';
import { mapGetters } from 'vuex';
export default {
  components: { BaseTextArea, BaseButton },
  data() {
    return {
      errors: [],
      descriptionField: null,
      is_edited: true,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('product', ['product']),
  },
  watch: {
    descriptionField(value) {
      if (value !== this.product.description) this.is_edited = true;
    },
  },
  created() {
    this.descriptionField = this.product.description;
  },
  methods: {
    submitProductForm() {
      if (this.is_edited) {
        this.loading = true;
        this.$store
          .dispatch('product/updateProduct', {
            ...this.product,
            description: this.descriptionField,
          })
          .then(() => (this.is_edited = false))
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>

<style scoped></style>
