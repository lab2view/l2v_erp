<template>
  <BaseContainer
    :title="$t('articles.title')"
    :module="$t('menu.modules.articles')"
  >
    <div class="card">
      <div class="card-header">
        <h5 class="pull-left">
          {{ `#${article.name}` }}
        </h5>
      </div>
      <div class="card-body p-0">
        <div class="tabbed-card">
          <ul
            id="top-tabdanger"
            class="pull-right nav nav-tabs border-tab nav-success"
            role="tablist"
          >
            <li class="nav-item">
              <router-link
                :to="{ name: 'article.details', params: $route.params }"
                class="nav-link"
                active-class="active"
              >
                <i class="icofont icofont-chart-bar-graph"></i>
                {{ $t('menu.article.detail') }}
              </router-link>
              <div class="material-border"></div>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'article.prices', params: $route.params }"
                class="nav-link"
                active-class="active"
              >
                <i class="icofont icofont-money"></i>
                {{ $t('menu.article.price') }}
              </router-link>
              <div class="material-border"></div>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'article.compositions', params: $route.params }"
                :class="`nav-link ${compositionActiveClass}`"
              >
                <i class="icofont icofont-bricks"></i>
                {{ $t('menu.article.composition') }}
              </router-link>
              <div class="material-border"></div>
            </li>
          </ul>
          <router-view :article="article"></router-view>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'DetailLayout',
  components: { BaseContainer },
  computed: {
    ...mapGetters('article', ['article']),
    compositionActiveClass() {
      return RegExp(`^article.composition*`).test(this.$route.name)
        ? 'active'
        : '';
    },
  },
};
</script>

<style scoped></style>
