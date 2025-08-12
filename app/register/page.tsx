"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
    });

    const mutation = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            const res = await axios.post("/api/auth/register", data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Registration successful! Redirecting...");
            router.push("/login");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error || "Registration failed");
        },
    });

    const onSubmit = (data: RegisterValues) => {
        mutation.mutate({ email: data.email, password: data.password });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
            <Card className="w-full max-w-md bg-gray-900 border-gray-800 shadow-lg shadow-black/30">
                <CardHeader>
                    <CardTitle className="text-white text-center text-xl font-bold">
                        Create an Account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                                disabled={mutation.isPending}
                                className="bg-gray-800 text-white border-gray-700
                                 placeholder-gray-400
                                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    {...register("password")}
                                    disabled={mutation.isPending}
                                    className="bg-gray-800 text-white border-gray-700
                                     placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p
                                    className="text-red-500 text-sm mt-1 -mb-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <div className="relative">
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword")}
                                    disabled={mutation.isPending}
                                    className="bg-gray-800 text-white border-gray-700
                                     placeholder-gray-400
                                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-3 flex 
                                    items-center text-gray-400 hover:text-white"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1 -mb-1">
                                    {errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className={`w-full py-2 px-4 rounded-lg font-semibold
                                 transition-colors duration-200 
                                ${mutation.isPending
                                    ? "bg-blue-700 text-white cursor-not-allowed opacity-70"
                                    : "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700"
                                }`}
                        >
                            {mutation.isPending ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-gray-400 text-sm">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-blue-400 cursor-pointer hover:underline"
                        >
                            Login
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
