import express from 'express';

import { catalogs, purchases } from '../controllers';

const router = express.Router();

router.get('/catalogs', catalogs.getAllCatalogs);
router.post('/catalogs', catalogs.addCatalog);
router.put('/catalogs/:id', catalogs.updateCatalog);
router.delete('/catalogs/:id', catalogs.removeCatalog);
router.get('/catalogs/:id', catalogs.getCatalogById);

router.post('/catalogs/:id/purchases', purchases.addPurchase);
router.put('/catalogs/purchases/:id', purchases.updatePurchase);
router.put('/catalogs/purchases/:id/status', purchases.updatePurchaseStatus);
router.delete('/catalogs/purchases/:id', purchases.removePurchase);

export default  router;
