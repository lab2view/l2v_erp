<template>
  <tr>
    <td>
      <div class="checkbox checkbox-solid-primary">
        <input v-model="selected" type="checkbox" />
      </div>
    </td>
    <td class="font-primary f-w-600">{{ article?.name }}</td>
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
export default {
  components: { BaseButton },
  props: {
    articleGroupLine: {
      type: Object,
      required: true,
    },
    selectAll: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['selected', 'unselected'],
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
  },
  watch: {
    selected(value) {
      if (!this.selectAll) this.$emit(`${value ? 'selected' : 'unselected'}`);
    },
  },
  created() {
    if (this.selectAll) this.selected = true;
  },
  methods: {
    removeArticleGroupLine() {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: this.articleGroupLine.id })
        )
      )
        console.log(this.articleGroupLine);
    },
  },
};
</script>

<style scoped></style>
