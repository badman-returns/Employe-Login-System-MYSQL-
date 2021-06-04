"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const table_config_1 = require("../configs/table.config");
const db_1 = __importDefault(require("../model/db"));
class CreateTablesAndInsertMasterData {
    constructor() {
    }
    // Employee Table
    static createEmployeeTable() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db_1.default.query(`CREATE TABLE IF NOT EXISTS ${table_config_1.Tables.EMPLOYEE} (
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
                    if (res.length) {
                        return resolve(true);
                    }
                    return resolve(null);
                });
            });
        });
    }
}
exports.default = CreateTablesAndInsertMasterData;
