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
        href: "/",
      },
      {
        icon: <EmojiPeopleIcon />,
        label: "Clients",
        href: "/",
      },
      {
        icon: <PolicyIcon />,
        label: "Policies",
        href: "/",
      },
      {
        icon: <GppMaybeIcon />,
        label: "Claims",
        href: "/",
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
        label: "profile",
        href: "/",
      },
      {
        icon: <SettingsIcon />,
        label: "Settings",
        href: "/",
      },
      {
        icon: <LogoutIcon />,
        label: "logout",
        href: "/",
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="" key={i.title}>
          <span>{i.title}</span>
          {i.items.map((item) => (
            <Link className="flex flex-row" href={item.href} key={item.label}>
              <Box sx={{ fontSize: 20 }}>{item.icon}</Box>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
