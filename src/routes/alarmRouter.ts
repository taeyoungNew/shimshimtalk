import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import AlarmHandler from "../handlers/alarmHandler";

const alarmRouter = Router();
const alarmHandler = new AlarmHandler();

alarmRouter.patch("/:alarmId/read", authMiddleware, alarmHandler.readAlarm);
alarmRouter.get("/", authMiddleware, alarmHandler.getAlarmsByUser);

export default alarmRouter;
