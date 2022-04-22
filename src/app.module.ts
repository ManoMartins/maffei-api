import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AddressModule } from './address/address.module';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { StoreProductModule } from './store-product/store-product.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    AddressModule,
    CityModule,
    StateModule,
    StoreProductModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
