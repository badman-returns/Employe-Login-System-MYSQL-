import { User } from "./user.model";

interface Employee extends User {
    employeeId: number,
    organization: string,
}

export {
    Employee,
}