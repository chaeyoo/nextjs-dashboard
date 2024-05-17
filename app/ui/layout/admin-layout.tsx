'use client';
import { Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import {
  PieChartOutlined,
  PartitionOutlined,
  ClusterOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const { Header, Content, Footer, Sider } = Layout;
  const [name, setName] = useState<string>('');
  const [mngrNo, setMngrNo] = useState<string>('');

  type MenuItem = Required<MenuProps>['items'][number];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem(<Link href={'/'}>대시보드</Link>, 10, <PieChartOutlined />),
    getItem('모바일 보건센터', 400, <ClusterOutlined />, [
      getItem(<Link href={'/hlth/guide'}>프로그램 안내</Link>, 401),
      getItem(<Link href={'/hlth/event'}>이벤트 관리</Link>, 402),
      getItem(<Link href={'/hlth/notice'}>공지사항</Link>, 403),
    ]),
    getItem(
      <Link href={'/service'}>서비스 안내</Link>,
      404,
      <PieChartOutlined />,
    ),
    getItem('상담 관리', 405, <PartitionOutlined />, [
      getItem(<Link href={'/chat/care'}>케어챗봇</Link>, 406),
      getItem(<Link href={'/chat/counsel'}>상담챗봇</Link>, 407),
    ]),
    getItem(
      <Link href={'/prjt/mbr'}>프로젝트 회원관리</Link>,
      100,
      <PieChartOutlined />,
    ),
    getItem('통계', 300, <PartitionOutlined />, [
      getItem(<Link href={'/static/mbr'}>회원&프로그램</Link>, 301),
      getItem(<Link href={'/static/log/hlth'}>건강로그</Link>, 302),
      getItem(<Link href={'/static/log/activity'}>활동로그</Link>, 302),
      getItem('미션달성', 302, null, [
        getItem(<Link href={'/mssn/day'}>일일미션</Link>, 301),
        getItem(<Link href={'/mssn/week'}>주간미션</Link>, 302),
      ]),
      getItem(<Link href={'/static/bot'}>챗봇</Link>, 302),
    ]),
  ];

  useEffect(() => {
    if (
      !session ||
      !session.user ||
      !session.user.name ||
      !session.user.mngrNo
    ) {
      setName('');
      setMngrNo('');
    } else {
      setName(session.user.name);
      setMngrNo(session.user.mngrNo);
    }
  }, [session]);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          style={{
            background: colorBgContainer,
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff' }}>
            <div className="flex items-center justify-between px-7">
              <div>
                {name ? `${name}(${mngrNo})님 안녕하세요!` : '안녕하세요!'}
              </div>
              <button
                className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
                onClick={() => signOut()}
              >
                로그아웃
              </button>
            </div>
          </Header>

          <Content>
            <div
              style={{
                padding: 24,
                minHeight: '100%',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
