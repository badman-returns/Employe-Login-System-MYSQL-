import { Response } from "express";
import { EmployeeDB } from "../../../model/employee";
import { AuthenticatedRequest, ResponseObject, Employee } from "../../../interfaces";

class AdminController {
    constructor() {

    }

    public static adminEmployeeSearch = async (req: AuthenticatedRequest, res: Response) => {
        const firstname = req.query.firstname || '';
        const lastname = req.query.lastname || '';
        const employeeId = req.query.employeeId;

        let response: ResponseObject<Employee>;

        if (firstname && firstname.length || lastname && lastname.length || employeeId && employeeId.length) {
            try {
                const employee = await EmployeeDB.getEmployeeByEmployeeDetails(firstname.toString(), lastname.toString(), Number(employeeId));
                response = {
                    ResponseData: employee,
                    ResponseMessage: 'Employee Details fetched',
                }
            } catch (error) {
                console.log(error);
                return res.status(500).end()
            }
            return res.send(response);
        }
        else {
            return res.status(400).end();
        }
    }

    public static adminSortEmployeeByDetails = async (req: AuthenticatedRequest, res: Response) => {
        const sortBy = req.query.sortBy || '';
        const pageNumber = req.query.pageNumber;
        const limit = Number(req.query.limit) || 10;

        let sortParams = ['firstName', 'lastName', 'email', 'employeeId', 'organization'];
        let isValidSortValue = sortParams.some((current: string) => current == sortBy);

        if(sortBy !== '' && !isValidSortValue){
            return res.status(400).send();
        }
        console.log(limit);
        let offset: Number;
        if (pageNumber && limit) {
            offset = (Number(pageNumber) - 1) * (Number(limit));
        }
        let response: ResponseObject<Employee>;
        try {
            const employee = await EmployeeDB.getEmployeeBySorting(sortBy.toString(), limit, offset);
            response = {
                ResponseData: employee,
                ResponseMessage: 'Employee Data fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response);
    }
}

const AdminEmployeeSearch = AdminController.adminEmployeeSearch;
const AdminSortEmployeeByDetails = AdminController.adminSortEmployeeByDetails;

export {
    AdminEmployeeSearch,
    AdminSortEmployeeByDetails,
}
