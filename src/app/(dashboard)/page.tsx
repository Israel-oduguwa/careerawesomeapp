import { AuthWrapper } from "@/Authentication/AuthWrapper";
import HomePage from "../../DashBoard/Home/HomePage";

export default function page() {
  return (
    <AuthWrapper> 
      <HomePage />
    </AuthWrapper>
  );
}
