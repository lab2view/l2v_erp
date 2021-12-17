<template>
  <div id="pageWrapper" class="page-wrapper">
    <!-- Page Header Start-->
    <Header/>
    <!-- Page Header Ends                              -->
    <!-- Page Body Start-->
    <div class="page-body-wrapper horizontal-menu">
      <!-- Page Sidebar Start-->
      <Menu/>
      <!-- Page Sidebar Ends-->
      <div class="page-body">
        <router-view/>
      </div>
      <!-- footer start-->
      <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6 footer-copyright">
              <p class="mb-0">Copyright 2021-22 © viho All rights reserved.</p>
            </div>
            <div class="col-md-6">
              <p class="pull-right mb-0">Hand crafted & made with <i class="fa fa-heart font-secondary"></i></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import Header from '/@/components/layouts/Header.vue';
import Menu from '/@/components/layouts/Menu.vue';
export default defineComponent({
  name: "Page",
  components: {Menu, Header},
})
</script>

<style scoped>

</style>
