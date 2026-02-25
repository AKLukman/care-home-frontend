// apiTags.ts
export const apiTags = {
    admin: "admin",
    patient: "patient",
    careWorker: "careWorker",
    medication: "medication",
    schedule: "schedule",
    medicationRecord: "medicationRecord",
} as const;

export const apiTagList = [
    apiTags.admin,
    apiTags.patient,
    apiTags.careWorker,
    apiTags.medication,
    apiTags.schedule,
    apiTags.medicationRecord

] as const;

