import userImg from "@/assets/images/profile/user.jpg";

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

export default notifications;
