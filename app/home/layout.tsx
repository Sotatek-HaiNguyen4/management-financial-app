import Header from "@/components/Header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="pb-5">
        <Header />
      </div>
      {children}
    </div>
  );
}
