<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitArticleGroupForm">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
      </div>
      <div class="card-body">
        <div class="row justify-content-center align-items-center mb-3">
          <div class="col-md">
            <BaseInput
              v-model="articleGroupForm.label"
              :label="$t('common.attributes.label')"
              type="text"
              placeholder="E.g. Super PROMO"
              :errors="errors?.label"
              required
            />
          </div>
          <div class="col-md">
            <BaseInputGroup
              v-model="articleGroupForm.code"
              :label="$t('common.attributes.code')"
              placeholder="E.g. SPROMO"
              :errors="errors?.code"
              required
              :disabled="isUpdating"
            >
              <button
                :disabled="isUpdating"
                type="button"
                class="btn btn-success btn-iconsolid"
                :title="$t('common.shuffle')"
                @click.prevent="generateReference"
              >
                <i class="fa fa-random"></i>
              </button>
            </BaseInputGroup>
          </div>
        </div>
        <div class="mb-3">
          <BaseTextArea
            v-model="articleGroupForm.description"
            rows="4"
            :label="$t('common.attributes.description')"
            placeholder="E.g. Desc. Super PROMO"
            :errors="errors?.description"
            required
          />
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <BaseButton
            type="button"
            class="btn btn-secondary col-auto m-r-5"
            :text="$t('common.cancel')"
            @click.prevent="$router.push({ name: 'article.groups' })"
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
</template>

<script>
import BaseButton from '../../../../components/common/BaseButton.vue';
import BaseTextArea from '../../../../components/common/BaseTextArea.vue';
import ArticleGroupMixin from '../../../../mixins/ArticleGroupMixin';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import { random } from 'lodash/number';

export default {
  components: {
    BaseTextArea,
    BaseInput,
    BaseButton,
    BaseInputGroup,
  },
  mixins: [ArticleGroupMixin],
  data() {
    return {
      errors: [],
      is_edited: false,
      articleGroupForm: {
        label: null,
        code: null,
        description: null,
      },
    };
  },
  computed: {
    formTitle() {
      return this.articleGroup
        ? this.$t('articles.group.formUpdateTitle')
        : this.$t('articles.group.formCreateTitle');
    },
    isUpdating() {
      return !!this.articleGroup;
    },
  },
  watch: {
    articleGroupForm: {
      deep: true,
      handler() {
        this.is_edited = true;
      },
    },
  },
  created() {
    if (this.haveArticleGroup)
      this.articleGroupForm = Object.assign({}, this.articleGroup);
  },
  methods: {
    generateReference() {
      //todo complete generating ref algorithm for exit stock
      this.articleGroupForm.code = `STE-EXIT-${new Date().getDay()}-${random(
        1000,
        1000000
      )}`;
    },
    submitArticleGroupForm() {
      if (this.haveArticleGroup) {
        if (this.is_edited)
          this.$store
            .dispatch('article_group/updateArticleGroup', this.articleGroupForm)
            .then((articleGroup) =>
              this.$router.push({
                name: 'article.group.form.item',
                params: { id: articleGroup.id },
              })
            )
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            });
        else
          this.$router.push({
            name: 'article.group.form.item',
            params: { id: this.articleGroup.id },
          });
      } else
        this.$store
          .dispatch('article_group/addArticleGroup', this.articleGroupForm)
          .then((articleGroup) =>
            this.$router.push({
              name: 'article.group.form.item',
              params: { id: articleGroup.id },
            })
          )
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
    },
  },
};
</script>

<style scoped></style>
