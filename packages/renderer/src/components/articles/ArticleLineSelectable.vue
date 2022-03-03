<template>
  <tr>
    <td class="font-primary">
      <div class="checkbox checkbox-primary">
        <input
          :id="`selected-${model.id}`"
          v-model="selected"
          type="checkbox"
        />
        <label
          :for="`selected-${model.id}`"
          class="mt-0 pt-0"
          style="padding-left: 60px"
          >{{ `${article.name}` }}</label
        >
      </div>
    </td>
    <td v-if="hasQuantity" class="text-center">
      <BaseUpdateNumberForm
        :quantity="model.quantity"
        :store-action="updateQuantity"
      />
    </td>
    <td v-if="removeDispatchName">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 p-0">
          <BaseButton
            v-if="!model.not_deletable"
            type="button"
            class="btn btn-iconsolid btn-danger btn-sm"
            :title="$t('common.delete')"
            :loading="loading"
            @click.prevent="removeModel"
          >
            <i v-if="!loading" class="fa fa-times" />
          </BaseButton>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';
import BaseUpdateNumberForm from '/@/components/common/BaseUpdateNumberForm.vue';
export default {
  components: { BaseUpdateNumberForm, BaseButton },
  props: {
    model: {
      type: Object,
      required: true,
    },
    hasQuantity: {
      type: Boolean,
      default: true,
    },
    selectedList: {
      type: Array,
      required: true,
    },
    updateDispatchName: {
      type: String,
      required: true,
    },
    removeDispatchName: {
      type: String,
      default: null,
    },
  },
  emits: ['selected', 'unselected', 'deleted'],
  data() {
    return {
      selected: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('article', ['getArticleById']),
    article() {
      const a = this.getArticleById(this.model.article_id);
      return a ?? null;
    },
    isSelected() {
      return this.selectedList.find((id) => id === this.model.id) !== undefined;
    },
  },
  watch: {
    selected(value) {
      if (this.isSelected && !value) this.$emit('unselected');
      if (!this.isSelected && value) this.$emit('selected');
    },
    selectedList() {
      this.selected = this.isSelected;
    },
  },
  methods: {
    removeModel() {
      if (
        confirm(this.$t('messages.confirmDelete', { label: this.model.id }))
      ) {
        this.loading = true;
        this.$store
          .dispatch(this.removeDispatchName, [this.model.id])
          .then(() => {
            this.$emit('deleted');
            this.loading = false;
          });
      }
    },

    updateQuantity(quantity) {
      return this.$store.dispatch(this.updateDispatchName, {
        ...this.model,
        quantity,
      });
    },
  },
};
</script>

<style scoped></style>
