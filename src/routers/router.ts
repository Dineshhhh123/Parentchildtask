import { Router } from 'express';
import {
  addParentController,
  addChildController,
  interchangeEntitiesController,
  getAllParentsAndChildren,
} from '../controllers/controller';

const router = Router();

router.post('/parent', addParentController);
router.post('/child', addChildController);
router.post('/interchange-children', interchangeEntitiesController);
router.get('/all-parents-and-children', getAllParentsAndChildren);



export default router;
