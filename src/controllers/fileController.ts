import { Controller, Post, Route, UploadedFile, FormField, Tags } from "tsoa";
import { write } from "bun"; // Bun's native fast-write

@Route("files")
@Tags("Upload")
export class FileController extends Controller {
  /**
   * Uploads a user profile picture
   * @param profilePicture The file to upload
   * @param userId Associated user ID sent via form field
   */
  @Post("upload")
  public async uploadFile(
    @UploadedFile() profilePicture: Express.Multer.File,
    @FormField() userId: string
  ): Promise<{ path: string }> {
    const path = `./uploads/${userId}-${profilePicture.originalname}`;
    
    // Bun.write is much faster than Node's fs.writeFile
    await write(path, profilePicture.buffer);

    return { path };
  }
}