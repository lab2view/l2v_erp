export function useElectron(key = null) {
  return key !== null ? window?.electron[key] : window.electron;
}
