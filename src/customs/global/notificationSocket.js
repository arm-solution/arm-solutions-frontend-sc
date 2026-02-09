import { io } from "socket.io-client";
import { getNotification } from "../../store/features/notificationSlice";

let socket;

export const connectNotificationSocket = (dispatch, params) => {
  if (socket) return;

  const {userId, departmentId} = params

  socket = io("http://localhost:8000", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    socket.emit("join-notification", {
      userId,
      department_id: departmentId,
    });
  });

  socket.on("notification:refresh", () => {
    dispatch(
      getNotification({
        userId,
        departmentId,
        page: 1,
        limit: 5,
      })
    );
  });
};
