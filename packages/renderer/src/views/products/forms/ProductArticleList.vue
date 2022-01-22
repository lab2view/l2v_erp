<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <router-view />
    </div>
  </div>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>{{ `${$t('article.listTitle')} - ${product.reference}` }}</h5>
        </div>
        <div
          v-if="$route.name === 'product.form.article'"
          class="col-sm-auto align-items-end"
        >
          <router-link
            :to="{ name: 'product.form.article.form' }"
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
      <div class="user-status table-responsive">
        <table class="table table-bordernone">
          <thead>
            <tr>
              <th scope="col">{{ $t('common.attributes.package_id') }}</th>
              <th scope="col">{{ $t('common.attributes.quantity') }}</th>
              <th scope="col">{{ $t('common.attributes.description') }}</th>
              <th scope="col">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(article, index) in articles" :key="index">
              <td>{{ article.package.label }}</td>
              <td>{{ article.quantity }}</td>
              <td class="font-primary f-w-600">{{ article.name }}</td>
              <td>
                <BaseButton
                  v-if="!article.not_deletable"
                  type="button"
                  class="btn btn-iconsolid btn-danger btn-sm"
                  :title="$t('common.delete')"
                  @click.prevent="deleteArticle(article)"
                >
                  <i class="fa fa-trash-o" />
                </BaseButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '../../../components/common/BaseButton.vue';

export default {
  components: { BaseButton },
  computed: {
    ...mapGetters('product', ['product', 'articles']),
  },
  methods: {
    deleteArticle(article) {
      if (confirm(this.$t('messages.confirmDelete', { label: article.name })))
        this.$store.dispatch('product/deleteArticle', article.id);
    },
  },
};
</script>

<style scoped></style>
