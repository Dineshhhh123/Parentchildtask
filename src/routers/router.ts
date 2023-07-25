import * as express from 'express';
import {
  createNode,
  parentAndChildExistence,
  changeParentToChild,
  changeChildToParent,
  moveParentToChild,
  interchangeChildBetweenParents,
} from '../controllers/controller';

const router = express.Router();

router.post('/node', createNode);

router.post('/existence', parentAndChildExistence);

router.post('/change-parent-to-child', changeParentToChild);

router.post('/change-child-to-parent', changeChildToParent);

router.post('/move-parent-to-child', moveParentToChild);

router.post('/interchange-child-between-parents', interchangeChildBetweenParents);

export default router;
