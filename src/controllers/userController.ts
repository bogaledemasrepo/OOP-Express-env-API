import { Controller, Get, Route, Tags, Path } from "tsoa";

interface User {
  id: number;
  name: string;
  role: "admin" | "user";
}

@Route("users")
@Tags("User")
export class UserController extends Controller {
  // @Security("api_key")
  @Get("{userId}")
  public async getUser(@Path() userId: number): Promise<User> {
    return {
      id: userId,
      name: "Bun User",
      role: "admin"
    };
  }
}