import { EditPasswordForm, Logout, ProfileTop } from "@/components";
import { MySalaries } from "./components";

export const Profile = () => {
  return (
    <div className="bg-[#1C2C57] min-h-screen">
      <ProfileTop />
      <div className="mt-[150px] p-5">
        <div className="mt-[60px] flex flex-col gap-y-5">
          <MySalaries />
          <EditPasswordForm />
          <Logout />
        </div>
      </div>
    </div>
  );
};
