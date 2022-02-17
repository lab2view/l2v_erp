<template>
  <tr>
    <td class="font-primary">
      <div class="checkbox checkbox-primary">
        <input
          :id="`selected-${articleGroupLine.id}`"
          v-model="selected"
          type="checkbox"
        />
        <label
          :for="`selected-${articleGroupLine.id}`"
          class="mt-0 pt-0"
          style="padding-left: 60px"
          >{{ `${article.name}` }}</label
        >
      </div>
    </td>
    <td class="text-center">
      <BaseUpdateNumberForm
        :model="articleGroupLine"
        :store-action="updateQuantity"
      />
    </td>
    <td>
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 p-0">
          <BaseButton
            v-if="!articleGroupLine.not_deletable"
            type="button"
            class="btn btn-iconsolid btn-danger btn-sm"
            :title="$t('common.delete')"
            @click.prevent="removeArticleGroupLine"
          >
            <i class="fa fa-times" />
          </BaseButton>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import BaseButton from '../../common/BaseButton.vue';
import { mapGetters } from 'vuex';
import BaseUpdateNumberForm from '/@/components/common/BaseUpdateNumberForm.vue';
export default {
  components: { BaseUpdateNumberForm, BaseButton },
  props: {
    articleGroupLine: {
      type: Object,
      required: true,
    },
    selectedList: {
      type: Array,
      required: true,
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
      const a = this.getArticleById(this.articleGroupLine.article_id);
      return a ?? null;
    },
    isSelected() {
      return (
        this.selectedList.find((id) => id === this.articleGroupLine.id) !==
        undefined
      );
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
    removeArticleGroupLine() {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: this.articleGroupLine.id })
        )
      ) {
        this.loading = true;
        this.$store
          .dispatch('article_group/removeArticleGroupLines', [
            this.articleGroupLine.id,
          ])
          .then(() => {
            this.$emit('deleted');
            this.loading = false;
          });
      }
    },

    updateQuantity(data) {
      return this.$store.dispatch('article_group/updateArticleGroupLine', data);
    },
  },
};
</script>

<style scoped></style>
