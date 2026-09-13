import { db } from '../data/store.js';
import { createId } from '../utils/id.js';
import { ApiError } from '../middleware/errorHandler.js';

export function getAbout(req, res) {
  const { about } = db.read();
  res.json(about);
}

export async function updateIntro(req, res, next) {
  try {
    const updated = await db.write((data) => {
      data.about.intro = { ...data.about.intro, ...req.body };
      return data.about.intro;
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function updatePhilosophy(req, res, next) {
  try {
    const updated = await db.write((data) => {
      data.about.philosophy = { ...data.about.philosophy, ...req.body };
      return data.about.philosophy;
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function createTeamMember(req, res, next) {
  try {
    const { name, role, bio, comment, image } = req.body;
    if (!name || !role || !image) throw new ApiError(400, 'Name, role and image are required');

    const created = await db.write((data) => {
      const order = data.about.team.length + 1;
      const member = { id: createId(), name, role, bio: bio || '', comment: comment || '', image, order };
      data.about.team.push(member);
      return member;
    });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function updateTeamMember(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await db.write((data) => {
      const member = data.about.team.find((m) => m.id === id);
      if (!member) throw new ApiError(404, 'Team member not found');
      Object.assign(member, req.body);
      return member;
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteTeamMember(req, res, next) {
  try {
    const { id } = req.params;
    await db.write((data) => {
      const before = data.about.team.length;
      data.about.team = data.about.team.filter((m) => m.id !== id);
      if (data.about.team.length === before) throw new ApiError(404, 'Team member not found');
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
