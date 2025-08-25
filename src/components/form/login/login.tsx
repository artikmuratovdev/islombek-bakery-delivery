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
        if (response?.role === "DRIVER") {
          useStorage.setCredentials({
            accessToken: response?.token,
            refreshToken: response?.refreshToken,
          });

          toast.success(" Tizimga muvaffaqiyatli kirdingiz!", {
            duration: 3000,
            position: "top-right",
          });

          setTimeout(() => navigate("/dashboard"), 1200);
        } else {
          toast.error("Sizda huquq yo‘q!", {
            duration: 3000,
            position: "top-right",
          });
        }
      },
      onError: (error) => {
        toast.error(error?.data?.message || "Login muvaffaqiyatsiz!", {
          duration: 3000,
          position: "top-right",
        });
        reset();
      },
    });
  };

  return (
    <div className="p-5">
      <Toaster position="top-right" reverseOrder={false} />

      <form onSubmit={handleSubmit(onSubmit)} className="pt-5 space-y-5">
        <Controller
          name="username"
          control={control}
          rules={{
            required: "⚠️ Username kiritilishi shart",
          }}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                type="text"
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
          rules={{
            required: "⚠️ Parol kiritilishi shart",
          }}
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
          {isLoading ? "⏳ Yuklanmoqda..." : "Login"}
        </Button>
      </form>
    </div>
  );
};
