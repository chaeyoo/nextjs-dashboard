import '@/app/ui/global.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { inter } from '@/app/ui/font';
import AuthWrapper from './lib/client/auth-wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'aimmed manager',
  description: 'Healthcare',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>
          <AntdRegistry>{children}</AntdRegistry>
        </AuthWrapper>
      </body>
    </html>
  );
}
