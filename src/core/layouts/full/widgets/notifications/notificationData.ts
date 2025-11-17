import userImg from "@/assets/images/profile/user.jpg";

interface notificationType {
  avatar: string;
  title: string;
  subtitle: string;
  num: number;
}

const notifications: notificationType[] = [
  {
    avatar: userImg,
    title: "common:notifications.itemTitle",
    subtitle: "common:notifications.itemSubtitle",
    num: 1,
  },
  {
    avatar: userImg,
    title: "common:notifications.itemTitle",
    subtitle: "common:notifications.itemSubtitle",
    num: 2,
  },
  {
    avatar: userImg,
    title: "common:notifications.itemTitle",
    subtitle: "common:notifications.itemSubtitle",
    num: 3,
  },
  {
    avatar: userImg,
    title: "common:notifications.itemTitle",
    subtitle: "common:notifications.itemSubtitle",
    num: 4,
  },
  {
    avatar: userImg,
    title: "common:notifications.itemTitle",
    subtitle: "common:notifications.itemSubtitle",
    num: 5,
  },
];

export default notifications;
