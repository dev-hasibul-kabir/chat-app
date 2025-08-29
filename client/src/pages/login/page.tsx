import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required!").email(),
  password: z
    .string()
    .nonempty("Password is required!")
    .min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { success, message } = await login(data);

      if (success) {
        // toast.success(message);
        console.log(message);
        navigate("/", { replace: true });
      } else {
        console.log(message);
        // toast.error(message);
      }
    } catch (err) {
      // fallback in case something unexpected happens
      // toast.error("An unexpected error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-8 w-full max-w-md">
      <h1 className="text-center text-white text-2xl font-bold mb-6">
        Your logo
      </h1>

      <h2 className="text-xl text-white font-semibold mb-6">Login</h2>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="Email"
              type="email"
              placeholder="user@mail.com"
              value={field.value}
              onChange={field.onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={field.value}
              onChange={field.onChange}
              error={errors.password?.message}
            />
          )}
        />

        <Button type="submit" loading={loading} className="mt-4 w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-white/80">
        Don't have an account?{" "}
        <Link to="/register" className="underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
