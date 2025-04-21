import HomeIcon from "@mui/icons-material/Home";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PolicyIcon from "@mui/icons-material/Policy";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SummarizeIcon from "@mui/icons-material/Summarize";
import SettingsIcon from "@mui/icons-material/Settings";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/material";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <HomeIcon />,
        label: "Home",
        href: "/admin",
      },
      {
        icon: <EmojiPeopleIcon />,
        label: "Clients",
        href: "/clients",
      },
      {
        icon: <PolicyIcon />,
        label: "Policies",
        href: "/policies",
      },
      {
        icon: <GppMaybeIcon />,
        label: "Claims",
        href: "/Claims",
      },
      {
        icon: <AutorenewIcon />,
        label: "Renewals",
        href: "/",
      },
      {
        icon: <SupportAgentIcon />,
        label: "Agents",
        href: "/",
      },
      {
        icon: <SummarizeIcon />,
        label: "Reports",
        href: "/",
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <PermIdentityIcon />,
        label: "Profile",
        href: "/",
      },
      {
        icon: <SettingsIcon />,
        label: "Settings",
        href: "/",
      },
      {
        icon: <LogoutIcon />,
        label: "Logout",
        href: "/",
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-4" key={i.title}>
          <span className="hidden lg:block text-gray-600 my-4">{i.title}</span>
          {i.items.map((item) => (
            <Link className="flex items-center justify-center lg:justify-start gap-4 text-gray-400 py-2" href={item.href} key={item.label}>
              <Box sx={{ fontSize: 20 }}>{item.icon}</Box>
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
