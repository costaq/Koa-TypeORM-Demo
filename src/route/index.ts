import { SwaggerRouter } from "koa-swagger-decorator";
import path from "path";

const koaRouterOpts = { prefix: '/api' };
const swaggerRouterOpts = {
  title: 'API V1 Server',
  description: 'API DOC',
  version: '1.0.0'
};
const router = new SwaggerRouter(koaRouterOpts, swaggerRouterOpts);

router.swagger();

router.mapDir(path.resolve(__dirname, '../controller/'));

export default router;