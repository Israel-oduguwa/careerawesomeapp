"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import {
    loginUser,
    selectUserData
} from '../lib/redux/features/UserAuthentication/authenticationSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast'; // Import useToast hook
import { ToastAction } from "@/components/ui/toast"
import { cn } from '@/lib/utils';

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectUserData);
    const { push } = useRouter();
    const { toast } = useToast(); // Use the useToast hook to show toast messages

    // State variables for email and password inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Dispatch login action with email and password payload
        dispatch(loginUser({ email, password }));
        console.log(data)
    };

    // if the user is not authenticated push to the login page
    useEffect(() => {
        if (data.authenticated) {
            push('/');
            toast({
                variant: "default",
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[400px] md:top-4 md:right-4 text-zinc-800 font-bold shadow-none'
                  ),
                description:"Login is successful"
                
            })
        } else {
            
            push('/login');
        }
    }, [push, data.authenticated]);

    useEffect(() => {
        if (data.error) {
            toast({
                variant: "destructive",
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[780px] md:top-4 md:right-4'
                  ),
                description: data.error,
                action: <ToastAction altText="Try again">Try again</ToastAction>
            })
        }
    }, [data.error]);
    console.log(data)

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[100vh]">
         
            <div className="hidden bg-muted lg:block">
                <Image
                    src="https://ui.shadcn.com/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[450px] gap-6">
                    <div className="grid gap-2">
                        <div className='mb-3' >
                            <img style={{width:"50px"}} src='https://firebasestorage.googleapis.com/v0/b/career-awesome-ac470.appspot.com/o/Logo%20only%20viewCA%20LOGO%20(2).svg?alt=media&token=cbaf05fd-b6d9-482d-b037-d4ee73bbe0b8'/>
                        </div>
                        <h1 className="text-3xl font-bold">Login to your account</h1>
                        <p className="mt-1 text-balance text-muted-foreground">
                            Welcome back select your method to login
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2 mb-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="grid gap-2">
                            <div className="flex items-center mb-2">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button disabled={data.loginButtonLoad} onClick={handleLogin} type="submit" className="w-full">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                        
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
