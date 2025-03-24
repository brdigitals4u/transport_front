import React from "react";
import { IconType, IconBaseProps } from "react-icons"; // Import IconBaseProps
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";
import * as TbIcons from "react-icons/tb";
import * as GiIcons from "react-icons/gi";
// tb/TbCurrentLocation

const iconLibraries: Record<string, Record<string, IconType>> = {
  md: MdIcons,
  fa: FaIcons,
  ai: AiIcons,
  bi: BiIcons,
  ri: RiIcons,
  hi: HiIcons,
  tb: TbIcons,
  gi: GiIcons,
};

interface DynamicIconProps {
  iconName: string;
  size?: number;
  color?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, size }) => {
  const [library, icon] = iconName.split("/");
  const icons = iconLibraries[library.toLowerCase()];

  if (!icons) {
    return null;
  }

  const IconComponent = icons[icon] as IconType | undefined;

  if (!IconComponent) {
    return null;
  }

  // Correct approach using a type assertion and spread props
  return <>{IconComponent({ size })}</>;
};

export default DynamicIcon;
