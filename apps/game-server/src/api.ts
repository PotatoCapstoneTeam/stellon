import { User } from '@stellon/game-core';
import express from 'express';
import jwt from 'jsonwebtoken';
import { ServerSocket } from './server-socket';
import { Stage } from './stage';

type ApiPostRequestBody = {
  secret: string;
  callback: string;
  roomId: number;
  users: User[];
};

type ApiPostResponseBody = {
  id: string;
  users: {
    id: number;
    token: string;
  }[];
};

export const apiRouter = (socket: ServerSocket) => {
  const router = express.Router();

  router.post(
    '/',
    (
      req: express.Request<unknown, unknown, ApiPostRequestBody>,
      res: express.Response<ApiPostResponseBody>
    ) => {
      // 데이터 검증 필요 함.

      if (
        process.env['API_SECRET'] === undefined ||
        process.env['JWT_PRIVATE_KEY'] === undefined
      ) {
        throw '환경변수가 설정되지 않음';
      }

      if (req.body.secret !== process.env['API_SECRET']) {
        return res.status(403).send();
      }

      const stage = new Stage(
        socket,
        req.body.roomId,
        req.body.users,
        async (team, users) => {
          try {
            await fetch(req.body.callback, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: stage.id,
                roomId: stage.roomId,
                victoryTeam: team,
                users,
              }),
            });

            socket.room(stage.id).emit('end', { victoryTeam: team });
          } catch (error) {
            console.log(error);
          }
        }
      );

      const userTokens = req.body.users.map((user) => {
        return {
          id: user.id,
          token: jwt.sign(
            {
              id: user.id,
              nickname: user.nickname,
              team: user.team,
              stageId: stage.id,
            },
            process.env['JWT_PRIVATE_KEY']!
          ),
        };
      });

      res.status(201).json({
        id: stage.id,
        users: userTokens,
      });
    }
  );

  return router;
};
