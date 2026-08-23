import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  createTeamMember,
  deleteTeamMember,
  getAbout,
  updateIntro,
  updatePhilosophy,
  updateTeamMember,
} from '../controllers/about.controller.js';

const router = Router();

router.get('/', getAbout);
router.put('/intro', requireAuth, updateIntro);
router.put('/philosophy', requireAuth, updatePhilosophy);
router.post('/team', requireAuth, createTeamMember);
router.put('/team/:id', requireAuth, updateTeamMember);
router.delete('/team/:id', requireAuth, deleteTeamMember);

export default router;
