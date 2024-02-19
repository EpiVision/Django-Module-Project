import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AddCamera from 'views/Camera-Management/addcamera';
import EditCamera from 'views/Camera-Management/editcamera';
import AddDevice from 'views/Alarm-Devices/adddevice';
import EditDevice from 'views/Alarm-Devices/editdevice';


// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Stream = Loadable(lazy(() => import('views/Stream')));
const ActivityLogs = Loadable(lazy(() => import('views/Activity-Logs')));
const CameraManagement = Loadable(lazy(() => import('views/Camera-Management')));
const AlarmManagement = Loadable(lazy(() => import('views/Alarm-Devices')));
const SeizureAnalysis = Loadable(lazy(() => import('views/Seizure-Analysis')));
const PatientProfile = Loadable(lazy(() => import('views/Patient-Profile')));
const HomePage = Loadable(lazy(() => import('views/pages/homepage')));

// ==============================|| MAIN ROUTING ||============================== //
// let MainRoutes = [
//   { path: "/", element: <HomePage /> },
//   {
//     path: '/',
//   element: <MainLayout />,
//   children: [
//     {
//       path: 'dashboard',
//       element: <DashboardDefault />
//       // children: [
//       //   {
//       //     path: 'default',
//       //   }
//       // ]
//     },
//     {
//       path: 'Stream',
//       element: <Stream />
//     },
//     {
//       path: 'Activity-Logs',
//       element: <ActivityLogs />
//     },
//     {
//       path: 'Camera-Management',
//       element: <CameraManagement />
//     },
//     {
//       path: 'Seizure-Analysis',
//       element: <SeizureAnalysis />
//     },
//     {
//       path: 'Patient-Profile',
//       element: <PatientProfile />
//     },
//     {
//       path: 'sample-page',
//       element: <SamplePage />
//     },
//     // {
//       //   path: 'utils',
//       //   children: [
//         //     {
//           //       path: ' ',
//     //       element: <UtilsTypography />
//     //     }
//     //   ]
//     // },
//     // {
//     //   path: 'utils',
//     //   children: [
//     //     {
//     //       path: 'util-color',
//     //       element: <UtilsColor />
//     //     }
//     //   ]
//     // },
//     // {
//     //   path: 'utils',
//     //   children: [
//     //     {
//     //       path: 'util-shadow',
//     //       element: <UtilsShadow />
//     //     }
//     //   ]
//     // },
//     // {
//     //   path: 'icons',
//     //   children: [
//     //     {
//     //       path: 'tabler-icons',
//     //       element: <UtilsTablerIcons />
//     //     }
//     //   ]
//     // },
//     // {
//     //   path: 'icons',
//     //   children: [
//     //     {
//     //       path: 'material-icons',
//     //       element: <UtilsMaterialIcons />
//     //     }
//     //   ]
//     // },
//   ]
//   },
// ];
export const HomePageRoute = {
  path: '/',
  element: <HomePage />
}

export const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // {
    //   path: '',
    //   element: <HomePage />
    // },
    {
      path: 'dashboard',
      element: <DashboardDefault />
      // children: [
      //   {
      //     path: 'default',
      //   }
      // ]
    },
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: ' ',
    //       element: <UtilsTypography />
    //     }
    //   ]
    // },
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-color',
    //       element: <UtilsColor />
    //     }
    //   ]
    // },
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-shadow',
    //       element: <UtilsShadow />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'tabler-icons',
    //       element: <UtilsTablerIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'material-icons',
    //       element: <UtilsMaterialIcons />
    //     }
    //   ]
    // },

    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'Stream',
      element: <Stream />
    },
    {
      path: 'Activity-Logs',
      element: <ActivityLogs />
    },
    {
      path: 'Alarm-Devices',
      element: <AlarmManagement />,
      // children: [
      //   {
      //     path: 'addcamera',
      //     element: <AddCamera />
      //   },
      // ]

    },
    {
      path: 'Alarm-Devices/adddevice',
      element: <AddDevice />
    },
    {
      path: 'Alarm-Devices/editdevice',
      element: <EditDevice />
    },
    {
      path: 'Camera-Management',
      element: <CameraManagement />,
      // children: [
      //   {
      //     path: 'addcamera',
      //     element: <AddCamera />
      //   },
      // ]

    },
    {
      path: 'Camera-Management/addcamera',
      element: <AddCamera />
    },
    {
      path: 'Camera-Management/editcamera',
      element: <EditCamera />
    },
    {
      path: 'Seizure-Analysis',
      element: <SeizureAnalysis />
    },
    {
      path: 'Patient-Profile',
      element: <PatientProfile />
    },
  ]
};

// export default MainRoutes;
