import axios from 'axios';
import express from 'express';
import jwt from 'jsonwebtoken';
import { Stage } from './stages';

const router = express.Router();

type User = {
  id: string;
  nickname: string;
  team: 'red' | 'blue';
};

type ApiPostRequestBody = {
  secret: string;
  callback: string;
  users: User[];
};

type ApiPostResponseBody = {
  id: string;
  users: {
    id: string;
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

    if (req.body.secret !== process.env['API_SECRET']) {
      return res.status(403).send();
    }

    const userTokens = req.body.users.map((user) => {
      return {
        id: user.id,
        token: jwt.sign(
          { id: user.id, nickname: user.nickname, team: user.team },
          process.env['JWT_PRIVATE_KEY']
        ),
      };
    });

    const stage = new Stage(req.body.callback);

    setInterval(async () => {
      try {
        await axios.post(req.body.callback, {
          id: stage.id,
          users: req.body.users.map((user) => {
            return {
              id: user.id,
              kill: 10,
              death: 10,
            };
          }),
        });
      } catch (error) {
        console.log('Error!', error.message);
      }
    }, 10000);

    res.status(201).json({
      id: stage.id,
      users: userTokens,
    });
  }
);

export default router;
