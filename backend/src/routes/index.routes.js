import express from "express";
import authRoute from "./auth.routes.js";
import userRoute from "./user.routes.js";

const router = express();

router.use("/auth", authRoute);
router.use("/users", userRoute);

export default router;
