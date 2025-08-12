"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginValues) => {
        try {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (res?.error) {
                toast.error(res.error || "Invalid credentials");
            } else {
                toast.success("Login successful! Redirecting...");
                router.push("/");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
            <Card className="w-full max-w-md bg-gray-900 border border-gray-800 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-white text-center text-2xl font-semibold">
                        Welcome Back
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email */}
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                                disabled={isSubmitting}
                                className="bg-gray-800 text-white border-gray-700
                                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    {...register("password")}
                                    disabled={isSubmitting}
                                    className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1 -mb-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${isSubmitting
                                ? "bg-blue-700 text-white cursor-not-allowed opacity-70"
                                : "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700"
                                }`}
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-gray-400 text-sm">
                        Don&apos;t have an account?{" "}
                        <a
                            href="/register"
                            className="text-blue-400 cursor-pointer hover:underline"
                        >
                            Register
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
