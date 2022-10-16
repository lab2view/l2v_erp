<template>
  <tr>
    <td>{{ article.package.label }}</td>
    <td class="text-center">
      <BaseUpdateNumberForm
        v-if="!article.not_deletable"
        :quantity="article.quantity"
        :store-action="updateQuantity"
      />
      <span v-else>{{ article.quantity }}</span>
    </td>
    <td class="font-primary f-w-600">{{ article.name }}</td>
    <td>
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 p-0">
          <BaseButton
            type="button"
            class="btn btn-iconsolid btn-info btn-sm"
            :title="$t('common.delete')"
            @click.prevent="
              $router.push({
                name: 'article.details',
                params: { id: article.id },
              })
            "
          >
            <i class="fa fa-eye" />
          </BaseButton>
        </div>
        <div class="col-md-6 p-0">
          <BaseButton
            v-if="!article.not_deletable"
            type="button"
            class="btn btn-iconsolid btn-danger btn-sm"
            :title="$t('common.delete')"
            @click.prevent="deleteArticle(article)"
          >
            <i class="fa fa-trash-o" />
          </BaseButton>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import BaseButton from '../common/BaseButton.vue';
import BaseUpdateNumberForm from '/@/components/common/BaseUpdateNumberForm.vue';
export default {
  name: 'ProductArticleLine',
  components: { BaseUpdateNumberForm, BaseButton },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    deleteArticle(article) {
      if (confirm(this.$t('messages.confirmDelete', { label: article.name })))
        this.$store.dispatch('article/deleteArticle', article.id);
    },
    updateQuantity(quantity) {
      return this.$store.dispatch('article/updateArticle', {
        ...this.article,
        quantity,
      });
    },
  },
};
</script>

<style scoped></style>
