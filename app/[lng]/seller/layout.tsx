import getUser from "@/lib/getUser";
import { ChildProps } from "@/types";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function Layout({ children }: ChildProps) {
  const token = cookies().get("next-auth.session-token")?.value;
  const session = await getUser();
  if (!session) redirect("/ru");
  if (session.currentUser?.role === "user" && !token) redirect("/ru");
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-950">
        <div className="flex w-full ">
          <Navbar />
          <main className="w-full  pl-2 mt-16">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
