<template>
  <div class="card rounded shadow-sm">
    <div class="card-header p-3 bg-light">
      <h5>{{ $t('articles.form.createTitle') }}</h5>
    </div>
    <form class="theme-form" @submit.prevent="submitProductArticleForm">
      <div class="card-body pb-0 pt-2">
        <div class="mb-3">
          <BaseFieldGroup
            :label="$t('common.attributes.package_id')"
            required
            :errors="errors?.package_id"
            @btn-click="
              $router.push({ name: 'products.form.article.form.package' })
            "
          >
            <BaseSelect
              v-model="articleForm.package_id"
              :options="selectPackages"
              key-label="label"
              key-value="id"
              required
            />
          </BaseFieldGroup>
        </div>
        <div class="mb-3">
          <BaseInput
            v-model="articleForm.quantity"
            :label="$t('common.attributes.quantity')"
            type="number"
            placeholder="E.g. 2"
            :errors="errors?.quantity"
            required
          />
        </div>
      </div>
      <div class="card-footer pt-2 pb-2">
        <div class="row justify-content-center align-items-center">
          <BaseButton
            type="button"
            class="btn btn-secondary col-auto m-r-5"
            :text="$t('common.cancel')"
            @click.prevent="$router.back()"
          />
          <BaseButton
            class="btn btn-primary col-auto"
            :text="$t('common.save')"
            icon="fa fa-save"
          />
        </div>
      </div>
    </form>
  </div>
  <router-view />
</template>

<script>
import { mapGetters } from 'vuex';
import BaseInput from '../../../components/common/BaseInput.vue';
import BaseSelect from '../../../components/common/BaseSelect.vue';
import { unitPackageCode } from '/@/helpers/codes.js';
import BaseButton from '../../../components/common/BaseButton.vue';
import BaseFieldGroup from '../../../components/common/BaseFieldGroup.vue';
import store from '../../../store';

export default {
  components: { BaseFieldGroup, BaseButton, BaseInput, BaseSelect },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('package/getPackageList', {
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
  data() {
    return {
      errors: [],
      articleForm: {
        package_id: null,
        quantity: null,
      },
    };
  },
  computed: {
    ...mapGetters('package', ['packages']),
    ...mapGetters('product', ['product']),
    selectPackages() {
      return this.packages.filter((p) => p.code !== unitPackageCode);
    },
  },
  methods: {
    submitProductArticleForm() {
      this.$store
        .dispatch('article/addArticle', {
          ...this.articleForm,
          product_id: this.product.id,
        })
        .then(() => {
          this.$router.back();
        })
        .catch((error) => {
          this.errors = error.response?.data?.errors;
        });
    },
  },
};
</script>

<style scoped></style>
