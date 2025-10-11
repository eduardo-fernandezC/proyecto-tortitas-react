import { AppRoutes } from "./routes/AppRoutes";
import { NotificationContainer } from "./components/atoms/Notification";

export default function App() {
  return (
    <>
      <AppRoutes />
      <NotificationContainer />
    </>
  );
}