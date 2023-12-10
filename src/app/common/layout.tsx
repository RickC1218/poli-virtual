import SideNav from '@/components/static/sidenav';
import Footer from '@/components/static/footer';

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
      <div className="flex-grow md:overflow-x-auto ">
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  )
}
