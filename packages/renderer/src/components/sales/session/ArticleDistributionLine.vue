<template>
  <li
    class="list-group-item p-1 d-flex justify-content-between align-items-center"
  >
    <div v-if="visibility" class="m-r-5" title="Visible">
      <span class="fa fa-check-circle font-primary" />
    </div>
    <div class="m-r-5">
      <span class="f-w-600 m-r-5">{{ distributionName }}</span>
      <span :class="`badge badge-${stockClassState} counter`">{{
        totalStock
      }}</span>
    </div>
    <BaseButton
      :title="$t('common.reserve')"
      type="button"
      class="btn btn-pill btn-sm btn-outline-success btn-air-success"
      @click.prevent="openReservationForm"
      >{{ $t('common.reserve') }}
    </BaseButton>
  </li>
</template>

<script>
import ArticleDistributionMixin from '/@/mixins/ArticleDistributionMixin';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: { BaseButton },
  mixins: [ArticleDistributionMixin],
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    visibility() {
      if (this.article.product?.enterprises.length > 0)
        return (
          this.article.product?.enterprises.find(
            (e) => e.id === this.distribution.id
          ) !== undefined
        );
      else return true;
    },
    distributionName() {
      return this.visibility
        ? this.distribution.name.toUpperCase()
        : this.distribution.name;
    },
  },
  methods: {
    openReservationForm() {
      alert('Coming soon ...');
    },
  },
};
</script>

<style scoped></style>
