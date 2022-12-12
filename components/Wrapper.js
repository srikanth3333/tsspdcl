import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  
import { Layout, Menu, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import {useDispatch,useSelector} from 'react-redux';
import {logout, updateData,tokenLogin} from '../redux/auth/userSlice';
import Login from './Login';
import Lottie from 'react-lottie';
import animationData from './lotie/loading.json'
import Link from 'next/link';
import {getBoardName} from "../utils/getBoard";

const { Header, Sider, Content } = Layout;


const Wrapper = ({children}) => {
    
    const user = useSelector((state) => state.users) 
    const [collapsed, setCollapsed] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [code,setCode] = useState('')
    

    let items = [
      {
        href: '/',
        icon: (<MenuFoldOutlined fontSize="small" />),
        label: 'Home'
      },
      {
        href: '/billStatus',
        icon: (<MenuFoldOutlined fontSize="small" />),
        label: 'Bill Status'
      },
      {
        href: '/fileUpload',
        icon: (<MenuFoldOutlined fontSize="small" />),
        label: 'File Upload'
      },
      {
        href: '/meterReaders',
        icon: (<MenuFoldOutlined fontSize="small" />),
        label: 'Meter Readers Status'
      },
      {
        href: '/graphs',
        icon: (<MenuFoldOutlined fontSize="small" />),
        label: 'Graphs'
      },
      {
        href: '/billPdf',
        icon: (<MenuFoldOutlined fontSize="small" />),
        label: 'Bill PDF'
      },
      {
        href: '/inputData',
        icon: (<MenuFoldOutlined fontSize="small" />),
        label: 'Input Data'
      },
      
      user?.role == "SAD" ?
      {
        href: '/addUser',
        icon: (<MenuFoldOutlined fontSize="small" />),
        label: 'Add User'
      } : null
  ]

  let otherItems = [{
      href: '/',
      icon: (<MenuFoldOutlined fontSize="small" />),
      label: 'Home'
    },
    {
      href: '/billStatus',
      icon: (<MenuFoldOutlined fontSize="small" />),
      label: 'Bill Status'
    },

    {
      href: '/meterReaders',
      icon: (<MenuFoldOutlined fontSize="small" />),
      label: 'Meter Readers Status'
    },
    {
      href: '/inputData',
      icon: (<MenuFoldOutlined fontSize="small" />),
      label: 'Input Data'
    },
    {
      href: '/graphs',
      icon: (<MenuFoldOutlined fontSize="small" />),
      label: 'Graphs'
    },];

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    let router = useRouter();
    let dispatch = useDispatch();

    useEffect(() => {
      dispatch(tokenLogin())
      setCode(getBoardName())
    },[dispatch])

    if(user.loading == true) {
      return (
            <div style={{minHeight:'100vh',alignItems: 'center',justifyContent: 'center',display:'flex'}}>
                <Lottie 
                    options={defaultOptions}
                    height={400}
                    width={400}
                />
            </div>
      )
    }
    
    if(user.loggedIn == false) {
      return <Login />
    }


    return (
      <Layout>
        <Sider 
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={selectedIndex}
          >
            {
              !collapsed ?
              <div className="p-3">
                <img src="./logo.png" style={{height:'40px'}} />
              </div> : null
            }
            
            {
              code != "TSNPDCL" ?
              items.map((item, index) => (
                <Menu.Item key={index} onClick={() => {
                  setSelectedIndex(index)
                  router.push(item.href)
                }}>
                  {item?.icon}
                  <span>{item?.label}</span>
                </Menu.Item>
              )) : otherItems.map((item, index) => (
                <Menu.Item key={index} onClick={() => {
                  setSelectedIndex(index)
                  router.push(item.href)
                }}>
                  {item?.icon}
                  <span>{item?.label}</span>
                </Menu.Item>
              ))
            }

          </Menu>
        </Sider>
        <Layout className="site-layout" 
                style={{
                  marginLeft: collapsed ? 80 :200,
                }}
          >
          <Header
            className="site-layout-background"
            style={{
              padding: `0em 1em`,
            }}
          >
            <div className="d-flex align-items-center justify-content-between mt-0">
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed),
                })}
                <div>
                  <button 
                    className="btn btn-danger btn-sm me-3"
                    onClick={() => {
                      localStorage.clear();
                      location.reload();
                    }}>
                      Logout
                  </button>
                  <Link href="/help" className="btn btn-info btn-sm">Help</Link>
                </div>
            </div>
          </Header>
          <Content
            className="site-layout-background-2"
            style={{
              margin: '10px 14px',
              height: '100%',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  };
export default Wrapper;