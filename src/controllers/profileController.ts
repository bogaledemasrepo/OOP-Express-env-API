import { Controller, Get, Route} from "tsoa";

@Route("profile")
export class ProfileController extends Controller {
  
  @Get("{id}")
  public async getProfile(id: string) {
    // const rawData = await db.users.find(id);
    // Use the private helper to clean up the data
    return this.formatUserResponse([]);
  }

  // TSOA ignores this because it has no decorator and is private
  private formatUserResponse(user: any) {
    return {
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email.toLowerCase(),
      joined: new Date(user.createdAt).getFullYear()
    };
  }
}