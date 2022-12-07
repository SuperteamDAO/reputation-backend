// create a basic express server to ping the server
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (_req: any, res: { send: (arg0: string) => any }) =>
  res.send('Hello World!')
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
