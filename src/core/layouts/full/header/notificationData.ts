import userImg from "@/assets/images/profile/user.jpg";

interface notificationType {
  avatar: string;
  title: string;
  subtitle: string;
}

const notifications: notificationType[] = [
  { avatar: userImg, title: "Notification 1", subtitle: "Details for Notification 1" },
  { avatar: userImg, title: "Notification 2", subtitle: "Details for Notification 2" },
  { avatar: userImg, title: "Notification 3", subtitle: "Details for Notification 3" },
  { avatar: userImg, title: "Notification 4", subtitle: "Details for Notification 4" },
  { avatar: userImg, title: "Notification 5", subtitle: "Details for Notification 5" },
];

export default notifications;
