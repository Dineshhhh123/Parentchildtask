import { Request, Response } from 'express';
import Parent from '../models/parentModel';
import Child from '../models/childModel';

export async function addParentController(req: Request, res: Response) {
  try {
    const parent = req.body;
    console.log(parent)
    const createdParent = await Parent.create(parent);
    res.json(createdParent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add parent' });
  }
}
export async function addChildController(req: Request, res: Response) {
  try {
    const child = req.body;
    const createdChild = await Child.create(child);
    res.json(createdChild);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add child' });
  }
}
export async function interchangeEntitiesController(req: Request, res: Response) {
  try {
    const { type,type1,type2,type3, par, newpar,chi,par1,par2,ch,pa } = req.body;

      if (type === 'childToParent') {
        const child = await Child.findByPk(chi);
        if (!child) {
          return res.status(404).json({ error: 'Child not found' });
        }

        await Parent.create({ name: child.name });
        await child.destroy();
      }

      
      if (type1 === 'parentToChild') {
        const parent = await Parent.findByPk(par);
        if (!parent) {
          return res.status(404).json({ error: 'Parent not found' });
        }
  
        const newParentId = newpar;
        await Child.create({ name: parent.name, parentId: newParentId });
        await Child.update({ parentId: newParentId }, { where: { parentId: par} });
        await parent.destroy();
  
      }


      if (type2 === 'interchangeChildren') {
        const existingParent1 = await Parent.findByPk(par1);
        const existingParent2 = await Parent.findByPk(par2);
        if (!existingParent1 || !existingParent2) {
          return res.status(404).json({ error: 'Parents not found' });
        }
  
        const children1 = await Child.findAll({ where: { parentId: par1 } });
        const children2 = await Child.findAll({ where: { parentId: par2 } });
  
        await Child.update({ parentId: par2 }, { where: { id: children1.map((c) => c.id) } });
        await Child.update({ parentId: par1 }, { where: { id: children2.map((c) => c.id) } });
  
      }


      if (type3 === 'childChangeintoParentToParent') {
        
        const existingParent2 = await Parent.findByPk(pa);
        if (!existingParent2) {
          return res.status(404).json({ error: 'Parents not found' });
        }
  
        const child = await Child.findByPk(ch);
        if (!child) {
          return res.status(404).json({ error: 'Child not found' });
        }
  
        if (child.parentId === pa) {
          return res.status(400).json({ error: 'cannot change child to same parent' });
        }
  
        await Child.update({ parentId: pa }, { where: { id: ch } });
  
        return res.json({ message: 'Child changed from one parent to another successfully' });
      }

      return res.json({ message: 'updated successffully' });
      
  
     
     
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update entities' });
  }
}

export async function getAllParentsAndChildren(req: Request, res: Response) {
  try {
    const [parents, children] = await Promise.all([
      Parent.findAll(),
      Child.findAll()
    ]);

    const data = {
      parents,
      children
    };

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve parents and children' });
  }
}




