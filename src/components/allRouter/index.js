import { useRoutes } from "react-router";
import { elementRouter } from "../../router";

function AllRouter(){
  const allRouter = useRoutes(elementRouter)
  return allRouter
}

export default AllRouter