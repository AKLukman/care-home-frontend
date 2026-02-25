export const MedicationForm = [ 'TABLET', 'SYRUP', 'CAPSULE', 'INJECTION' ] as const;

export type TMedicationForm =
    | "TABLET"
    | "SYRUP"
    | "CAPSULE"
    | "INJECTION";


export const MEDICATIONSFORM_OPTIONS: {
    value: TMedicationForm;
    label: string;
}[] = [
        { value: "TABLET", label: "TABLET" },
        { value: "SYRUP", label: "SYRUP" },
        { value: "CAPSULE", label: "CAPSULE" },
        { value: "INJECTION", label: "INJECTION" },
    ];

export type TMedication = {
    _id: string;
    name: string;
    strength: string;
    form: TMedicationForm;
    description?: string;
    isDeleted: boolean;
};
