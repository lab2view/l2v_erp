<template>
  <BaseContainer
    :title="$t('articles.group.listTitle')"
    :module="$t('menu.modules.articles')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('articles.group.listTitle')"
        add-action-router-name="article.group.form.desc"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="article_group/getArticleGroupList"
        entity="ArticleGroup"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="articleGroups.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.code') }}</th>
            <th>{{ $t('common.attributes.description') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="articleGroup in articleGroups" :key="articleGroup.id">
            <td>{{ articleGroup.id }}</td>
            <td>{{ articleGroup.label }}</td>
            <td>{{ articleGroup.code }}</td>
            <td>{{ truncate(articleGroup.description, 100) }}</td>
            <td>
              <BaseActionBtnGroup
                entity="ArticleGroup"
                :with-show-btn="false"
                @update="
                  $router.push({
                    name: 'article.group.form.desc',
                    params: { id: articleGroup.id },
                  })
                "
                @delete="deleteArticleGroup(articleGroup)"
              />
            </td>
          </tr>
        </BaseDatatable>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import FilterMixin from '/@/mixins/FilterMixin';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  name: 'GroupList',
  components: {
    BaseActionBtnGroup,
    BaseTableHeader,
    BaseButton,
    BaseContainer,
    BaseDatatable,
  },
  mixins: [FilterMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('article_group/getArticleGroupList', {
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
  computed: {
    ...mapGetters('article_group', ['articleGroups']),
  },

  methods: {
    deleteArticleGroup(articleGroup) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: articleGroup.label })
        )
      )
        this.$store.dispatch(
          'article_group/deleteArticleGroup',
          articleGroup.id
        );
    },
  },
};
</script>

<style scoped></style>
