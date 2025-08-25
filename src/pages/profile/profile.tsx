import { EditPasswordForm, Logout, ProfileTop } from "@/components";
import { ArrowDown } from "@/icons";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#1C2C57] min-h-screen">
      <header className="py-3 border-b border-yellow-400 rounded-4xl flex justify-between items-center px-4">
        <ProfileTop />
      </header>
      <div className="p-5">
        <div className="mt-[60px] flex flex-col gap-y-5">
          <div className="border-2 border-yellow-400 px-5 py-3 rounded-lg bg-white flex justify-between items-center">
            <h3 className="text-blue-950 text-lg font-bold">Maoshlarim</h3>
            <button
              onClick={() => navigate("/my-salaries")}
              type="button"
              className="p-2 bg-blue-950 rounded-lg"
            >
              <ArrowDown className="text-yellow-400 rotate-90" />
            </button>
          </div>
          <EditPasswordForm />
          <Logout />
        </div>
      </div>
    </div>
  );
};
