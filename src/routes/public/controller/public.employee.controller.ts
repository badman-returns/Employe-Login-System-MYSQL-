import { AuthenticatedRequest, ResponseObject } from "../../../interfaces";
import { Response } from 'express';
import { Encryption } from "../../../utility";
import { EmployeeDB } from "../../../model/employee";

class EmployeeController {

    constructor() {

    }

    public static registerEmployee = async (req: AuthenticatedRequest, res: Response) => {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const organization = req.body.organization;
        const email = req.body.email;
        const employeeId = req.body.employeeId;
        const password = Encryption.encryptPassword(req.body.password);

        let insertedID: string;
        let response: ResponseObject<any>;

        try {
            insertedID = await EmployeeDB.insertEmployee(firstName, lastName, email, password, employeeId, organization);
            response = {
                ResponseData: null,
                ResponseMessage: 'Employee successfully registered',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response);
    }
}

const RegisterEmployee = EmployeeController.registerEmployee;

export {
    RegisterEmployee,
}