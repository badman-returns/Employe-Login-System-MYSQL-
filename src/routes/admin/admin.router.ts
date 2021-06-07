import * as express from "express";
import multer from 'multer';
import { ValidateBasicAuth, LoadAuthorization, ValidateBearerToken, LoadAuthorizedUser } from "../../middleware";
import { LoginByUserIdAndPassword } from "./admin.controller";
import { AdminEmployeeSearch, AdminSortEmployeeByDetails } from "./controller/admin.employee.controller";

class AdminRouting {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private configRoutes() {

        // Authentication Routes
        this.router.get('/login', [...ValidateBasicAuth, ...LoadAuthorization], LoginByUserIdAndPassword);

        // Employee Search Routes
        this.router.get('/search', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], AdminEmployeeSearch);

        // Employee Search Route by sorting and pagination
        this.router.get('/employee', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], AdminSortEmployeeByDetails)
    }
}

const AdminRouter = new AdminRouting().router;

export {
    AdminRouter
}
