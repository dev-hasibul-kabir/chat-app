import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required!").email(),
  password: z
    .string()
    .nonempty("Password is required!")
    .min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-8 w-full max-w-md">
      <h1 className="text-center text-white text-2xl font-bold mb-6">
        Your logo
      </h1>

      <h2 className="text-xl text-white font-semibold mb-6">Login</h2>

      <form
        className="space-y-6"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
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

        <Button type="submit" loading={isSubmitting} className="mt-4 w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-white/80">
        Don't have an account?{" "}
        <a href="register" className="underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
