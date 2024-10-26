import { Request, Response,NextFunction } from 'express';
import Organization from '../models/Organization';

// Create Organization
export const createOrganization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description } = req.body;

    try {
        const existingOrganization = await Organization.findOne({ name });

        if (existingOrganization) {
         res.status(409).json({ error: 'Organization already exists',organization_id: existingOrganization._id  });
        }

        const newOrganization = new Organization({ name, description, organization_members: [] });
        await newOrganization.save();

        res.status(201).json({ organization_id: newOrganization._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating organization' });
    }
};

// Read Organization
export const readOrganization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { organization_id } = req.params;

  try {
    const organization = await Organization.findById(organization_id);
    if (!organization) {
      res.status(404).json({ error: 'Organization not found' });
      return;
    }
    res.json(organization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching organization' });
  }
};

// Read All Organizations
export const readAllOrganizations = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching organizations' });
  }
};

// Update Organization
export const updateOrganization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { organization_id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organization_id,
      { name, description },
      { new: true }
    );
    if (!updatedOrganization) {
      res.status(404).json({ error: 'Organization not found' });
      return;
    }
    res.json(updatedOrganization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating organization' });
  }
};

// Delete Organization
export const deleteOrganization = async (req: Request, res: Response ,next: NextFunction): Promise<void> => {
  const { organization_id } = req.params;

  try {
    const deletedOrganization = await Organization.findByIdAndDelete(organization_id);
    if (!deletedOrganization) {
      res.status(404).json({ error: 'Organization not found' });
      return;
    }
    res.json({ message: 'Organization deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting organization' });
  }
};

// Invite User to Organization
export const inviteUserToOrganization = async (req: Request, res: Response): Promise<void> => {
    const { organization_id } = req.params;
    const { user_email } = req.body;
  
    try {
      const organization = await Organization.findById(organization_id);
      if (!organization) {
        res.status(404).json({ error: 'Organization not found' });
        return;
      }
  
      const isMember = organization.organization_members.some(member => member.email === user_email);
      if (isMember) {
        res.status(400).json({ error: 'User is already a member' });
        return;
      }
  
      organization.organization_members.push({ name: 'member', email: user_email, access_level: 'read' });
      await organization.save();
  
      res.json({ message: 'User invited successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error inviting user to organization' });
    }
  };