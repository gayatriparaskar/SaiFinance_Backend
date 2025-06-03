import { Routes, Route, Navigate } from "react-router-dom";
// import { toast } from "react-toastify";

// Pages
import Explore from "../Page/Explore";
import Home from '../Page/Home';
import Pages from '../Page/Pages';
import Railway from '../Page/ExplorePart/PlaceDetails/Railway';
import ShahiQila from '../Page/ExplorePart/PlaceDetails/ShahiQila';
import DargahHakimi from '../Page/ExplorePart/PlaceDetails/DargahHakimi';
import CategorySection from '../Page/CatagoriesPart/CategorySection';
import SubcategoryPage from '../Page/CatagoriesPart/SubcategoryPage';
import Dashboard from '../../AdminPanel/pages/Dashboard';
import Login from '../../AdminPanel/pages/Login';
import AdminDashboard from '../AdimLogin/AdminDashboard/AdminCategory';
import Register from '../ui/Images/Register';
import NewsSection from '../Page/LandigPage/NewsSection';
// import SubcategoryDetail from '../Page/CatagoriesPart/SubcategoryDetail';
import SubcategoryDetail from '../Page/CatagoriesPart/SubcategoryDetail '
import AboutUs from "../ui/About";
import ContactUs from "../ui/ContactUs";
import ExploreBurhanpur from "../ui/ExploreBurhanpur";
import About from "../ui/About";
import SingleSubcategoryPage from "../Page/CatagoriesPart/SingleSubcategoryPage";
import UserProfile from "../AllIcons/UserProfile";

// ✅ ADMIN ROUTE GUARD
// const AdminRoute = ({ children }) => {
//   const userStr = localStorage.getItem("user");
//   let user = null;

//   try {
//     user = userStr ? JSON.parse(userStr) : null;
//   } catch (err) {
//     console.error("Invalid JSON for user:", err);
//   }

//   const isAdmin = user?.role === "admin";
//   return isAdmin ? children : <Navigate to="/dashboard" replace />;
// };

// ✅ ROUTES
const RouteShow = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Pages" element={<Pages />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/explore-more" element={<ExploreBurhanpur />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/RailwayStaion" element={<Railway />} />
        <Route path="/ShahiQila" element={<ShahiQila />} />
        <Route path="/DargahHakimi" element={<DargahHakimi />} />
        <Route path="/category" element={<CategorySection />} />
        <Route path="/subcategory/:categoryId" element={<SubcategoryPage />} />

        <Route path="/subcategorydetail/:id" element={<SubcategoryDetail />} />

        <Route path="/newssection" element={<NewsSection />} />
        <Route path="/registar" element={<Register />} />
        <Route path="/subcategory/:id" element={<SingleSubcategoryPage />} />
        {/* <Route path="/profile" element={<UserProfile/>} /> */}
        <Route path="/user-profile" element={<UserProfile />} />



        {/* ✅ Admin Only Route Example */}
        <Route
          path="/dash"
          element={

            <Dashboard/>

          }
        />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        {/* ❌ Invalid Path - 404 */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen text-2xl font-semibold">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default RouteShow;