<template>
  <div class="container-fluid">
    <div class="page-header">
      <div class="row">
        <div class="col-sm">
          <h3 v-if="title">{{ title }}</h3>
          <slot name="breadcrumb">
            <ol v-if="showBreadcrumb" class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'dashboard' }">
                  <i class="fa fa-home f-18"></i>
                </router-link>
              </li>
              <li v-if="module" class="breadcrumb-item">{{ module }}</li>
              <li v-if="$route.meta.code" class="breadcrumb-item active">
                {{ $t(`menu.${$route.meta.code.toString().toLowerCase()}`) }}
              </li>
            </ol>
          </slot>
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
    module: {
      type: String,
      default: null,
    },
  },
  computed: {
    showBreadcrumb() {
      return this.module || this.$route.meta.code;
    },
  },
};
</script>

<style scoped></style>
