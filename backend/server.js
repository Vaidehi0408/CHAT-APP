import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/autho.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectionToMongoDB.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { server, app } from "./socket/socket.js";
import path from "path";
// const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);
// app.use(express.static(path.join(__dirname, "/frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get(/^(?!\/api).*/, (req, res) => {
  // This will only serve index.html if the path doesn't start with /api
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running on port ${PORT}`);
});
