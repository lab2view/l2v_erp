<template>
  <div>
    <div class="dropzone dropzone-primary p-2 m-3" v-bind="getRootProps()">
      <input v-bind="getInputProps()" />
      <div class="dz-message needsclick">
        <i class="icon-cloud-up"></i>
        <h6>Drop files here or click to upload.</h6>
        <i v-if="loading" class="fa fa-spin fa-spinner"></i>
        <span v-else class="note needsclick">
          (This is just a demo dropzone. Selected files are
          <strong>not</strong> actually uploaded.)</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useDropzone } from 'vue3-dropzone';
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  props: {
    context: {
      type: String,
      required: true,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
  },
  emits: ['uploaded'],
  setup(props, context) {
    const store = useStore();

    let loading = ref(false);

    const saveFiles = (files) => {
      const formData = new FormData();
      for (let x = 0; x < files.length; x++) {
        formData.append('files[]', files[x]);
      }
      formData.append('context', props.context);

      loading = true;
      store
        .dispatch('upload', formData)
        .then((data) => {
          context.emit('uploaded', data);
          loading = false;
        })
        .catch((error) => {
          console.log(error);
          console.log(error?.response?.data);
        });
    };

    function onDrop(acceptFiles, rejectReasons) {
      saveFiles(acceptFiles);
      if (rejectReasons.length > 0) console.log(rejectReasons);
    }

    const { getRootProps, getInputProps, ...rest } = useDropzone({
      onDrop,
      accept: props.accept,
    });

    return {
      getRootProps,
      getInputProps,
      ...rest,
      loading,
    };
  },
};
</script>

<style scoped>
@import '../../assets/css/dropzone.css';
</style>
