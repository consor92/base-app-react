import { useState, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import {
  QuestionCircleOutlined,
  PhoneOutlined,
  HomeOutlined,
  TeamOutlined,
  MailOutlined,
} from '@ant-design/icons'
// Importamos Layout, Menu y tema de Ant Design con alias para evitar choque de nombres
import { Layout, Menu, theme as antdTheme } from 'antd'
// Importamos los estilos como módulo CSS
import styles from './Layout.module.css'
// Importamos el contexto para tema oscuro/claro (si usás el propio)
import { ThemeContext } from '../../context/ThemeContext'
import { AntDesignOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout



// Función para crear items del menú con iconos y rutas
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

// Definimos los items del menú lateral
const items = [
  getItem(<Link to="/"> Home </Link>, '1', <HomeOutlined />),
  getItem(<Link to="/students"> Alumnos </Link>, '2', <TeamOutlined />),
  getItem(<Link to="/sw-characters"> Personajes SW </Link>, '3', <HomeOutlined />),
  // Submenú para Contacto con dos opciones
  getItem(
    <Link to="/contact"> Contacto </Link>,
    '4',
    <TeamOutlined />,
    [
      getItem(<Link to="/contact/phone"> Telefono </Link>, '5', <PhoneOutlined />),
      getItem(<Link to="/contact/mail"> Mail </Link>, '6', <MailOutlined />),
    ]
  ),
  getItem(<Link to="/about"> About </Link>, '7', <QuestionCircleOutlined />),
]





const App = () => {
  // Estado para controlar si el sider está colapsado
  const [collapsed, setCollapsed] = useState(false)

  // Extraemos tokens de tema de Ant Design (colores, etc) usando alias
  const {
    token: { colorBgContainer },
  } = antdTheme.useToken()

  // Contexto propio para tema oscuro (si usás este contexto)
  const { theme } = useContext(ThemeContext)

  const bgColor = theme === 'dark' ? '#1f1f1f' : colorBgContainer;
  const textColor = theme === 'dark' ? '#fff' : '#000';

  return (
    // Usamos layout principal de Ant Design, ajustamos con clase local
    <Layout
      style={{
        minHeight: '100vh',
        // Cambiamos el fondo según tema global (claro u oscuro)
        backgroundColor: theme === 'dark' ? '#121212' : '#fff',
      }}
      className={styles.appLayout}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={styles.sider}
        style={{
          backgroundColor: theme === 'dark' ? '#1f1f1f' : '#fff', // Fondo del sider según tema
        }}
      >
        {/* Aquí va el logo o contenido en el sider */}
        <div className={styles.logo}>
          <AntDesignOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
        </div>
        {/* Título del menú lateral */}
        <h2 className={styles.menuTitle}> MENU que se muestra en todas las páginas.</h2>
        
        {/* Menú lateral con tema acorde al contexto */}
        <Menu
          theme={theme === 'dark' ? 'dark' : 'light'}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>

      {/* Layout para el contenido principal */}
      <Layout style={{ width: '100%' }}>
        <Header
          style={{
            padding: 0,
            background: bgColor,
            color: textColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className={styles.header}
        >
          {/* Aquí podrías agregar un logo o título */}
          <p>Este es el encabezado que se muestra en todas las páginas.</p>
        </Header>

        <Content
          style={{
            margin: '20px 16px',
            background: bgColor,
            color: textColor,
          }}
          className={styles.content}
        >
          <div
            style={{
              height: '100%',
              background: bgColor,
              color: textColor,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >

            {/* Aquí renderizamos las rutas hijas */}
            <Outlet />
            {/* Este es el contenido principal que cambia según la ruta */}
            <h2>Contenido Principal</h2>
            <p>Este es el contenido que cambia según la ruta seleccionada.</p>

          </div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            background: bgColor,
            color: textColor,
          }}
          className={styles.footer}
        >
          {/* Aquí podrías agregar más información o enlaces */}  
          <p>Footer de la aplicación</p>
          <p>Este es el pie de página que se muestra en todas las páginas.</p>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default App
