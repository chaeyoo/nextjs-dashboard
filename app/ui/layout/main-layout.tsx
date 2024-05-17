'use client';
import { Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import {
  PieChartOutlined,
  PartitionOutlined,
  ClusterOutlined,
  FundProjectionScreenOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
export default function MainLayout({
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
    getItem(<Link href={'/'}>Home</Link>, 1, <PieChartOutlined />),
    getItem('시스템 운영관리', 100, <ClusterOutlined />, [
      getItem(<Link href={'/system/clco'}>기업관리</Link>, 101),
      getItem(<Link href={'/system/code'}>공통코드 관리</Link>, 102),
      getItem(<Link href={'/system/menu'}>메뉴 관리</Link>, 103),
      getItem(<Link href={'/system/auth'}>권한 관리</Link>, 104),
      getItem('관리자 관리', 105, null, [
        getItem(<Link href={'/system/mngr/mng'}>계정관리</Link>, 106),
        getItem(<Link href={'/system/mngr/req'}>요청이력</Link>, 107),
        getItem(<Link href={'/system/mngr/login'}>로그인이력</Link>, 108),
      ]),
    ]),
    getItem('서비스 운영관리', 200, <FundProjectionScreenOutlined />, [
      getItem(<Link href={'/operate/popup'}>팝업 관리</Link>, 201),
      getItem('공지/FAQ 관리', 202, null, [
        getItem(<Link href={'/operate/notice'}>공지사항</Link>, 203),
        getItem(<Link href={'/operate/faq'}>FAQ</Link>, 204),
      ]),
      getItem(<Link href={'/operate/clco'}>고객사 관리</Link>, 205),
      getItem(<Link href={'/operate/inq'}>문의 관리</Link>, 206),
      getItem(<Link href={'/operate/mbr'}>회원 관리</Link>, 207),
      getItem('메시지 관리', 208, null, [
        getItem(<Link href={'/operate/push'}>푸시 관리</Link>, 209),
        getItem(<Link href={'/operate/email'}>이메일 관리</Link>, 210),
        getItem(<Link href={'/operate/sms'}>SMS 관리</Link>, 211),
      ]),
      getItem(<Link href={'/operate/prjt'}>운영 프로젝트 관리</Link>, 212),
    ]),
    getItem('서비스 관리', 300, <PartitionOutlined />, [
      getItem(<Link href={'/service/prjt'}>프로젝트 관리</Link>, 301),
      getItem(<Link href={'/service/prgm'}>프로그램 관리</Link>, 302),
      getItem(<Link href={'/service/bass'}>기준코드 관리</Link>, 303),
      getItem(<Link href={'/service/mssn'}>미션 관리</Link>, 304),
      getItem(<Link href={'/service/trms'}>약관 관리</Link>, 305),
    ]),
    getItem(<Link href={'/admin'}>기업관리자</Link>, 400, <ExportOutlined />),
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
            <div className="mt-5 flex items-center justify-end px-7">
              {/* <div>
                {name ? `${name}(${mngrNo})님 안녕하세요!` : '안녕하세요!'}
              </div> */}
              <button
                className="flex-shrink-0 rounded border border-red-500 bg-transparent px-2 py-1 text-sm font-medium text-red-700 hover:border-transparent hover:bg-red-500 hover:text-white"
                onClick={() => signOut()}
              >
                로그아웃
              </button>
            </div>
          </Header>

          <Content>
            <div
              style={{
                minHeight: '100%',
                background: colorBgContainer,
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
