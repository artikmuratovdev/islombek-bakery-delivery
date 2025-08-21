import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "@/components/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/app/api/auth-api";
import { useHandleRequest } from "@/hooks";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useStorage } from "@/utils";
interface FormData {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const handleRequest = useHandleRequest();
  const token = useStorage.getTokens()?.accessToken;

  if (token) {
    navigate("/dashboard");
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await handleRequest({
      request: async () => {
        return await login(data).unwrap();
      },
      onSuccess: (response) => {
        useStorage.setCredentials({
          accessToken: response?.token,
          refreshToken: response?.refreshToken,
        });
        toast.success("Tizimga muvaffaqiyatli kirdingiz!");
        setTimeout(() => navigate("/"), 1000);
      },
      onError: (error) => {
        toast.error(error?.data?.message || "Login failed");
        reset();
      },
    });
  };

  return (
    <div className="p-5">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-5 space-y-5">
        <Controller
          name="username"
          control={control}
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                type="username"
                placeholder="Username..."
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-red-500 text-left text-sm">
                  {String(errors.username.message)}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Password..."
                className={errors.password ? "border-red-500" : ""}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-left text-sm">
                  {String(errors.password.message)}
                </p>
              )}
            </div>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 text-xl text-[#1C2C57] font-bold bg-yellow-400"
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
};
