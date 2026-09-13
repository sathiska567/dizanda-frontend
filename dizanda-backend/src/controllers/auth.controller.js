import bcrypt from 'bcryptjs';
import { db } from '../data/store.js';
import { signToken } from '../middleware/auth.js';
import { ApiError } from '../middleware/errorHandler.js';

function publicAdmin(admin) {
  return { id: admin.id, name: admin.name, email: admin.email };
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
    }

    const { admins } = db.read();
    const admin = admins.find((a) => a.email === String(email).toLowerCase());
    if (!admin) throw new ApiError(401, 'Invalid email or password');

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) throw new ApiError(401, 'Invalid email or password');

    const token = signToken(admin);
    res.json({ token, admin: publicAdmin(admin) });
  } catch (err) {
    next(err);
  }
}

export function me(req, res, next) {
  try {
    const { admins } = db.read();
    const admin = admins.find((a) => a.id === req.admin.id);
    if (!admin) throw new ApiError(404, 'Admin account no longer exists');
    res.json({ admin: publicAdmin(admin) });
  } catch (err) {
    next(err);
  }
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw new ApiError(400, 'Current and new password are required');
    }
    if (newPassword.length < 8) {
      throw new ApiError(400, 'New password must be at least 8 characters');
    }

    const { admins } = db.read();
    const admin = admins.find((a) => a.id === req.admin.id);
    if (!admin) throw new ApiError(404, 'Admin account no longer exists');

    const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!valid) throw new ApiError(401, 'Current password is incorrect');

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db.write((data) => {
      const target = data.admins.find((a) => a.id === req.admin.id);
      target.passwordHash = passwordHash;
    });

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
}
