<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitForm">
      <div class="card-header pb-0">
        <h5>{{ $t('sales.discount.articles') }}</h5>
        <span>
          Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.
        </span>
      </div>
      <div class="card-body">
<!--        <ArticleSelectableList-->
<!--          :used-articles="discount_articles"-->
<!--          :submit-store-action="submitForm"-->
<!--        >-->
<!--        </ArticleSelectableList>-->
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <BaseButton
            :text="$t('common.cancel')"
            class="btn btn-secondary col-auto m-r-5"
            type="button"
            @click.prevent="$router.push({ name: 'sales.discount.form.desc' })"
          />
          <BaseButton
            :text="$t('common.save')"
            class="btn btn-primary col-auto"
            icon="fa fa-save"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// import ArticleSelectableList from '/@/components/articles/ArticleSelectableList.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';

export default {
  // components: { ArticleSelectableList, BaseButton },
  components: { BaseButton },
  data() {
    return {
      errors: [],
      formLoading: false,
      discount_articles: [],
    };
  },
  computed: {
    ...mapGetters('discount', ['discount']),
  },
  created() {
    if (this.discount && this.discount.id) {
    }
  },
  beforeUnmount() {
    this.setLoading();
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitForm(selected) {
      console.log('selected');
      console.log(selected);
      // if (this.formLoading) {
      //   return;
      // }

      // this.setLoading(true);
    },
  },
};
</script>

<style scoped></style>
