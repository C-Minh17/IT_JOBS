import LayoutHome from "../Layout/LayoutHome";
import LayoutManage from "../Layout/LayoutManage";
import Home from "../pages/home";
import ListCard from "../pages/listCard";
import Details from "../pages/details";
import DetailsJobs from "../components/detailJobs";
import DetailsCompanies from "../components/detailsCompanies";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import OverviewManage from "../pages/overviewManage";
import InfoCompanyManage from "../pages/infoCompany";
import ManageJobs from "../pages/manageJobs";
import ManageCV from "../pages/manageCV";
import JobSearch from "../components/searchJob";

export const elementRouter = [
  {
    path:"/",
    element:<LayoutHome/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"/listCard",
        element:<ListCard/>
      },
      {
        path:"/search",
        element:<JobSearch/>
      },
      {
        path:"/details",
        element:<Details/>,
        children:[
          {
            path:"job/:id",
            element:<DetailsJobs/>
          },
          {
            path:"company/:id",
            element:<DetailsCompanies/>
          },
        ]
      },
      {
        path:"/signin",
        element:<SignIn/>
      },
      {
        path:"/signup",
        element:<SignUp/>
      },
      
    ]
  },
  {
    path:"/manage",
    element:<LayoutManage/>,
    children:[
      {
        index:true,
        element:<OverviewManage/>
      },
      {
        path:"/manage/infoCompany",
        element:<InfoCompanyManage/>
      },
      {
        path:"/manage/job",
        element:<ManageJobs/>,
      },
      {
        path:"/manage/CV",
        element:<ManageCV/>
      },
    ]
  }
]