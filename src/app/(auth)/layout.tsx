import { Toaster } from "@/components/ui/toaster"
export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section><Toaster/>{children}</section>
  }