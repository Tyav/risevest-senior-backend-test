import { UserDto } from "./interfaces/User";

declare module 'express-serve-static-core' {
  export interface Request {
    user: UserDto
  }
}
