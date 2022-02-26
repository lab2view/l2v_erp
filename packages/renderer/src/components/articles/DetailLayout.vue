<template>
  <BaseContainer
    :title="$t('article.title')"
    :module="$t('menu.modules.articles')"
  >
    <div class="card">
      <div class="card-header">
        <h5 class="pull-left">Material tab with color</h5>
      </div>
      <div class="card-body">
        <div class="tabbed-card">
          <ul
            id="top-tabdanger"
            class="pull-right nav nav-tabs border-tab nav-success"
            role="tablist"
          >
            <li class="nav-item">
              <a
                id="top-home-danger"
                class="nav-link"
                data-bs-toggle="tab"
                href="#top-homedanger"
                role="tab"
                aria-controls="top-homedanger"
                aria-selected="false"
                ><i class="icofont icofont-ui-home"></i>Home</a
              >
              <div class="material-border"></div>
            </li>
            <li class="nav-item">
              <a
                id="profile-top-danger"
                class="nav-link"
                data-bs-toggle="tab"
                href="#top-profiledanger"
                role="tab"
                aria-controls="top-profiledanger"
                aria-selected="false"
                ><i class="icofont icofont-man-in-glasses"></i>Profile</a
              >
              <div class="material-border"></div>
            </li>
            <li class="nav-item">
              <a
                id="contact-top-danger"
                class="nav-link active"
                data-bs-toggle="tab"
                href="#top-contactdanger"
                role="tab"
                aria-controls="top-contactdanger"
                aria-selected="true"
                ><i class="icofont icofont-contacts"></i>Contact</a
              >
              <div class="material-border"></div>
            </li>
          </ul>
          <div class="tab-content">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
export default {
  name: 'DetailLayout',
  components: { BaseContainer },
};
</script>

<style scoped></style>
