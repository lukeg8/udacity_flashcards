import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = "FLASHCARDS_NOTIFICATIONS";

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

function createNotification() {
    return {
        title: "Time to STUDY",
        body: "Please STUDY, I beg of you!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true
        }
    };
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                    ({ status }) => {
                        if (status === "granted") {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(7);
                            tomorrow.setMinutes(5);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: today,
                                    repeat: "day"
                                }
                            );

                            AsyncStorage.setItem(
                                NOTIFICATION_KEY,
                                JSON.stringify(true)
                            );
                        }
                    }
                );
            }
        });
}