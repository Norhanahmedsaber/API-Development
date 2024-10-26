// @ts-nocheck
import { Router } from 'express';
import {
  createOrganization,
  readOrganization,
  readAllOrganizations,
  updateOrganization,
  deleteOrganization,
  inviteUserToOrganization,
} from '../controllers/organizationController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/organization', authenticateToken, createOrganization);
router.get('/organization/:organization_id', authenticateToken, readOrganization);
router.get('/organization', authenticateToken, readAllOrganizations);
router.put('/organization/:organization_id', authenticateToken, updateOrganization);
router.delete('/organization/:organization_id', authenticateToken, deleteOrganization);
router.post('/organization/:organization_id/invite', authenticateToken, inviteUserToOrganization);

export default router;
