<template>
  <div class="card m-0 p-0">
    <SaleSessionHeader />

    <div class="card-body pb-2">
      <div class="row align-items-center">
        <SaleSessionSelectedArticleList />
      </div>
    </div>

    <SaleSessionState />
  </div>

  <router-view />
</template>

<script>
import SaleSessionHeader from '/@/components/sales/session/SaleSessionHeader.vue';
import SaleSessionSelectedArticleList from '/@/components/sales/session/SaleSessionSelectedArticleList.vue';
import SaleSessionState from '/@/components/sales/session/SaleSessionState.vue';
import store from '/@/store/index.js';
import { moduleCode } from '/@/helpers/codes.js';
import ModuleSyncMixin from '/@/mixins/ModuleSyncMixin.js';
import {
  JSPrintManager,
  WSStatus,
  ClientPrintJob,
  InstalledPrinter,
} from 'jsprintmanager';

export default {
  components: {
    SaleSessionState,
    SaleSessionSelectedArticleList,
    SaleSessionHeader,
  },
  mixins: [ModuleSyncMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    const hash = store.getters['product/getProductsHash'];
    if (hash) {
      return store
        .dispatch('initModuleSynchronisation', {
          module: moduleCode.products,
          hash: hash,
          mutation: 'product',
        })
        .finally(() => next());
    } else {
      const field = { page: 1, field: {} };
      return Promise.all([
        store.dispatch('article/getArticlesList', field),
        store.dispatch('product/getProductsList', field),
        store.dispatch('product_family/getProductFamiliesList', field),
        store.dispatch('product_type/getProductTypesList', field),
        store.dispatch('product_unit/getProductUnitsList', field),
        store.dispatch('property/getPropertiesList', field),
        store.dispatch('tax/getTaxesList', field),
        store.dispatch('package/getPackageList', field),
        store.dispatch('price_type/getPriceTypeList', field),
        store.dispatch('getLastHash', moduleCode.products).then((data) => {
          store.commit('product/SET_PRODUCTS_HASH', data.hash);
          return data;
        }),
      ])
        .then(() => next())
        .catch((error) => {
          console.log(error);
          next();
        });
    }
  },
  created() {
    this.initEchoSync(moduleCode.products, 'product');

    // JSPrintManager.auto_reconnect = true;
    JSPrintManager.start();
    // window.print();
    JSPrintManager.WS.onStatusChanged = function () {
      let printer = null;
      if (JSPrintManager.websocket_status === WSStatus.Open) {
        JSPrintManager.getPrinters()
          .then(function (myPrinters) {
            printer = myPrinters[2];
            console.log(myPrinters, printer);
            var cpj = new ClientPrintJob();
            cpj.clientPrinter = new InstalledPrinter(printer);
            // cpj.printerCommands = 'RAW PRINTER';
            // cpj.sendToClient();
          })
          .catch((e) => console.log(e));
      }
    };
  },
};
</script>
