import { Link, useNavigate } from "react-router";
import { z } from "zod";
import Button from "../../components/Button";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/useAuthStore";

const signupSchema = z.object({
  name: z.string().nonempty("Name is required!"),
  email: z.string().min(1, "Email is required!").email(),
  password: z
    .string()
    .nonempty("Password is required!")
    .min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof signupSchema>;

export default function Registration() {
  const navigate = useNavigate();
  const { register, loading } = useAuthStore();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { success, message } = await register(data);
      if (success) {
        console.log(message);
        navigate("/", { replace: true });
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-8 w-full max-w-md">
      <h1 className="text-center text-white text-2xl font-bold mb-6">
        Your logo
      </h1>

      <h2 className="text-xl text-white font-semibold mb-6">Signup</h2>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              label="Name"
              type="text"
              placeholder="John Doe"
              value={field.value}
              onChange={field.onChange}
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="Email"
              type="email"
              placeholder="user@gmail.com"
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
        <Button type="submit" className="w-full" loading={loading}>
          Sign up
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-white/80">
        Already registered?{" "}
        <Link to="/login" className="underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
