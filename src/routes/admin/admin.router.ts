import * as express from "express";
import multer from 'multer';
import { ValidateBasicAuth, LoadAuthorization } from "../../middleware";
import { LoginByUserIdAndPassword } from "./admin.controller";

class AdminRouting {
    public router: express.Router;
    private upload = multer();
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private configRoutes() {

        // Authentication Routes
        this.router.get('/authentication', [...ValidateBasicAuth, ...LoadAuthorization], LoginByUserIdAndPassword);
    }
}

const AdminRouter = new AdminRouting().router;

export {
    AdminRouter
}
