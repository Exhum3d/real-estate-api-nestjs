import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {

  findAll(): void {
    console.log("Merge");
  }

}