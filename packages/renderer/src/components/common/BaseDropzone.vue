<template>
  <div>
    <div class="dropzone dropzone-primary p-2 m-3" v-bind="getRootProps()">
      <input v-bind="getInputProps()" :disabled="loading" />
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

export default {
  props: {
    accept: {
      type: String,
      default: 'image/*',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['uploading'],
  setup(props, context) {
    const saveFiles = (files) => {
      const formData = new FormData();
      for (let x = 0; x < files.length; x++) {
        formData.append('images[]', files[x]);
      }

      context.emit('uploading', formData);
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
    };
  },
};
</script>

<style scoped>
@import '../../assets/css/dropzone.css';
</style>
