const fs = require('fs');
const Koa = require('koa');
const Router = require('@koa/router');
const path = require('path');

const app = new Koa();
const router = new Router();

router.get('/get-json', async (ctx) => {
  // Change "files/sample.json" to "files/sample.zip" in the below line
  const filePath = path.join(__dirname, 'files/sample.json');
  fs.promises.readFile(filePath).then(async (data) => {
    ctx.body = JSON.parse(data);
    await next();
  });
});

router.post('/post-request', async (ctx) => {
  // Make the request body an array of two numbers
  const sum = req.body.input[0] * req.body.input[1];
  ctx.body = sum.toString()
});

router.all('*', async (ctx) => {
  ctx.body = {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx => {
  ctx.body = {};
});

app.listen(3000);