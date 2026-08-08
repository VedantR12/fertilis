import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpeg";
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

            toast.success("Welcome to Embrogen");

            navigate("/admin");
        } catch (error) {
            toast.error("Incorrect username or password.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F6F8FB] px-6">
            <Card className="w-full max-w-md border border-slate-200 shadow-xl">
                <CardHeader className="pb-2 text-center">

    <div className="mb-6 flex justify-center">

    <img
        src={logo}
        alt="Embrogen Logo"
        className="h-24 w-24 rounded-3xl object-contain"
    />

</div>

    <CardTitle className="text-3xl">

        EMBROGEN

    </CardTitle>

    <p className="mt-2 text-sm text-slate-500">

        Embryological Services

    </p>

</CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <Label className="mb-2 block font-medium text-slate-700">Username</Label>

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
                            <Label className="mb-2 block font-medium text-slate-700">Password</Label>

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
    size="lg"
    className="mt-3 w-full"
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
