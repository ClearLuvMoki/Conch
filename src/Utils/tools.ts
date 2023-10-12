import {BoxSize} from "@/Components/Scaffold";
import {GridCardWidth, GridCardHeight} from "@/constant/ui.tsx";

export const handleCalculateSize = (size: BoxSize): { width: number; height: number } => {
    switch (size) {
        case "1x1":
            return {width: GridCardWidth, height: GridCardHeight}
        case "1x2":
            return {width: GridCardWidth * 2, height: GridCardHeight}
        case "2x2":
            return {width: GridCardWidth * 2, height: GridCardHeight * 2}
        case "2x4":
            return {width: GridCardWidth * 2, height: GridCardHeight * 2 * 2}
        default:
            return {width: GridCardWidth, height: GridCardHeight}
    }
}
