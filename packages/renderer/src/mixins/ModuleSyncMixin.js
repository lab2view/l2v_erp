import { mapGetters } from 'vuex';
import { actionCode } from '/@/helpers/codes.js';
import { getMutationPathName } from '/@/helpers/utils.js';
import { notify } from '/@/helpers/notify.js';

export default {
  computed: {
    ...mapGetters('auth', ['currentUser']),
  },
  methods: {
    initEchoSync(module, nutation) {
      if (this.$echo !== undefined) {
        this.$echo
          .private(`synchronisation.${module.toLowerCase()}`)
          .listen('.module.synchronisation', (change) => {
            if (change.user_id === this.currentUser.id) {
              this.$store.commit(
                `${nutation.toLowerCase()}/SET_${module}_HASH`,
                change.hash
              );
            } else {
              const mutation = getMutationPathName(change);
              if (mutation) {
                const commitPayload =
                  change.action === actionCode.deleted
                    ? change.model.id
                    : change.model;
                this.$store.commit(mutation, commitPayload);
                this.$store.commit(`product/SET_${module}_HASH`, change.hash);
              }
              notify(
                `${change.action} ${change.mutation}`,
                'New Event',
                'info'
              );
            }
            console.log(change);
          });
      }
    },
  },
};
