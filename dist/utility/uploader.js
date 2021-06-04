"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
class FileUploader {
    constructor() {
    }
    static getFolderPathName(fieldname, rootPath) {
        return `${rootPath}/${fieldname}/`;
    }
    static getStorage(rootPath) {
        const storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                fs_1.default.mkdirSync(FileUploader.getFolderPathName(file.fieldname, rootPath), { recursive: true });
                cb(null, FileUploader.getFolderPathName(file.fieldname, rootPath));
            },
            filename: (req, file, cb) => {
                console.log(FileUploader.getFolderPathName(file.fieldname, rootPath) + file.originalname);
                cb(null, req.admissionID ? req.admissionID.split('/').join('-') + '-' + file.fieldname + '.' + file.originalname.split('.').reverse()[0] : new Date().getTime() + '-' + file.originalname);
            }
        });
        return storage;
    }
}
const GetStorage = FileUploader.getStorage;
exports.GetStorage = GetStorage;
