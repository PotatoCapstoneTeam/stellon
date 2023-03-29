import { ApiPostRequestBody, ApiPostResponseBody } from '@stellon/game-core';
import axios, { AxiosResponse } from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const apiUrl = `${process.env.NX_STAGE_SERVER_URL}/api`;

type StageData = {
  id: string;
  redUserToken: string;
  blueUserToken: string;
};

let stage: StageData;

app.post('/join', async (req, res) => {
  const check = await axios(`${apiUrl}/check/${stage?.id}`);

  if (!stage || !check.data.isEnabled) {
    const { data } = await axios<
      ApiPostResponseBody,
      AxiosResponse<ApiPostResponseBody>,
      ApiPostRequestBody
    >(apiUrl, {
      method: 'POST',
      data: {
        callback: `${process.env.NX_MAIN_SERVER_URL}/callback`,
        roomId: 1,
        secret: process.env.API_SECRET,
        users: [
          { id: 1, nickname: '히토리', team: 'RED_TEAM' },
          { id: 2, nickname: '후타리', team: 'BLUE_TEAM' },
        ],
      },
    });

    stage = {
      id: data.id,
      redUserToken: data.users.find((user) => user.id === 1).token,
      blueUserToken: data.users.find((user) => user.id === 2).token,
    };
  }

  console.log(req.body);

  switch (req.body.id) {
    case '1':
      res.json({ token: stage.redUserToken });
      break;
    case '2':
      res.json({ token: stage.blueUserToken });
      break;
    default:
      res.status(400).send();
  }
});

app.post('/callback', (req, res) => {
  console.log(req.body);

  res.send();
});

const port = process.env.port || 4000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
