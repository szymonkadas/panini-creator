import GrainIcon from "../components/icons/GrainIcon";
import WheatIcon from "../components/icons/WheatIcon";

export const breadVariants = ["WHEAT", "FULL GRAIN"] as const;
const wheatIcon = WheatIcon();
const grainIcon = GrainIcon();
export const breadIcons = [wheatIcon, grainIcon];
