import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Edit as EditIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  CreditCard as CreditCardIcon,
  DollarSign as DollarSignIcon,
  Mail as MailIcon
} from 'react-feather';
import NavItem from './NavItem';

// const user = {
//   avatar: 'http://web.reg.tu.ac.th/registrar/getstudentimage.asp?id=6209680062&Status=10',
//   jobTitle: 'โปรแกรมเมอร์เงินแสน',
//   name: 'ภูมิพิชญุตม์ คงเปี่ยม'
// };

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'หน้าหลัก'
  },
  {
    href: '/app/rooms',
    icon: UsersIcon,
    title: 'จัดการห้องพัก'
  },
  {
    href: '/app/freerooms',
    icon: UsersIcon,
    title: 'ข้อมูลห้องพักว่าง'
  },
  {
    href: '/app/admin',
    icon: EditIcon,
    title: 'หน้าผู้จัดการ'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'แก้ไขข้อมูลส่วนตัว'
  },
  {
    href: '/app/checkbill',
    icon: CreditCardIcon,
    title: 'ตรวจสอบค่าใช้จ่าย'
  },
  {
    href: '/app/request',
    icon: MailIcon,
    title: 'แจ้งความประสงค์'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'เข้าสู่ระบบ'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'สมัครสมาชิก'
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile, userInfo }) => {
  const location = useLocation();
  const user = {
    avatar: 'http://web.reg.tu.ac.th/registrar/getstudentimage.asp?id=6209680062&Status=10',
    jobTitle: 'โปรแกรมเมอร์เงินแสน',
    ...userInfo
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
          mt={1}
        >
          {user.firstname + " " + user.lastname}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {`สถานะ: ${user.type === 'student'? 'นักเรียน':'พนักงาน'}`}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
