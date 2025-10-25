import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

interface triggerNotificationProps {
  title: string;
  body: string;
  trigger?: Notifications.NotificationTriggerInput | null;
}

export const triggerNotification = async ({
  title,
  body,
  trigger = null,
}: triggerNotificationProps) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger,
  });
};
