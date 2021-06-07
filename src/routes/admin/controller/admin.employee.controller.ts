import { Response } from "express";
import { EmployeeDB } from "../../../model/employee";
import { AuthenticatedRequest, ResponseObject, Employee } from "../../../interfaces";

class AdminController {
    constructor() {

    }

    public static adminEmployeeSearch = async (req: AuthenticatedRequest, res: Response) => {
        const firstname = req.query.firstName || '';
        const lastname = req.query.lastName || '';
        const employeeId = req.query.employeeId;
       
        if (req.user.role !== 'SUPER_ADMIN') {
            return res.status(401).send({
                msg: `You are not authorized admin`,
                Data: null,
            });
        }

        let response: ResponseObject<Employee>;

        if (firstname && firstname.length || lastname && lastname.length || employeeId && employeeId.length) {
            try {
                const employee = await EmployeeDB.getEmployeeByEmployeeDetails(firstname.toString(), lastname.toString(), Number(employeeId));
                response = {
                    ResponseData: employee,
                    ResponseMessage: 'Employee Details fetched',
                }
            } catch (error) {
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
       
        if (req.user.role !== 'SUPER_ADMIN') {
            return res.status(401).send({
                msg: `You are not authorized admin`,
                Data: null,
            });
        }
        
        let sortParams = ['firstName', 'lastName', 'email', 'employeeId', 'organization'];
        let isValidSortValue = sortParams.some((current: string) => current == sortBy);

        if (sortBy !== '' && !isValidSortValue) {
            return res.status(400).send();
        }
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
