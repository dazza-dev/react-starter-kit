import iconAccount from "@/assets/images/icons/icon-account.svg";

interface ProfileType {
  href: string;
  title: string;
  subtitle: string;
  icon: string;
}

const profileData: ProfileType[] = [
  {
    href: "/",
    title: "common:profile.myProfile",
    subtitle: "common:profile.accountSettings",
    icon: iconAccount,
  },
];

export default profileData;
