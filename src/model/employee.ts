import db from './db';
import { Employee } from '../interfaces';
import { Tables } from '../configs/table.config';

export class EmployeeDB {

    constructor() {

    }

    public static getEmployeeBySorting(sortBy: string, limit?: Number, offset?: Number): Promise<Employee> {
        return new Promise((resolve, reject) => {
            let sortQuery = '';
            let pagination = '';
            if (limit >= 0 && offset >= 0) {
                pagination = `LIMIT ${limit} OFFSET ${offset}`
            }
            if (sortBy) {
                sortQuery = `ORDER BY ${Tables.EMPLOYEE}.${sortBy} ASC`
            }
            let query = `SELECT ${Tables.EMPLOYEE}.id, ${Tables.EMPLOYEE}.firstName, ${Tables.EMPLOYEE}.lastName, ${Tables.EMPLOYEE}.email, ${Tables.EMPLOYEE}.employeeId, ${Tables.EMPLOYEE}.organization, ${Tables.EMPLOYEE}.createdOn
                         FROM ${Tables.EMPLOYEE}
            ${sortQuery} ${pagination}
            `
            db.query(query, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                if (res.length) {
                    return resolve(res.map((result: any) => Object.assign({}, result)));
                }
                return resolve(null);
            })
        })
    }

    public static getEmployeeByEmployeeDetails(firstName?: string, lastName?: string, employeeId?: number): Promise<Employee> {
        return new Promise((resolve, reject) => {
            let query = `SELECT ${Tables.EMPLOYEE}.id, ${Tables.EMPLOYEE}.firstName, ${Tables.EMPLOYEE}.lastName, ${Tables.EMPLOYEE}.email, ${Tables.EMPLOYEE}.employeeId, ${Tables.EMPLOYEE}.organization, ${Tables.EMPLOYEE}.createdOn
                         FROM ${Tables.EMPLOYEE} WHERE ${Tables.EMPLOYEE}.firstName='${firstName}' OR ${Tables.EMPLOYEE}.lastName='${lastName}' OR ${Tables.EMPLOYEE}.employeeId='${employeeId}'`
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                if (res.length) {
                    return resolve(res.map((result: any) => Object.assign({}, result)));
                }
                return resolve(null);
            })
        })
    }

    public static getEmployeeByEmailId(email: string): Promise<Employee> {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${Tables.EMPLOYEE} WHERE ${Tables.EMPLOYEE}.email='${email}'`
            db.query(query, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(Object.assign({}, res[0]));
                }
                return resolve(null);
            })
        })
    }

    public static getEmployeeByEmployeeId(employeeId: number): Promise<Employee> {
        return new Promise((resolve, reject) => {
            let query = `SELECT ${Tables.EMPLOYEE}.id, ${Tables.EMPLOYEE}.firstName, ${Tables.EMPLOYEE}.lastName, ${Tables.EMPLOYEE}.email, ${Tables.EMPLOYEE}.employeeId, ${Tables.EMPLOYEE}.organization, ${Tables.EMPLOYEE}.createdOn
                         FROM ${Tables.EMPLOYEE} WHERE ${Tables.EMPLOYEE}.employeeId='${employeeId}'`
            db.query(query, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(Object.assign({}, res[0]));
                }
                return resolve(null);
            })
        })
    }

    public static insertEmployee(firstName: string, lastName: string, email: string, password: string, employeeId: string, organization: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO ${Tables.EMPLOYEE} (firstName, lastName, email, password, employeeId ,organization) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '${employeeId}','${organization}')`
            db.query(query, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res.insertedId);
            })
        })
    }
}