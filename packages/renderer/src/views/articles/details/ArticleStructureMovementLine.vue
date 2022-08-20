<template>
  <tr>
    <td>
      <div class="media">
        <div class="media-body">
          <a href="#">
            <span>{{ distribution.name }}</span>
          </a>
        </div>
      </div>
    </td>
    <td class="font-primary">
      {{ totalEntry }}
    </td>
    <td class="font-secondary">
      {{ totalExit }}
    </td>
    <td>
      <div
        class="span badge rounded-pill"
        :class="`pill-badge-${stockClassState}`"
      >
        {{ totalStock }}
      </div>
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';
import ArticleDistributionMixin from '/@/mixins/ArticleDistributionMixin';

export default {
  mixins: [ArticleDistributionMixin],
  computed: {
    ...mapGetters('article', ['article']),
  },
};
</script>

<style scoped></style>
