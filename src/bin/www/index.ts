import dotenv from "dotenv";
dotenv.config();
import app from "../../app";

(async () => {
  // Start express server
  console.log("Connected to DB successfully.");
  const port = app.get("port");
  app.listen(process.env.PORT || 3000, () => {
    // const port = app.get("port");
    console.log(`Service Started at http://localhost:${port}`);
    console.log("Press CTRL+C to stop\n");
  });
})();
