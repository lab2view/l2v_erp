<template>
  <div>
    <div class="field is-grouped is-grouped-multiline">
      <p class="control">
        <button
          type="button"
          class="button"
          :disabled="images.length === 10"
          @click="add"
        >
          Add
        </button>
      </p>
      <p class="control">
        <button
          type="button"
          class="button"
          :disabled="images.length === 0"
          @click="remove"
        >
          Remove
        </button>
      </p>
    </div>

    <div ref="el" v-viewer="options" class="">
      <template v-for="{ source, thumbnail, title } in images" :key="source">
        <img
          class="image"
          :src="thumbnail"
          :data-source="source"
          :alt="title"
          @contextmenu="openContextMenu"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, ref } from 'vue';
import VueViewer, { directive } from 'v-viewer';
import 'viewerjs/dist/viewer.css';
VueViewer.setDefaults({
  zIndex: 2021,
});

let sourceImages = [];
const base = Math.floor(Math.random() * 60) + 10;
for (let i = 0; i < 10; i++) {
  sourceImages.push({
    source: `https://picsum.photos/id/${base + i}/1440/900`,
    thumbnail: `https://picsum.photos/id/${base + i}/346/216`,
    title: `Image: ${base + i}`,
  });
}
export default defineComponent({
  directives: {
    viewer: directive({
      debug: true,
    }),
  },
  setup() {
    const el = (ref < HTMLElement) | (null > null);
    const state = reactive({
      options: {
        url: 'data-source',
        inline: false,
        button: true,
        navbar: true,
        title: false,
        toolbar: true,
        tooltip: false,
        movable: false,
        zoomable: true,
        rotatable: false,
        scalable: false,
        transition: true,
        fullscreen: false,
        keyboard: false,
      },
      images: [...sourceImages].splice(0, 5),
    });
    function toggleToolbar(toolbar) {
      state.options.toolbar = toolbar;
    }
    function add() {
      state.images.push(sourceImages[state.images.length]);
    }
    function remove() {
      state.images.pop();
    }
    function show() {
      el.value && el.value.$viewer.show();
    }
    return {
      ...toRefs(state),
      el,
      add,
      remove,
      stop,
      show,
      toggleToolbar,
    };
  },
  methods: {
    openContextMenu() {
      //alert('sdflsdfkjsdflkj');
    },
  },
});
</script>

<style scoped>
.image {
  width: calc(20% - 10px);
  cursor: pointer;
  margin: 5px;
  display: inline-block;
}
</style>
