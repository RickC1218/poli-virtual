import SideNav from '@/components/sidenav';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col md:overflow-hidden">
      <div className="bg-[--white] w-full">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-x-auto md:p-12">
        <div>{children}</div>
      </div>
    </div>
  )
}
