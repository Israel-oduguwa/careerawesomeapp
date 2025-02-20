import LayoutA from "../../DashBoard/Layout/LayoutA";
import { Toaster } from "@/components/ui/toaster"
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    // this is the dashboard ui and layout page 
    return <section><Toaster/><LayoutA>{children}</LayoutA></section>
  }