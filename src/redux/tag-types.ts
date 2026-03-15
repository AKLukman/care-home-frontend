// apiTags.ts
export const apiTags = {
    admin: "admin",
    patient: "patient",
    careWorker: "careWorker",
    medication: "medication",
    schedule: "schedule",
    medicationRecord: "medicationRecord",
    profile: "profile"
} as const;

export const apiTagList = [
    apiTags.admin,
    apiTags.patient,
    apiTags.careWorker,
    apiTags.medication,
    apiTags.schedule,
    apiTags.medicationRecord,
    apiTags.profile

] as const;

