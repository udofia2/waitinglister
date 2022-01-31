import express from "express";
import ListerController from "../controller/lister.controller.js";
import AssetListerModel from "../model/listers.model.js";
import InvestorModel from "../model/investors.model.js";
import log from "../config/logger.js";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import Mail from "../utils/notificationMail.js";


const { signup } = ListerController(
  AssetListerModel,
  InvestorModel,
  Mail,
  nodemailer,
  nodemailerSendgrid,
  log
);

const ListerRouter = express.Router();

ListerRouter.route("/signup").post(signup);

export default ListerRouter;
