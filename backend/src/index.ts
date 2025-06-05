import express from "express";
import cors from "cors";
import songRoutes from "./routes/song.route";
import { errorHandler } from "./middlewares/errorHandler";
import connectDB from "./config/db";
import env from "./config/env";

const app = express();
const allowedOrigins = ['https://addis-music-ashen.vercel.app'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/songs", songRoutes);
app.use(errorHandler);

app.listen(env.PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${env.PORT}`);
});
  