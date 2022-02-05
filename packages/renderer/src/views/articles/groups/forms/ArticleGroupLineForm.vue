<template>
  <div class="card rounded shadow-sm">
    <div class="card-header p-3 bg-light">
      <h5>{{ $t('article.group.line.formTitle') }}</h5>
    </div>
    <form class="theme-form" @submit.prevent="submitArticleGroupLinesForm">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="default-according style-1 faq-accordion job-accordion">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0 p-0">
                  <button
                    class="btn btn-link ps-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseicon"
                    aria-expanded="true"
                    aria-controls="collapseicon"
                  >
                    Filter
                  </button>
                </h5>
              </div>
              <div
                id="collapseicon"
                class="collapse show"
                aria-labelledby="collapseicon"
                data-parent="#accordion"
              >
                <div class="card-body filter-cards-view animate-chk">
                  <div class="job-filter mb-3">
                    <div class="faq-form">
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Search.."
                      /><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-search search-icon"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                  </div>
                  <div class="job-filter">
                    <div class="mb-3">
                      <BaseSelect
                        v-model="product_id"
                        :label="$t('common.fields.product_filter')"
                        :options="products"
                        key-label="label"
                        key-value="id"
                      />
                    </div>
                  </div>
                  <button
                    class="btn btn-primary text-center mt-3"
                    type="button"
                  >
                    Find jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card-body">
            <div class="vertical-scroll scroll-demo">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
              <p>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum
              </p>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words
              </p>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors.
              </p>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga.
              </p>
            </div>
          </div>
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
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import store from '/@/store';

export default {
  components: { BaseButton, BaseInput, BaseSelect },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('product/getProductsList', {
        page: 1,
        field: {},
      }),
      store.dispatch('article/getArticlesList', {
        page: 1,
        field: {},
      }),
    ])
      .catch((error) => console.log(error))
      .finally(() => next());
  },
  data() {
    return {
      errors: [],
      articleGroupLines: [],
      product_id: null,
    };
  },
  computed: {
    ...mapGetters('article', ['getArticleByProductId', 'articles']),
    ...mapGetters('product', ['products']),
    selectableArticles() {
      return this.product_id
        ? this.getArticleByProductId(this.product_id)
        : this.articles;
    },
  },
  methods: {
    submitArticleGroupLinesForm() {
      console.log(this.articleGroupLines);
    },
  },
};
</script>

<style scoped></style>
