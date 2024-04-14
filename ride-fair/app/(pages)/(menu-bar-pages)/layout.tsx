import NavBar from "@/app/ui/nav-bar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="py-4 px-6">{children}</div>
      <NavBar />
    </div>
  );
}
