export type User = {
    id: number,
    email: string,
    password: string,
    login: string,
    firstName: string,
    lastName: string,
    resetKey: string,
    resetDate: string,
    language: string,
    activated: boolean,
    roleUser: string,
    createdAt: string,
    updatedAt: string
}

export type Guest = {
    id: number,
    guestName: string,
    phoneNumber: string,
    userId: number
}

export type Response = {
    message: string,
    error: string,
    success: string,
    status: string,
}