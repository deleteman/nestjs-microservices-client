import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [{
    provide: 'BOOKS_SERVICE',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: configService.get('BOOKSTORE_SERVICE_HOST'),
          port: configService.get('BOOKSTORE_SERVICE_PORT')
        }
      })
    }
  }],
})
export class AppModule {}
