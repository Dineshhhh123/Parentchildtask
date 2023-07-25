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


  export const moveParentToChild = async (req: Request, res: Response) => {
    const { nodeName, newParentName } = req.body;
  
    try {
      const parentNode = await Node.findOne({ where: { name: nodeName } });
  
      if (!parentNode) {
        return res.status(404).json({ error: 'Parent node not found.' });
      }
  
      const newParentNode = await Node.findOne({ where: { name: newParentName } });
  
      if (!newParentNode) {
        return res.status(404).json({ error: 'New parent node not found.' });
      }
  
      parentNode.parent_id = newParentNode.id;
  
      await parentNode.save();
  
      return res.json({ message: 'Parent node moved to child successfully.' });
    } catch (error) {
      console.error('Error moving parent node to child:', error);
      return res.status(500).json({ error: 'Failed to move parent node to child.' });
    }
  };

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
        