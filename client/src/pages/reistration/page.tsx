import { Link } from "react-router";
import { z } from "zod";
import Button from "../../components/Button";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Registration() {
  const signinSchema = z.object({
    name: z.string().nonempty("Name is required!"),
    email: z.string().min(1, "Email is required!").email(),
    password: z
      .string()
      .nonempty("Password is required!")
      .min(6, "Password must be at least 6 characters"),
  });

  type FormData = z.infer<typeof signinSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-8 w-full max-w-md">
      <h1 className="text-center text-white text-2xl font-bold mb-6">
        Your logo
      </h1>

      <h2 className="text-xl text-white font-semibold mb-6">Signup</h2>

      <form
        className="space-y-6"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
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
        <Button type="submit" className="w-full">
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
