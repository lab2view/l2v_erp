<template>
  <base-input-group
    v-model.number="quantityField"
    text="number"
    required
    style="width: 40px"
    :disabled="!is_form"
    :errors="errors[fieldName]"
    v-bind="$attrs"
  >
    <template v-if="prefix" #prefix>
      <button
        :title="prefix"
        class="btn btn-iconsolid btn-info"
        type="button"
        :disabled="true"
      >
        {{ prefix }}
      </button>
    </template>
    <button
      :class="btnClass"
      :title="btnTitle"
      class="btn btn-iconsolid"
      type="button"
      :disabled="disabledBtn"
      @click.prevent="onInputBtnClick"
    >
      <i :class="btnIconClass"></i>
    </button>
  </base-input-group>
</template>

<script>
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
export default {
  name: 'BaseUpdateNumberForm',
  components: { BaseInputGroup },
  props: {
    quantity: {
      type: [Number, String],
      required: true,
    },
    storeAction: {
      type: Function,
      required: true,
    },
    fieldName: {
      type: String,
      default: 'quantity',
    },
    prefix: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      is_form: false,
      is_edited: false,
      errors: [],
      quantityField: null,
    };
  },
  computed: {
    btnClass() {
      return this.is_form
        ? this.is_edited
          ? 'btn-success'
          : 'btn-warning'
        : 'btn-secondary';
    },
    btnTitle() {
      return this.$t(
        `${
          this.is_form
            ? this.is_edited
              ? 'common.save'
              : 'common.cancel'
            : 'common.update'
        }`
      );
    },
    btnIconClass() {
      return this.loading
        ? 'fa fa-spin fa-refresh'
        : `fa fa-${
            this.is_form ? (this.is_edited ? 'check' : 'times') : 'edit'
          }`;
    },
    disabledBtn() {
      return this.quantityField ? parseInt(this.quantityField) <= 0 : true;
    },
  },
  watch: {
    quantityField(value) {
      this.is_edited = value !== this.quantity;
    },
  },
  created() {
    this.quantityField = this.quantity;
  },
  methods: {
    onInputBtnClick() {
      if (this.is_form) {
        if (this.is_edited) {
          this.loading = true;
          this.storeAction(this.quantityField)
            .then(() => {
              this.is_edited = false;
              this.is_form = false;
              this.errors = [];
            })
            .catch((error) => (this.errors = error.response?.data?.errors))
            .finally(() => (this.loading = false));
        } else this.is_form = false;
      } else this.is_form = !this.is_form;
    },
  },
};
</script>

<style scoped></style>
