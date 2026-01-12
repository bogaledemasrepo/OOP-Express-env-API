import { Controller, Get, Route, Security, Tags } from "tsoa";

@Route("secure")
@Tags("Secure Operations")
export class SecureController extends Controller {
  
  @Security("jwt", ["admin"]) // Only JWTs with "admin" scope allowed
  @Get("data")
  public async getSecretData() {
    return { secret: "Bun + TSOA is powerful!" };
  }
}