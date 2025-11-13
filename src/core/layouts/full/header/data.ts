import userImg from "@/assets/images/profile/user.jpg";
import iconAccount from "@/assets/images/icons/icon-account.svg";

// Notifications dropdown
interface notificationType {
  avatar: string;
  title: string;
  subtitle: string;
}

const notifications: notificationType[] = [
  {
    avatar: userImg,
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    avatar: userImg,
    title: "New message received",
    subtitle: "Salma sent you new message",
  },
  {
    avatar: userImg,
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    avatar: userImg,
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
  {
    avatar: userImg,
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    avatar: userImg,
    title: "New message received",
    subtitle: "Salma sent you new message",
  },
  {
    avatar: userImg,
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    avatar: userImg,
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
];

//
// Profile dropdown
//
interface ProfileType {
  href: string;
  title: string;
  subtitle: string;
  icon: any;
}
const profile: ProfileType[] = [
  {
    href: "/",
    title: "My Profile",
    subtitle: "Account Settings",
    icon: iconAccount,
  },
];

export { notifications, profile };
