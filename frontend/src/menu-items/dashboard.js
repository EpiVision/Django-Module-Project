// assets
import {
  IconFileReport,
  IconDeviceTv,
  IconFileAnalytics,
  IconBrandChrome,
  IconHelp,
  IconPlayerRecord,
  IconDeviceCctv,
  IconUserCircle,
  IconDashboard
} from '@tabler/icons';

// constant
const icons = {
  IconFileReport,
  IconDeviceTv,
  IconFileAnalytics,
  IconBrandChrome,
  IconHelp,
  IconPlayerRecord,
  IconDeviceCctv,
  IconUserCircle,
  IconDashboard
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'stream-page',
      title: 'Stream',
      type: 'item',
      url: '/Stream',
      icon: icons.IconDeviceTv,
      breadcrumbs: false
    },
    {
      id: 'activity-page',
      title: 'Activity Logs',
      type: 'item',
      url: '/Activity-Logs',
      icon: icons.IconFileAnalytics,
      breadcrumbs: false
    },
    {
      id: 'camera-page',
      title: 'Camera Management',
      type: 'item',
      url: '/Camera-Management',
      icon: icons.IconDeviceCctv,
      breadcrumbs: false
    },
    {
      id: 'seizure-page',
      title: 'Seizure Analysis',
      type: 'item',
      url: '/Seizure-Analysis',
      icon: icons.IconFileReport,
      breadcrumbs: false
    },
    {
      id: 'profile-page',
      title: 'Patient Profile',
      type: 'item',
      url: '/Patient-Profile',
      icon: icons.IconUserCircle,
      breadcrumbs: false
    }
  ] 
};

export default dashboard;
