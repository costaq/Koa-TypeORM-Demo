import { AppDataSource } from "./data-source"
import koaMorgan from 'koa-morgan';
import Koa from 'koa';
import bodyParser from "koa-bodyparser";
import serve from 'koa-static';
import config from './config';
import router from './route';
import catchError from './middleware/catchError';

AppDataSource.initialize().then(async () => {
    console.log("TypeORM connection success");
    const app = new Koa();

    app.use(catchError);

    app.use(serve('.'));

    // 日志
    app.use(koaMorgan(config.morgan));

    app.use(bodyParser());

    app.use(router.routes()).use(router.allowedMethods());

    app.listen(config.port);

}).catch(error => console.log("TypeORM connection error: ", error));
