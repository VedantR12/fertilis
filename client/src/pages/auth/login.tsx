import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";

import { login, getCurrentUser } from "@/services/auth";
import useAuthStore from "@/store/authStore";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            setLoading(true);

            const token = await login(data);

            localStorage.setItem("access_token", token.access_token);

            const user = await getCurrentUser();

            setAuth(token.access_token, user);

            toast.success("Login successful");

            navigate("/admin");
        } catch (error) {
            toast.error("Invalid username or password");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/20">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>FertiLIS Login</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label>Username</Label>

                            <Input
                                {...register("username")}
                                placeholder="Enter username"
                            />

                            {errors.username && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Password</Label>

                            <Input
                                type="password"
                                {...register("password")}
                                placeholder="Enter password"
                            />

                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}