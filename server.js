const Koa = require('koa')
const next = require('next')
const Router = require('koa-router');
var bodyParser = require('koa-bodyparser');

const port = parseInt(process.env.PORT, 10) || 80
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa();
  server.use(bodyParser());

  const router = new Router();

  /**
   * koa 网页路由
   */
  router.get('/:testId', async ctx => {
    const testId = ctx.params.testId;
    await app.render(ctx.req, ctx.res, `/${testId}`, ctx.query);
    ctx.respond = false;
  })
  router.get('/result/:testId', async ctx => {
    const testId = ctx.params.testId;
    // next 渲染
    await app.render(ctx.req, ctx.res, `/result/${testId}`, ctx.query);
    ctx.respond = false;
  })

  router.post('/api/disc', async (ctx) => {
    console.log('ctx: ', ctx);
    console.log('ctx.request: ', ctx.request);
    const { options } = ctx.request.body;
    const DISC_ALL_RESULT = ['D', 'DI', 'DIS', 'DIC', 'DS', 'DC', 'I', 'ID', 'IDS', 'IDC', 'IS', 'ISC', 'IC', 'S', 'SD', 'SDC', 'SI', 'SIC', 'SC', 'C', 'CD', 'CDS', 'CI', 'CIS', 'CS'];
    const optionCount = {};
    options.forEach(option => {
      const currentCount = optionCount[option] || 0;
      optionCount[option] = currentCount + 1;
    });
    console.log(optionCount);

    /**
     * 统计有多少 D/S/C/I
     * 算出最终的结果
     * 导向对应的目标页
     */
    const optionArray = Object.keys(optionCount).map((key) => {
      return {
        key,
        value: optionCount[key],
      }
    });

    // 降序排序
    optionArray.sort((a, b) => {
      return a.value < b.value;
    })

    let resultType = optionArray
      // 40 道题，答案数超过 10 才纳入计算范围
      .filter(item => item.value >= 10)
      .map(item => item.key)
      .join('');

  console.log('resultType', resultType);

    // 找到最终结果
    while (resultType.length > 0) {
      if (DISC_ALL_RESULT.indexOf(resultType) > -1) {
        break;
      } else {
        resultType = resultStr.substr(0, resultStr.length - 1);
      }
    }
console.log('resultType', resultType);

    ctx.body = {
      resultType,
    };
  });

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
