import { Request, Response } from 'express';
import Node from '../models/dbschema';

export async function createNode(req: Request, res: Response): Promise<void> {
  try {
    const { name, parent_id } = req.body;
    console.log(name)
    const node = await Node.create({ name, parent_id });
    console.log(node)
    res.status(201).json(node);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to create node' });
  }
}



export async function parentAndChildExistence(req: Request, res: Response): Promise<void> {
  try {
    const { parentName, childName } = req.body;

    const parent = await Node.findOne({ where: { name: parentName } });
    if (!parent) {
      res.status(404).json({ error: 'Parent node not found' });
    }

    const child = await Node.findOne({ where: { name: childName } });
    if (!child) {
      res.status(404).json({ error: 'Child node not found' });
    }

    res.json({ parentExists: true, childExists: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check existence' });
  }
}

export async function changeParentToChild(req: Request, res: Response): Promise<void> {
    try {
      const { nodeName, newParentName } = req.body;
  
      const node = await Node.findOne({ where: { name: nodeName } });
      if (!node) {
         res.status(404).json({ error: 'Node not found' });
      }
  
      const newParent = await Node.findOne({ where: { name: newParentName } });
      if (!newParent) {
        res.status(404).json({ error: 'New parent node not found' });
      }
  
      node.parent_id = newParent.id;
      await node.save();
  
      res.json({ message: 'Parent changed to child successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to change parent to child' });
    }
  }

export async function changeChildToParent(req: Request, res: Response): Promise<void> {
    try {
      const { nodeName, newParentName } = req.body;
  
      const node = await Node.findOne({ where: { name: nodeName } });
      if (!node) {
        res.status(404).json({ error: 'Node not found' });
      }
  
      const newParent = await Node.findOne({ where: { name: newParentName } });
      if (!newParent) {
        res.status(404).json({ error: 'New parent node not found' });
      }
  
      node.parent_id = newParent.id;
      await node.save();
  
      res.json({ message: 'Child changed to parent successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to change child to parent' });
    }
  }

export async function moveParentToChild(req: Request, res: Response): Promise<void> {
    try {
      const { nodeName, newParentName } = req.body;
  
      const node = await Node.findOne({ where: { name: nodeName } });
      if (!node) {
        res.status(404).json({ error: 'Node not found' });
      }
  
      const newParent = await Node.findOne({ where: { name: newParentName } });
      if (!newParent) {
        res.status(404).json({ error: 'New parent node not found' });
      }
  
      await Node.destroy({ where: { name: newParentName } });
  
      node.parent_id = newParent.id;
      await node.save();
  
      res.json({ message: 'Parent moved to child successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to move parent to child' });
    }
  }

export async function interchangeChildBetweenParents(req: Request, res: Response): Promise<void> {
    try {
      const { nodeName, newParentName } = req.body;
  
      const node = await Node.findOne({ where: { name: nodeName } });
      if (!node) {
        res.status(404).json({ error: 'Node not found' });
      }
  
      const newParent = await Node.findOne({ where: { name: newParentName } });
      if (!newParent) {
        res.status(404).json({ error: 'New parent node not found' });
      }
  
      node.parent_id = newParent.id;
      await node.save();
  
      res.json({ message: 'Child interchanged between parents successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to interchange child between parents' });
    }
  }
        