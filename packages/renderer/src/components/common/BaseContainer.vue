<template>
  <div class="container-fluid">
    <div class="page-header">
      <div class="row">
        <div class="col-sm">
          <h3 v-if="title">{{ title }}</h3>
          <slot name="breadcrumb"> </slot>
        </div>
        <div class="col-sm-auto">
          <!-- Bookmark Start-->
          <slot name="bookmark"></slot>
          <!-- Bookmark Ends-->
        </div>
      </div>
    </div>
  </div>
  <!-- Container-fluid starts-->
  <div class="container-fluid">
    <slot></slot>
  </div>
  <!-- Container-fluid Ends-->
</template>

<script>
export default {
  name: 'BaseContainer',
  props: {
    title: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped></style>
