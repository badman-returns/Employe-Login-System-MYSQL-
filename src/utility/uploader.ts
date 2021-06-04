import multer from 'multer';
import fs from 'fs';
import { Request } from 'express';
import { AdmissionRequest } from '../interfaces';

class FileUploader {
    constructor() {

    }

    private static getFolderPathName(fieldname: string, rootPath: string) {
        return `${rootPath}/${fieldname}/`;
    }

    public static getStorage(rootPath: string) {
        const storage = multer.diskStorage({
            destination: (req: AdmissionRequest, file, cb)=> {
                fs.mkdirSync(FileUploader.getFolderPathName(file.fieldname, rootPath), { recursive: true });
                cb(null,  FileUploader.getFolderPathName(file.fieldname, rootPath));
            },
            filename: (req: AdmissionRequest, file, cb)=> {
                console.log(FileUploader.getFolderPathName(file.fieldname, rootPath) + file.originalname);
                
                cb(null, req.admissionID ? req.admissionID.split('/').join('-') + '-' + file.fieldname + '.' + file.originalname.split('.').reverse()[0] : new Date().getTime() + '-' + file.originalname);
            }
        });
        return storage;
    }
}

const GetStorage = FileUploader.getStorage;

export {
    GetStorage,
}