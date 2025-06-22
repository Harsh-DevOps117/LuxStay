import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.config.js";
import cookieParser from "cookie-parser";

//routes
import auth from "./routes/auth.routes.js";
import hostRoutes from "./routes/property.routes.js";
import getRoute from "./routes/get.routes.js";
import contact from "./routes/contact.routes.js";
import ai from "./routes/ai.routes.js";

import payment from "./routes/payment.routes.js";
import dash_book from "./routes/dash_book.routes.js";

import dashboard1 from "./routes/dashboard1.routes.js";

import delete_prop from "./routes/delete_prop.routes.js";

dotenv.config();
db();

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: "https://lux-stay-fe.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());

// ❗ONLY this is required for multer + form-data support
app.use(express.urlencoded({ extended: true }));

// ✅ Don't use express.json() globally if handling multipart/form-data

// ✅ Auth & Property Routes
app.use("/", express.json(), auth);
app.use("/", hostRoutes);
app.use("/", getRoute);
app.use("/", express.json(), contact);

app.use("/", express.json(), ai);
app.use("/", express.json(), payment);
app.use("/", express.json(), dash_book);

app.use("/", express.json(), dashboard1);

app.use("/", express.json(), delete_prop);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`listening on port http://localhost:${port}`)
);
