<!--<template>-->
<!--  <div ref="el" v-viewer="options" class="">-->
<!--    <template v-for="{ source, thumbnail, title, id } in images" :key="source">-->
<!--      <img-->
<!--        class="image"-->
<!--        :src="thumbnail"-->
<!--        :data-source="source"-->
<!--        :alt="title"-->
<!--        @contextmenu.prevent="onContextMenu($event, id)"-->
<!--      />-->
<!--    </template>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';-->
<!--import { defineComponent, toRefs, reactive, ref } from 'vue';-->
<!--import VueViewer, { directive } from 'v-viewer';-->
<!--import 'viewerjs/dist/viewer.css';-->

<!--VueViewer.setDefaults({-->
<!--  zIndex: 2021,-->
<!--});-->

<!--export default defineComponent({-->
<!--  directives: {-->
<!--    viewer: directive({-->
<!--      debug: true,-->
<!--    }),-->
<!--  },-->
<!--  props: {-->
<!--    medias: {-->
<!--      type: Array,-->
<!--      required: true,-->
<!--    },-->
<!--  },-->
<!--  emits: ['cover', 'delete'],-->
<!--  setup(props, context) {-->
<!--    const el = (ref < HTMLElement) | (null > null);-->
<!--    const state = reactive({-->
<!--      options: {-->
<!--        url: 'data-source',-->
<!--        inline: false,-->
<!--        button: true,-->
<!--        navbar: true,-->
<!--        title: false,-->
<!--        toolbar: true,-->
<!--        tooltip: false,-->
<!--        movable: false,-->
<!--        zoomable: true,-->
<!--        rotatable: false,-->
<!--        scalable: false,-->
<!--        transition: true,-->
<!--        fullscreen: false,-->
<!--        keyboard: false,-->
<!--      },-->
<!--    });-->
<!--    function toggleToolbar(toolbar) {-->
<!--      state.options.toolbar = toolbar;-->
<!--    }-->
<!--    function show() {-->
<!--      el.value && el.value.$viewer.show();-->
<!--    }-->
<!--    function onContextMenu(e, id) {-->
<!--      this.$contextmenu({-->
<!--        x: e.x,-->
<!--        y: e.y,-->
<!--        items: [-->
<!--          {-->
<!--            label: 'Couverture',-->
<!--            icon: 'fa fa-image',-->
<!--            onClick: () => context.emit('cover', id),-->
<!--          },-->
<!--          {-->
<!--            label: 'Supprimer',-->
<!--            icon: 'fa fa-trash',-->
<!--            onClick: () => context.emit('delete', id),-->
<!--          },-->
<!--          // {-->
<!--          //   label: 'A submenu',-->
<!--          //   children: [-->
<!--          //     { label: 'Item1' },-->
<!--          //     { label: 'Item2' },-->
<!--          //     { label: 'Item3' },-->
<!--          //   ],-->
<!--          // },-->
<!--        ],-->
<!--      });-->
<!--    }-->

<!--    return {-->
<!--      ...toRefs(state),-->
<!--      el,-->
<!--      stop,-->
<!--      show,-->
<!--      toggleToolbar,-->
<!--      onContextMenu,-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    images() {-->
<!--      return this.medias.map((m) => {-->
<!--        return {-->
<!--          source: m.url,-->
<!--          thumbnail: m.thumb_url,-->
<!--          title: m.name,-->
<!--          id: m.id,-->
<!--        };-->
<!--      });-->
<!--    },-->
<!--  },-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--.image {-->
<!--  width: calc(20% - 10px);-->
<!--  cursor: pointer;-->
<!--  margin: 5px;-->
<!--  display: inline-block;-->
<!--}-->
<!--</style>-->
