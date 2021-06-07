interface User {
    id: number,
    firstName: string,
    lastName: string,
    role: string,
    email: string;
    password: string,
    createdOn: Date,
}

export {
    User,
}