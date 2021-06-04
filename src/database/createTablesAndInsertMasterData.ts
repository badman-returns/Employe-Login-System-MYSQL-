import { Tables } from '../configs/table.config';
import db from '../model/db';

export default class CreateTablesAndInsertMasterData {

    constructor() {

    }

    // Employee Table
    public static async createEmployeeTable(){
        return new Promise((resolve, reject) => {
            db.query(`CREATE TABLE IF NOT EXISTS ${Tables.EMPLOYEE} (
                id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                emailId VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                employeeId VARCHAR(255) NOT NULL,
                organization VARCHAR(255) NOT NULL,
                createdOn DATETIME NOT NULL DEFAULT current_timestamp,                
                CONSTRAINT contacts_unique UNIQUE (id))
            `, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length){
                    return resolve(true);
                }
                return resolve(null);
            });
        });
    }
    
}


