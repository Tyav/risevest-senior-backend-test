import { User } from "./entities/user.entity";
declare module 'express-serve-static-core' {
  export interface Request {
    user: User
  }
}
