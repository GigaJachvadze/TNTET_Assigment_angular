import { weatherUnit } from "../types/types";

const units = ["standard", "metric", "imperial"]

export function isUnit(unit: any): unit is weatherUnit {
    return units.includes(unit);
}