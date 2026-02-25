import type { TAdmin, TPatient } from "./userManagementType";

export type TMedicationTime = "BREAKFAST" | "LUNCH" | "TEA" | "DINNER";
export type TMedicationStatus = "PENDING" | "TAKEN" | "MISSED";



export type TMarRecord = {
    _id: string;
    medication: {
        _id: string;
        name: string;
        strength: string;
        form: string;
    };
    time: TMedicationTime;
    dose: number;
    date: string;
    status: TMedicationStatus;
    administeredBy: TAdmin
    patient: TPatient
};

export const MEDICATION_STATUS_OPTIONS: {
    value: TMedicationStatus;
    label: string;
}[] = [
        { value: "PENDING", label: "PENDING" },
        { value: "TAKEN", label: "TAKEN" },
        { value: "MISSED", label: "MISSED" },
    ];
