import express from 'express'
import ListerController from '../controller/lister.controller.js'
import AssetListerModel from '../model/listers.model.js'
import InvestorModel from '../model/investors.model.js'
import log from '../config/logger.js'

const { signup } = ListerController(AssetListerModel, InvestorModel, log);

const ListerRouter = express.Router()

ListerRouter.route('/signup').post(signup)

export default ListerRouter;