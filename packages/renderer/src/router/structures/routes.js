import { configRoutes } from './configRoutes';
import { enterpriseRoutes } from './enterpriseRoutes';
import { localizationRoutes } from './localizationRoutes';


const structureRoutes = [
  {
    path: '',
    children: [
      configRoutes,
      enterpriseRoutes,
      localizationRoutes
    ]
  },
];

export default structureRoutes;
