import type { TUser } from "../redux/features/auth/authSlice"

export type TBloodGroup =
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | "O+"
    | "O-";

export type TCareWorkerDesignation =
    | "CARE_ASSISTANT"
    | "SENIOR_CARE_ASSISTANT"
    | "SUPPORT_WORKER"
    | "NURSE"
    | "TEAM_LEADER"
    | "DEPUTY_MANAGER";


export type TGender = 'male' | 'female' | 'other';

export const BLOOD_GROUP_OPTIONS: {
    value: TBloodGroup;
    label: string;
}[] = [
        { value: "A+", label: "A+" },
        { value: "A-", label: "A-" },
        { value: "B+", label: "B+" },
        { value: "B-", label: "B-" },
        { value: "AB+", label: "AB+" },
        { value: "AB-", label: "AB-" },
        { value: "O+", label: "O+" },
        { value: "O-", label: "O-" },
    ];

export const GENDER_OPTIONS: {
    value: TGender;
    label: string;
}[] = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
    ];

export const CARE_WORKER_DESIGNATION_OPTIONS: {
    value: TCareWorkerDesignation;
    label: string;
}[] = [
        { value: "CARE_ASSISTANT", label: "Care Assistant" },
        { value: "SENIOR_CARE_ASSISTANT", label: "Senior Care Assistant" },
        { value: "SUPPORT_WORKER", label: "Support Worker" },
        { value: "NURSE", label: "Nurse" },
        { value: "TEAM_LEADER", label: "Team Leader" },
        { value: "DEPUTY_MANAGER", label: "Deputy Manager" },
    ];



export type TName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type TAddress = {
    address1: string
    town: string
    county: string
    postcode: string
    country: string
}

export type TAdmin = {
    _id: string
    user: TUser
    name: TName
    gender: string
    dateOfBirth: string
    email: string
    contactNo: string
    emergencyContactNo: string
    address: TAddress
    profileImg?: string
    isDeleted: boolean
}
export type TCareworker = {
    _id: string
    user: TUser
    name: TName
    gender: string
    dateOfBirth: string
    email: string
    designation: string
    contactNo: string
    emergencyContactNo: string
    address: TAddress
    profileImg?: string
    isDeleted: boolean
}
export type TPatient = {
    _id: string
    createdBy: TUser
    name: TName
    gender: string
    dateOfBirth: string
    email: string
    designation: string
    contactNo: string
    emergencyContactNo: string
    address: TAddress
    allergies: string[];
    profileImg?: string
    isDeleted: boolean
}