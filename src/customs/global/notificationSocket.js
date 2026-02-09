import { io } from "socket.io-client";
import { getNotification } from "../../store/features/notificationSlice";

let socket;

export const connectNotificationSocket = (dispatch, userId) => {
  if (socket) return;

  socket = io("http://localhost:8000", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("🔔 Socket connected:", socket.id);
    socket.emit("join-notification", userId.userId);
  });

  // 🔥 WHEN BACKEND SAYS "REFRESH"
  socket.on("notification:refresh", async (userId) => {
    console.log("🔄 Refresh notifications for user:", userId);
    await dispatch(getNotification(userId));
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });
};
