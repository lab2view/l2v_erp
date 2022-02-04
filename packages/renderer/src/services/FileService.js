import axios from '/@/config/axios';

export default {
  upload(formData) {
    return axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
