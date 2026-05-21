import Navbar from "@/components/Layout/Navbar";
import { getNavbardata } from "@/lib/getNavbarData";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getNavbardata();

  return (
      <div className="bg-white">
        <Navbar data={data} />
        <div>{children}</div>
      </div>
  );
}
