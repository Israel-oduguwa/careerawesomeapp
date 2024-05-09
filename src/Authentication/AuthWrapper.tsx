"use client";
import { getValidAuthToken } from "@/lib/auth";
import {
  getUserData,
  logoutUser,
  selectUserData,
} from "@/lib/redux/features/UserAuthentication/authenticationSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useIsOnline } from "react-use-is-online";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { useToast } from "@/components/ui/use-toast"; // Import useToast hook
import { ToastAction } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const data: any = useAppSelector(selectUserData);
  const { toast } = useToast(); // Use the useToast hook to show toast messages
  console.log("Authentication Status:", data.authenticated);
  const { isOnline, isOffline, error } = useIsOnline();
  useEffect(() => {
    const getValidatedToken = async () => {
      const token = await getValidAuthToken();
      console.log("Validated Token:", token);
      if (!token) {
        console.log("is not valid logout user");
        push("/login");
        // if the token is not there we want to set authentication to false so that login will not redirect us back
        // then we logout
        // check if the user is online
        if (!isOnline) {
          toast({
            variant: "destructive",
            className: cn(
              "top-0 right-0 flex fixed md:max-w-[780px] md:top-4 md:right-4"
            ),
            description:
              "Oops! It seems you're offline. Please check your internet connection and try again later.",
            action: (
              <ToastAction onClick={getValidatedToken} altText="Try again">
                Try again
              </ToastAction>
            ),
          });
        } else {
          dispatch(logoutUser());
        }
      } else {
        if (!data.authenticated) {
          dispatch(getUserData());
        }
      }
    };
    getValidatedToken();
  }, [push, isOffline]);

  // check if the user is online  if no display an error message

  if (data.loading) {
    return <div>loading ...</div>;
  }
  return children;
};
