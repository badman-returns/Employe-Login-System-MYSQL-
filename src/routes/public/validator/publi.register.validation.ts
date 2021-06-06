import { checkSchema } from "express-validator";
import { EmployeeDB } from "../../../model/employee";
import { ValidationResponder } from "../../../middleware";

class RegisterValidator {
    constructor() {

    }

    public static validateEmployeeRegistrationData() {
        return [
            ...checkSchema({
                firstName: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'First Name is missing',
                },
                lastName: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Last Name is missing',
                },
                email: {
                    in: ['body'],
                    isEmail: true,
                    exists: true,
                    custom: {
                        options: (email: string) => {
                          return new Promise(async(resolve, reject) => {
                              const employeeData = await EmployeeDB.getEmployeeByEmailId(email);
                              if(employeeData != null){
                                return reject(false);
                              }
                              else {
                                  return resolve(true);
                              }
                          });
                        },
                        errorMessage: 'Email already exists.',
                    },
                    errorMessage: 'Email is missing',
                },
                password: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Password is missing',
                },
                organization: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Organization is missing',
                },
                employeeId: {
                    in: ['body'],
                    isInt: true,
                    exists: true,
                    isDecimal: true,
                    custom: {
                        options: (employeeId: number) => {
                            if(Number.isInteger(+employeeId))
                                return new Promise(async (resolve, reject) => {
                                    const employeeData = await EmployeeDB.getEmployeeByEmployeeId(employeeId);
                                    if (employeeData != null) {
                                        return reject(false);
                                    }
                                    else {
                                        return resolve(true);
                                    }
                                });

                        },
                        errorMessage: 'Employee id already exists',
                    },
                    errorMessage: 'employeeId is missing',
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ];
    }
}

const ValidateEmployeeRegistrationData = RegisterValidator.validateEmployeeRegistrationData();

export {
    ValidateEmployeeRegistrationData,
}