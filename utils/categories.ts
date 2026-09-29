import { IconType } from "react-icons";
import { AiOutlineDesktop, AiOutlineLaptop } from "react-icons/ai";
import { MdOutlineKeyboard, MdOutlineStorefront, MdOutlineTv, MdOutlineWatch } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";

export const categories: { label: string; icon: IconType }[] = [
  { label: "All", icon: MdOutlineStorefront },
  { label: "Phone", icon: MdOutlinePhoneIphone },
  { label: "Laptop", icon: AiOutlineLaptop },
  { label: "Desktop", icon: AiOutlineDesktop },
  { label: "Watch", icon: MdOutlineWatch },
  { label: "TV", icon: MdOutlineTv },
  { label: "Accessories", icon: MdOutlineKeyboard },
];
