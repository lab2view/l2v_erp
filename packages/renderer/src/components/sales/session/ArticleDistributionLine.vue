<template>
  <li
    class="list-group-item p-1 d-flex justify-content-between align-items-center"
  >
    <span class="f-w-600">{{
      distribution.name.toString().toUpperCase()
    }}</span>
    <span :class="`badge badge-${stockClassState} counter`">{{
      totalStock
    }}</span>
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
  methods: {
    openReservationForm() {
      alert('Coming soon ...');
    },
  },
};
</script>

<style scoped></style>
