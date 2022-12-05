// import { Stage } from '@stellon/game-stage';
import axios from 'axios';
import cuid from 'cuid';
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

type Team = 'RED_TEAM' | 'BLUE_TEAM';

type User = {
  id: number;
  nickname: string;
  team: Team;
};

type UserRecord = {
  userId: number;
  kill: number;
  death: number;
};

type ApiPostRequestBody = {
  secret: string;
  callback: string;
  users: User[];
};

type ApiPostResponseBody = {
  id: string;
  users: {
    id: number;
    token: string;
  }[];
};

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

    const userTokens = req.body.users.map((user) => {
      return {
        id: user.id,
        token: jwt.sign(
          { id: user.id, nickname: user.nickname, team: user.team },
          process.env['JWT_PRIVATE_KEY']!
        ),
      };
    });

    // const stage = new Stage(req.body.callback);

    const id = cuid();

    setTimeout(async () => {
      try {
        await axios.post(req.body.callback, {
          id: id,
          users: req.body.users.map((user) => {
            return {
              userId: user.id,
              kill: 10,
              death: 10,
            } as UserRecord;
          }),
        });
      } catch (error: any) {
        console.log('Error!', error.message);
      }
    }, 10000);

    res.status(201).json({
      id: id,
      users: userTokens,
    });
  }
);

export default router;
