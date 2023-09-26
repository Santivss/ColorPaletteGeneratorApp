import express from "express";
import path from "path";
import {
  changePassword,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
} from "../controllers/userController.js";

const router = express();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);

//password reset
router.post("/request-passwordReset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password", changePassword);

router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/views/verifiedpage.html"));
});

router.get("/resetPassword", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/views/verifiedpage.html"));
});

export default router;
