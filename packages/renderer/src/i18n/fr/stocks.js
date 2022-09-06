export default {
  title: 'Gestion du stocks',
  movement: 'Mouvement de stocks',
  stockentry: 'Entree de stocks',
  stockexit: 'Sortie de stocks',
  fields: {
    total_entry: 'Entre de stock',
    total_exit: 'Sorti de stock',
    total_stock: 'Total En stock',
    structure_stocks: 'Mouvement de stock dans les autres structures',
  },
  form: {
    entry: {
      updateTitle: "Modification de l'approvisionnement",
      createTitle: "Creation de l'approvisionnement",
    },
    exit: {
      updateTitle: 'Modification de la sortie de stock',
      createTitle: 'Creation de le sortie de stock',
    },
  },
  provision: {
    list: 'Liste des approvisionnements',
    add: 'Approvisionner le stocks',
    store:
      "L'enregistrement de l'approvisionnement a ete effectue avec succes.",
    update: 'approvisionnement modifie avec succes.',
  },
  provider: {
    listTitle: 'Liste des fournisseurs',
    formCreateTitle: 'Ajouter un fournisseur',
    formUpdateTitle: 'Modifier un fournisseur',
    store: "L'enregistrement du fournisseur a ete effectue avec succes.",
    update: 'La modification du fournisseur a ete effectuee avec succes.',
  },
  exitLine: {
    list: 'Sorties de stocks',
    add: 'Enregistrer une sortie',
    store: "L'enregistrement de la sortie a ete effectue avec succes.",
    update: 'La modification de la sortie a ete effectuee avec succes.',
    articleSelect: 'Selectionner les articles',
    articleForm: 'Finalisation de la sortie de stock',
  },
  entryLine: {
    list: 'Approvisionnement',
    update: "L'article a ete effectue avec succes.",
    articleSelect: 'Selectionner les articles a approvisionner',
    articleForm: "Finalisation de l'approvisionnement",
  },
  stockEntry: {
    list: 'Liste des approvisionnements',
    add: 'Approvisionner le stocks',
    listTitle: 'Liste des entrees de stocks',
    updateStock: 'Le statut a ete mis a jour',
    state_date: 'Statut mis a jour le',
  },
  shipping: {
    provisionForm: 'Finalisation de la livraison',
    list: 'Liste des livraisons',
    add: 'Ajouter une livraison',
    listTitle: '',
    updateStock: '',
    state_date: '',
    form:{
      updateTitle: "Modification de la livraiosn",
      createTitle: "Creation de la livraison",
    }
  },
  stockExit: {
    listTitle: 'Liste des sorties de stocks',
    add: 'Effectuer une sortie de stock',
    state_date: 'Statut mis a jour le',
  },
  stockType: {
    listTitle: 'Types de stocks',
    formCreateTitle: 'Ajouter un type de stocks',
    formUpdateTitle: 'Modifier un type de stocks',
    store: "L'enregistrement du type de stocks a ete effectue avec succes.",
    update: 'La modification du type de stocks a ete effectuee avec succes.',
  },
  stockState: {
    listTitle: 'Status de stocks',
    formCreateTitle: 'Ajouter un status de stocks',
    formUpdateTitle: 'Modifier un status de stocks',
    store: "L'enregistrement du status de stocks a ete effectue avec succes.",
    update: 'La modification du status de stocks a ete effectuee avec succes.',
  },
  inventory: {
    listTitle: 'Liste des inventaires',
    formCreateTitle: 'Ajouter un inventaire',
    formUpdateTitle: 'Modifier un inventaire',
    store: "L'enregistrement de l'inventaire a ete effectue avec succes.",
    update: "La modification de l'inventaire a ete effectuee avec succes.",
  },
};
