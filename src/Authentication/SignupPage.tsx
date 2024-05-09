// pages/signup.tsx
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { selectUserData } from '../lib/redux/features/UserAuthentication/authenticationSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast";
import Link from 'next/link';

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectUserData);
  const { push } = useRouter();
  const { toast } = useToast();

  // State variables for signup form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAgreement, setIsAgreement] = useState(false);

  const handleSignup = () => {
    // Validate form fields
    if (!email || !password || !confirmPassword || !isAgreement) {
      toast({
        variant: "destructive",
        description: "Please fill in all fields and agree to terms and conditions.",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        description: "Passwords do not match.",
      });
      return;
    }
    // Dispatch signup action with form data
    // dispatch(signUpUser({ email, password }));
  };

  // Redirect to home page if signup is successful
  useEffect(() => {
    if (data.authenticated) {
      push('/');
      toast({
        variant: "default",
        description: "Signup successful.",
      });
    }
  }, [push, data.authenticated]);

  useEffect(() => {
    if (data.error) {
      toast({
        variant: "destructive",
        description: data.error,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [data.error]);

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        {/* Placeholder image or any content */}
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[450px] gap-6">
          <div className="grid gap-2">
            <div className='mb-3' >
              <img style={{ width: "50px" }} src='https://firebasestorage.googleapis.com/v0/b/career-awesome-ac470.appspot.com/o/Logo%20only%20viewCA%20LOGO%20(2).svg?alt=media&token=cbaf05fd-b6d9-482d-b037-d4ee73bbe0b8' />
            </div>
            <h1 className="text-3xl font-bold">Sign up for your account</h1>
            <p className="mt-1 text-balance text-muted-foreground">
              Before you continue, we just need you to agree to our terms and conditions.
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
            <div className="grid gap-2 mb-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2 mb-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input
                id="isAgreement"
                type="checkbox"
                checked={isAgreement}
                onChange={() => setIsAgreement(!isAgreement)}
                className="w-4 h-4 rounded-md text-zinc-800 border-gray-300 focus:ring-zinc-500"
              />
              <Label htmlFor="isAgreement" className="cursor-pointer">
                I agree to the terms and conditions
              </Label>
            </div>
            <Button disabled={data.loading} onClick={handleSignup} type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
