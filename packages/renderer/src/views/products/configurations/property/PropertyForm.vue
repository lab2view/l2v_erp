<template>
  <BaseFormModal
    :title="title"
    :modal-size="isListPropertyType ? 'lg' : ''"
    :submit-form="submitPropertyForm"
  >
    <div class="row">
      <div class="col-md">
        <div v-if="!product" class="mb-3">
          <BaseFieldGroup
            :with-refresh="true"
            :with-append="false"
            :label="$t('common.attributes.product_family')"
            refresh-action-name="product_family/getProductFamiliesList"
          >
            <BaseSelect
              v-model.number="propertyForm.product_family_id"
              :options="productFamilies"
              :placeholder="
                $t('common.field_for_specific', {
                  liaison: $t('common.la'),
                  element: $t('common.attributes.product_family'),
                })
              "
              key-label="label"
              key-value="id"
              :errors="errors?.product_family_id"
            />
          </BaseFieldGroup>
        </div>
        <div v-if="!product" class="mb-3">
          <BaseFieldGroup
            :with-refresh="true"
            :with-append="false"
            :label="$t('common.attributes.product_type')"
            refresh-action-name="product_type/getProductTypesList"
          >
            <BaseSelect
              v-model.number="propertyForm.product_type_id"
              :placeholder="
                $t('common.field_for_specific', {
                  liaison: $t('common.le'),
                  element: $t('common.attributes.product_type'),
                })
              "
              :options="productTypes"
              key-label="label"
              key-value="id"
              :errors="errors?.product_type_id"
            />
          </BaseFieldGroup>
        </div>
        <div class="mb-3">
          <BaseFieldGroup
            :with-refresh="true"
            :with-append="false"
            :label="$t('common.attributes.property_type')"
            refresh-action-name="property/getPropertyTypes"
          >
            <BaseSelect
              v-model.number="propertyForm.property_type_id"
              :options="propertyTypes"
              key-label="label"
              key-value="id"
              required
              :errors="errors?.property_type_id"
            />
          </BaseFieldGroup>
        </div>
        <div class="mb-3">
          <BaseInput
            v-model="propertyForm.label"
            :label="$t('common.attributes.label')"
            placeholder="E.g. collections"
            :errors="errors?.label"
            required
          />
        </div>
      </div>
      <div v-if="isListPropertyType" class="col-md-7">
        <PropertyValueList v-model="propertyValues" />
      </div>
    </div>
    <template #footer>
      <BaseButton
        class="btn btn-primary col-auto"
        :text="$t('common.save')"
        icon="fa fa-save"
        :loading="loading"
      />
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '../../../../components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';
import store from '../../../../store';
import BaseSelect from '../../../../components/common/BaseSelect.vue';
import BaseInput from '../../../../components/common/BaseInput.vue';
import PropertyValueList from '/@/components/products/PropertyValueList.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';

export default {
  name: 'PropertyForm',
  components: {
    BaseFieldGroup,
    BaseButton,
    PropertyValueList,
    BaseInput,
    BaseSelect,
    BaseFormModal,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('product_family/getProductFamiliesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('product_type/getProductTypesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('property/getPropertyTypes'),
    ])
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
      error: null,
      loading: false,
      propertyForm: {
        id: null,
        property_type_id: null,
        product_id: null,
        product_family_id: null,
        product_type_id: null,
        label: null,
        placeholder: null,
      },
      propertyValues: [],
    };
  },
  computed: {
    ...mapGetters('property', [
      'property',
      'propertyTypes',
      'getPropertyTypeById',
    ]),
    ...mapGetters('product', ['getProductById']),
    ...mapGetters('product_family', ['productFamilies']),
    ...mapGetters('product_type', ['productTypes']),

    propertyType() {
      return this.propertyForm.property_type_id
        ? this.getPropertyTypeById(this.propertyForm.property_type_id)
        : null;
    },

    isListPropertyType() {
      return this.propertyType?.is_list;
    },

    title() {
      return this.property
        ? this.$t('products.property.formUpdateTitle')
        : this.$t('products.property.formCreateTitle');
    },

    product() {
      return this.$route.params?.id &&
        this.$route.name === 'product.form.setting.property.form.property'
        ? this.getProductById(parseInt(this.$route.params.id))
        : null;
    },
  },
  created() {
    if (this.property) {
      this.propertyForm = { ...this.property };
      this.propertyValues = this.property.property_values;
    } else {
      if (this.product) {
        this.propertyForm.product_id = this.product.id;
        this.propertyForm.product_type_id = this.product.product_type_id;
        this.propertyForm.product_family_id =
          this.product.product_type.product_family_id;
      }
    }
  },
  beforeUnmount() {
    if (this.property)
      this.$store.commit('property/SET_CURRENT_PROPERTY', null);
  },
  methods: {
    submitPropertyForm() {
      if (this.loading) return;

      if (this.property) {
        this.loading = true;
        this.$store
          .dispatch('property/updateProperty', this.propertyForm)
          .then((property) => {
            this.$store.commit('property/SET_CURRENT_PROPERTY', property);
            const adding = this.propertyValues.filter((pv) => pv.id === null);
            const deleting = this.propertyValues.filter((pv) => pv.deleted);
            if (adding.length && deleting.length) {
              const productValueIds = deleting.map((d) => d.id);
              Promise.all([
                this.$store.dispatch('property/addPropertyValues', {
                  values: this.propertyValues,
                }),
                this.$store.dispatch(
                  'property/removePropertyValues',
                  productValueIds
                ),
              ])
                .then(() => this.$router.back())
                .catch((error) => {
                  console.log(error);
                  this.error = error.response?.data?.message;
                });
            } else {
              if (adding.length)
                this.$store
                  .dispatch('property/addPropertyValues', {
                    values: this.propertyValues,
                  })
                  .then(() => this.$router.back())
                  .catch((error) => {
                    console.log(error);
                    this.error = error.response?.data?.message;
                  });
              if (deleting.length) {
                const productValueIds = deleting.map((d) => d.id);
                this.$store
                  .dispatch('property/removePropertyValues', productValueIds)
                  .then(() => this.$router.back())
                  .catch((error) => {
                    console.log(error);
                    this.error = error.response?.data?.message;
                  });
              }
            }
            this.$router.back();
          })
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      } else {
        let canProcess = this.propertyType?.is_list
          ? this.propertyValues.length
          : true;
        if (canProcess) {
          this.loading = true;
          this.$store
            .dispatch('property/addProperty', this.propertyForm)
            .then((property) => {
              if (this.propertyValues.length) {
                this.$store.commit('property/SET_CURRENT_PROPERTY', property);
                this.$store
                  .dispatch('property/addPropertyValues', {
                    values: this.propertyValues,
                  })
                  .then(() => this.$router.back())
                  .catch((error) => {
                    this.error = error.response?.data?.message;
                  });
              } else this.$router.back();
            })
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            });
        } else this.error = 'Veuillez entrez les elemeents de la liste';
      }
    },
  },
};
</script>

<style scoped></style>
