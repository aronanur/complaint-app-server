import express from "express";
import UserRoutes from "./UserRoutes";

const router = express.Router();

/** Handle Default Routes */
router.get("/", (_, res: express.Response) => {
  res.send("Hello , Selamat datang di Complaint APP API Service :)");
});

router.use("/api/v1/user", UserRoutes);

export default router;
