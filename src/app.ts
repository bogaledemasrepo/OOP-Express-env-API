import express, { json, urlencoded } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes"; // Auto-generated later
import { errorHandler } from "./middleware/errorHandler";
import multer from "multer";

export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

// Serve Swagger UI
app.use("/docs", swaggerUi.serve, async (_req: any, res: any) => {
  const spec = await import("../build/swagger.json");
  return res.send(swaggerUi.generateHTML(spec));
});
const upload = multer({ storage: multer.memoryStorage() });

// You must apply the multer middleware to the specific route 
// that matches your controller
app.post("/files/upload", upload.single("profilePicture"), (req, res, next) => {
  next();
});
RegisterRoutes(app);
app.use(errorHandler);
app.listen(3000, () => console.log("🚀 http://localhost:3000/docs"));