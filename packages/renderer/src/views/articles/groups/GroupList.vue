<template>
  <BaseContainer
    :title="$t('article.group.listTitle')"
    :module="$t('menu.modules.articles')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('article.group.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'article.group.form.desc' }"
              href="#"
              class="btn btn-primary"
              type="button"
            >
              <i class="fa fa-plus m-r-5" />
              {{ $t('common.add') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="articleGroups.length">
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

export default {
  components: { BaseButton, BaseContainer, BaseDatatable },
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
