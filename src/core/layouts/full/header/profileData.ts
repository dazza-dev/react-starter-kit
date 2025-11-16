import iconAccount from "@/assets/images/icons/icon-account.svg";

interface ProfileType {
  href: string;
  title: string;
  subtitle: string;
  icon: string;
}

const profile: ProfileType[] = [
  {
    href: "/",
    title: "My Profile",
    subtitle: "Account Settings",
    icon: iconAccount,
  },
];

export { profile };
