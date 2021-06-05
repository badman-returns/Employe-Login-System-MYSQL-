import db from './db';
import { Employee } from '../interfaces';
import { Tables } from '../configs/table.config';

export class EmployeeDB {

    constructor() {

    }

    public static getEmployeeByEmailId(email: string): Promise<Employee> {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${Tables.EMPLOYEE} WHERE ${Tables.EMPLOYEE}.emailId='${email}'`, (err, res) => {
                if (err){
                    return reject(err);
                }
                if (res.length){
                    return resolve(Object.assign({}, res[0]));
                }
                return resolve(null);
            })
        })
    }

    public static getEmployeeByEmployeeIdAndOrg(employeeId: number, organization: string): Promise<Employee> {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${Tables.EMPLOYEE} WHERE ${Tables.EMPLOYEE}.employeeId=${employeeId} AND ${Tables.EMPLOYEE}.organization='${organization}'`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length){
                    return resolve(res.map((result: any) => Object.assign({}, result)));
                }
                return resolve(null);
            })
        })
    }

    public static insertEmployee(firstName: string, lastName: string, email: string, password: string, employeeId: Number, organization: string): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${Tables.EMPLOYEE} (firstName, lastName, emailId, password, employeeId ,organization) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '${employeeId}','${organization}')`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res.insertedId);
            })
        })
    }
}