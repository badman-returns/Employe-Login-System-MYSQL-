import * as express from "express";
import multer from "multer";
import { ValidateBasicAuth, LoadAuthorization } from "../../middleware";
import { RegisterEmployee } from "./controller/public.employee.controller";
import { LoginByUserIdAndPassword } from "./public.controller";
import { ValidateEmployeeRegistrationData } from "./validator/publi.register.validation";
class PublicRouting {
    public router: express.Router;
    private upload = multer();
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private configRoutes() {
        // Employee Routes
        this.router.post('/register', [this.upload.none(), ...ValidateEmployeeRegistrationData], RegisterEmployee);
        this.router.get('/login', [...ValidateBasicAuth, ...LoadAuthorization], LoginByUserIdAndPassword);
    }
}

const PublicRouter = new PublicRouting().router;

export {
    PublicRouter,
}