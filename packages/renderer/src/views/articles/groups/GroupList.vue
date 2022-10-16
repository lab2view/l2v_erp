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
              <BaseButton
                type="button"
                class="btn btn-iconsolid btn-info btn-sm"
                :title="$t('common.update')"
                @click.prevent="
                  $router.push({
                    name: 'article.group.form.desc',
                    params: { id: articleGroup.id },
                  })
                "
              >
                <i class="fa fa-edit" />
              </BaseButton>
              <BaseButton
                v-if="!articleGroup.not_deletable"
                type="button"
                class="btn btn-iconsolid btn-danger btn-sm m-l-5"
                :title="$t('common.delete')"
                @click.prevent="deleteArticleGroup(articleGroup)"
              >
                <i class="fa fa-trash-o" />
              </BaseButton>
            </td>
          </tr>
        </BaseDatatable>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '../../../store';
import { mapGetters } from 'vuex';
import BaseContainer from '../../../components/common/BaseContainer.vue';
import BaseButton from '../../../components/common/BaseButton.vue';
import FilterMixin from '/@/mixins/FilterMixin.js';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  name: 'GroupList',
  components: { BaseTableHeader, BaseButton, BaseContainer, BaseDatatable },
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
