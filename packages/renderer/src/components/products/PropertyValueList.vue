<template>
  <div>
    <BaseFieldGroup>
      <template #append>
        <BaseButton
          class="btn btn-primary btn-iconsolid"
          :icon="`fa fa-${currentIndex !== null ? 'check' : 'plus'}`"
          @click="
            currentIndex !== null ? updatePropertyValue() : addPropertyValue()
          "
        />
        <BaseButton
          v-if="currentIndex !== null"
          class="btn btn-danger btn-iconsolid"
          icon="fa fa-times"
          title="Cancel"
          @click="closePropertyValueForm"
        />
      </template>
      <BaseInput
        v-model="propertyValueField.value"
        placeholder="Ajouter une nouvelle valeur"
        @keydown.enter.prevent="
          currentIndex ? updatePropertyValue() : addPropertyValue()
        "
      />
    </BaseFieldGroup>
    <hr />
    <h6 class="f-w-600">{{ $t('common.attributes.property_values') }}</h6>
  </div>
  <div class="user-status table-responsive pt-2">
    <table class="table table-bordernone table-hover">
      <thead>
        <tr>
          <th scope="col">{{ $t('common.attributes.value') }}</th>
          <th scope="col" class="text-end">
            {{ $t('common.actions') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(propertyValue, index) in modelValue" :key="`pv-${index}`">
          <td>{{ propertyValue.value }}</td>
          <td v-if="propertyValue.deleted">
            <i class="badge badge-warning"> {{ $t('common.deleted') }} </i>
          </td>
          <td v-else class="text-center">
            <a
              v-if="propertyValue.id"
              href="#"
              class="text-warning m-r-10"
              :title="$t('common.update')"
              @click.prevent="openPropertyValueForm(index, propertyValue)"
            >
              <i class="fa fa-edit f-16" />
            </a>
            <a
              href="#"
              class="text-danger f-16"
              :title="$t('common.delete')"
              @click.prevent="deletePropertyValue(index, propertyValue)"
            >
              <i class="fa fa-times" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
export default {
  components: { BaseButton, BaseInput, BaseFieldGroup },
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },

  emits: ['update:modelValue', 'deleting'],

  data() {
    return {
      currentIndex: null,
      propertyValueField: {
        id: null,
        property_id: null,
        value: null,
        deleted: false,
      },
    };
  },

  methods: {
    addPropertyValue() {
      if (this.propertyValueField.value)
        this.$emit('update:modelValue', [
          ...this.modelValue,
          { ...this.propertyValueField },
        ]);
      this.closePropertyValueForm();
    },

    openPropertyValueForm(index, propertyValue) {
      this.currentIndex = index;
      this.propertyValueField = { ...propertyValue };
    },

    closePropertyValueForm() {
      this.propertyValueField.id = null;
      this.propertyValueField.property_id = null;
      this.propertyValueField.value = null;
      this.currentIndex = null;
    },

    updatePropertyValue() {
      if (this.propertyValueField.value) {
        //console
      }
    },

    deletePropertyValue(index, propertyValue) {
      let lists = [...this.modelValue];
      if (propertyValue.id && propertyValue.property_id) {
        this.$emit(
          'update:modelValue',
          lists.map((l, i) => {
            return i === index ? { ...l, deleted: true } : l;
          })
        );
      } else
        this.$emit(
          'update:modelValue',
          lists.filter((l, key) => key !== index)
        );
    },
  },
};
</script>

<style scoped></style>
