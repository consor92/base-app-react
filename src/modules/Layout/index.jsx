import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import {
  QuestionCircleOutlined,
  PhoneOutlined,
  HomeOutlined,
  TeamOutlined,
  MailOutlined,
} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'

const { Header, Content, Footer, Sider } = Layout

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const items = [
  getItem(<Link to="/"> Home </Link>, '1', <HomeOutlined />),
  getItem(<Link to="/students"> Alumnos </Link>, '2', <HomeOutlined />),
  getItem(
    <Link to="/sw-characters"> Personajes SW </Link>,
    '3',
    <HomeOutlined />
  ),
  getItem(<Link to="/contact"> Contacto </Link>, '4', <TeamOutlined />, [
    getItem(
      <Link to="/contact/phone"> Telefono </Link>,
      '5',
      <PhoneOutlined />
    ),
    getItem(<Link to="/contact/mail"> Mail </Link>, '6', <MailOutlined />),
  ]),
  getItem(<Link to="/about"> About </Link>, '7', <QuestionCircleOutlined />),
]

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        ></Menu>
      </Sider>
      <Layout style={{ width: '100%' }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>Header</h1>
        </Header>
        <Content
          style={{
            margin: '20px 16px',
          }}
        >
          <div
            style={{
              height: '100%',
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
export default App
