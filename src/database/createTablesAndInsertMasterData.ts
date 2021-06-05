import { Encryption } from '../utility';
import { Tables } from '../configs/table.config';
import db from '../model/db';

export default class CreateTablesAndInsertMasterData {

    constructor() {

    }

    // Super Admin Table
    private static async createAdminUserTable(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // db.query(`DROP TABLE ${Tables.ADMIN}`)
            db.query(`CREATE TABLE IF NOT EXISTS ${Tables.ADMIN} (
                id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),
                name VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                createdOn DATETIME default current_timestamp,
                CONSTRAINT contact_unique UNIQUE(email))
                `, (err, res) => {
                    if (err){
                        return reject(err);
                    }
                    if (res.length) {
                        return resolve(true);
                    }
                    return resolve(null);
                }
            )
        })
    }

    private static createSuperAdminUser(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const user = {
                name: "Administrator",
                role: "SUPER_ADMIN",
                email: "admin@admin.com",
                password: Encryption.encryptPassword(process.env.ADMIN_DEFAULT_PASSWORD),
            };

            db.query(`INSERT IGNORE INTO ${Tables.ADMIN} SET ?`, user, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(true);
                }
                return resolve(null);
            });
        });
    }

    public static async createUserTableAndSuperAdmin() {
        try {
            await CreateTablesAndInsertMasterData.createAdminUserTable();
        } catch (e) {
            console.error('CREATE SUPER USER TABLE', e);
        }

        try {
            await CreateTablesAndInsertMasterData.createSuperAdminUser();
        } catch (e) {
            console.error('CREATE SUPER ADMIN', e);
        }
    }


    // Employee Table
    public static async createEmployeeTable() {
        return new Promise((resolve, reject) => {
            // db.query(`DROP TABLE ${Tables.EMPLOYEE}`)
            db.query(`CREATE TABLE IF NOT EXISTS ${Tables.EMPLOYEE} (
                id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                employeeId VARCHAR(255) NOT NULL,
                organization VARCHAR(255) NOT NULL,
                createdOn DATETIME NOT NULL DEFAULT current_timestamp,                
                CONSTRAINT contacts_unique UNIQUE(email))
            `, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(true);
                }
                return resolve(null);
            });
        });
    }

}


