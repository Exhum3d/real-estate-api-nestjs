import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingAddress } from './listings/entities/listing-address.entity';
import { ListingImage } from './listings/entities/listing-images.entity';
import { Listing } from './listings/entities/listing.entity';
import { ListingsModule } from './listings/listings.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users/roles.guard';
import { configService } from 'config/config.service';

@Module({
  imports: [
    UsersModule,
    ListingsModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule { }
