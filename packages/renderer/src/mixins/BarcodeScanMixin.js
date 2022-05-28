export default {
  created() {
    this.$barcodeScanner.init(this.onBarcodeScanned);
  },
  beforeUnmount() {
    this.$barcodeScanner.destroy();
  },
};
