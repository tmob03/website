import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaRepo } from './modules/prisma/prisma.repo';
import { AppModule } from './app.module';
import { appConfig } from '../config/config';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './@common/filters/all-exceptions.filter';

async function bootstrap() {
    // MDN recommended hack override for BigInt
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json
    // https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-1006088574
    BigInt.prototype['toJSON'] = function () {
        return this.toString();
    };

    const options: NestApplicationOptions = {
        bodyParser: false
    };

    const app = await NestFactory.create(AppModule, options);

    const config = new DocumentBuilder()
        .setTitle('Momentum Mod API')
        .setDescription('The Momentum Mod API - Made with 🦵')
        .addBearerAuth()
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    const prismaDalc: PrismaRepo = app.get(PrismaRepo);
    await prismaDalc.enableShutdownHooks(app);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // Disabling this for now, not sure it's needed and might be causing errors trying to modify a response that's been sent or something
    // const httpAdapterHost = app.get(HttpAdapterHost);
    // app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

    await app.listen(appConfig.port);
}
bootstrap();
