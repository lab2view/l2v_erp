<template>
  <tr>
    <td class="font-primary">
      <div :class="{ 'checkbox checkbox-primary': !cancelSelection }">
        <input
          v-if="!cancelSelection"
          :id="`selected-${model.id}`"
          v-model="selected"
          type="checkbox"
        />
        <label
          :for="`selected-${model.id}`"
          class="mt-0 pt-0"
          :style="{ 'padding-left: 60px': !cancelSelection }"
          >{{
            `${article.product?.code} / ${article.product?.reference} ${article.name}`
          }}</label
        >
      </div>
    </td>
    <td v-if="updateDispatchName" class="text-center">
      <BaseUpdateNumberForm
        v-if="!cancelSelection"
        :quantity="forInventory ? model.new_value : model.quantity"
        :store-action="updateQuantity"
        :max="maxQuantity"
        :min="minQuantity"
      />
      <span v-else>{{ forInventory ? model.new_value : model.quantity }}</span>
    </td>
    <slot />
    <td v-if="removeDispatchName && !cancelSelection">
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
import store from '/@/store';

export default {
  components: { BaseUpdateNumberForm, BaseButton },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('article/getArticlesList', {
        page: 1,
        field: {},
      })
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    forExit: {
      type: Boolean,
      default: false,
    },
    forInventory: {
      type: Boolean,
      default: false,
    },
    selectedList: {
      type: Array,
      required: true,
    },
    updateDispatchName: {
      type: String,
      default: null,
    },
    removeDispatchName: {
      type: String,
      default: null,
    },
    cancelSelection: {
      type: Boolean,
      default: false,
    },
    minQuantity: {
      type: Number,
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
    maxQuantity() {
      return this.forExit
        ? parseInt(this.model.article.stock.available) +
            parseInt(this.model.quantity)
        : null;
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
      if (!this.cancelSelection) {
        let dataPayload = {
          ...this.model,
          old_quantity: this.model.quantity,
        };
        if (this.forInventory) dataPayload.new_value = quantity;
        else dataPayload.quantity = quantity;
        return this.$store.dispatch(this.updateDispatchName, dataPayload);
      } else Promise.resolve();
    },
  },
};
</script>

<style scoped></style>
