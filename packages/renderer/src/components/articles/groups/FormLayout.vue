<template>
  <BaseContainer
    :title="$t('article.title')"
    :module="$t('menu.modules.articles')"
  >
    <div class="card">
      <BaseWizardStep :links="items" />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '../../common/BaseContainer.vue';
import formRoutes from '../../../router/article/group/formRoutes';
import BaseWizardStep from '../../common/BaseWizardStep.vue';
import ArticleGroupMixin from '../../../mixins/ArticleGroupMixin';

export default {
  components: { BaseWizardStep, BaseContainer },
  mixins: [ArticleGroupMixin],
  computed: {
    items() {
      let results = Object.assign([], formRoutes);
      return results.map((agfr) => {
        return {
          name: agfr.name,
          code: agfr.meta.code,
          icon: agfr.meta.icon,
          title: agfr.meta.title ?? null,
          disabled: agfr.meta.requireArticleGroup
            ? !this.haveArticleGroup
            : false,
          class: `${this.haveArticleGroup ? 'activated' : ''} ${
            RegExp(`^${agfr.name}*`).test(this.$route.name) ? 'active' : ''
          }`,
        };
      });
    },
  },
  beforeUnmount() {
    this.$store.commit('article_group/SET_CURRENT_ARTICLE_GROUP', null);
  },
};
</script>

<style scoped></style>
