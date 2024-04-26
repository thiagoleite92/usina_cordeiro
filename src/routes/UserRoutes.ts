import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../middlewares/verify-jwt';
import { userSession } from '../controllers/user-session-controller';
import { registerUser } from '../controllers/register-user-controller';
import { verifyUserRole } from '../middlewares/verify-user-role';
import { getAllUsers } from '../controllers/get-all-users-controller';
import { userUpdateStatus } from '../controllers/user-update-status-controller';
import { userUpdateRole } from '../controllers/user-update-role-controller';

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/user', registerUser);
  app.get('/user/me', { preHandler: verifyJWT }, userSession);

  app.get(
    '/user/all',
    { preHandler: [verifyJWT, verifyUserRole('ADMIN')] },
    getAllUsers
  );

  app.patch(
    '/user/:residentId/status',
    { preHandler: [verifyJWT, verifyUserRole('ADMIN')] },
    userUpdateStatus
  );

  app.patch(
    '/user/:residentId/role',
    { preHandler: [verifyJWT, verifyUserRole('ADMIN')] },
    userUpdateRole
  );
};
