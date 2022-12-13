import express from "express";
import {
  LoginUser,
  AuthenticationUser,
  ListUser,
  ListAdmin,
  CreateUser,
  CreateAdmin,
  UpdateUser,
  DeleteUser,
} from "../controllers/UserController";
import { UserAuthentication, AdminAuthentication } from "../middlewares";

const router = express.Router();

router.post("/login", LoginUser);
router.get("/auth", UserAuthentication, AuthenticationUser);
router.get("/list-user", UserAuthentication, ListUser);
router.get("/list-admin", UserAuthentication, ListAdmin);
router.post("/create-admin", AdminAuthentication, CreateUser);
router.post("/create-user", AdminAuthentication, CreateAdmin);
router.put("/edit-user/:userId", AdminAuthentication, UpdateUser);
router.delete("/delete-user/:userId", AdminAuthentication, DeleteUser);

export default router;
