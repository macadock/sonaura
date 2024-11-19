import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Sonaura',
};

const DashboardHome = () => {
  return redirect('/dashboard/contact');
};

export default DashboardHome;
