import Coupon from "views/Widgets/Coupon.jsx";
import CouponHistory from "views/Widgets/CouponHistory.jsx";
import WidgetsIcon from "@material-ui/icons/Widgets";
import PointSetting from "views/Widgets/PointSetting.jsx";
import histEdit from "views/Widgets/H";

var dashRoutes = [
  {
    path: "/coupon",
    name: "Coupon",
    rtlName: "الحاجيات",
    icon: WidgetsIcon,
    component: Coupon,
    layout: "/admin"
  },
  {
    path: "/history",
    name: "Coupon History",
    rtlName: "الحاجيات",
    icon: WidgetsIcon,
    component: CouponHistory,
    layout: "/admin"
  },
  {
    path: "/point",
    name: "Point Setting",
    rtlName: "الحاجيات",
    icon: WidgetsIcon,
    component: PointSetting,
    layout: "/admin"
  }
];
export default dashRoutes;
