<template>
  <div class="gallery my-gallery card-body row justify-content-center">
    <figure
      v-for="(item, index) in items"
      :key="index"
      :class="itemClass"
      itemprop="associatedMedia"
      itemscope=""
    >
      <a :href="item.url ?? item" itemprop="contentUrl">
        <img
          class="img-thumbnail"
          :src="item.url ?? item"
          itemprop="thumbnail"
          :alt="item?.label"
      /></a>
      <figcaption v-if="item.label" itemprop="caption description">
        {{ item.label }}
      </figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    itemClass: {
      type: String,
      default: 'col-md-2',
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
