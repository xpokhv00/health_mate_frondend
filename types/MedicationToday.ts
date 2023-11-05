import { MedicationTime } from "./MedicationTime";

export interface MedicationToday {
    name: string,
    value: number,
    dosage: string,
    times: MedicationTime[]
}