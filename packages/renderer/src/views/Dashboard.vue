<template>
  <BaseContainer title="Dashboard">
    <template v-if="false" #breadcrumb>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item">Pages</li>
        <li class="breadcrumb-item active">Sample Page</li>
      </ol>
    </template>
    <!--    <template #bookmark>-->
    <!--      <Bookmark />-->
    <!--    </template>-->

    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header pb-0">
            <h5>Sample Card</h5>
            <span
              >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
            >
          </div>
          <div class="card-body">
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import { defineComponent } from 'vue';
// import Bookmark from '/@/components/layouts/Bookmark.vue';
import BaseContainer from '/@/components/common/BaseContainer.vue';

export default defineComponent({
  components: { BaseContainer },
  computed: {
    bookmarkItems() {
      return [
        {
          to: '',
          title: 'Notifications',
          feather: 'inbox',
        },
      ];
    },
  },
});
</script>

<style scoped></style>
