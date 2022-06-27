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
import { Role } from './users/entities/role.entity';

@Module({
  imports: [
    UsersModule,
    ListingsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        User,
        Role,
        Listing,
        ListingAddress,
        ListingImage,
      ],
      synchronize: true
    }),
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
