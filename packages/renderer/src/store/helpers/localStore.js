import localForage from 'localforage';

const currentWorkspace = localStorage.getItem('currentWorkspace')
  ? JSON.parse(localStorage.getItem('currentWorkspace'))
  : null;
const currentWorkSpaceDatabase = currentWorkspace
  ? currentWorkspace.database
  : 'kitbusiness';

export default localForage.createInstance({
  name: currentWorkSpaceDatabase,
});
