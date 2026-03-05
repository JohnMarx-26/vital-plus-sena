
// import HomePage from "@/features/home/page/homepage";

// export default function App() {
//   return (
//     <div >
//       {/* <h1 className="bg-brand text-brand-soft text-2xl font-sans font-bold">
//       </h1> */}
    
//         <HomePage />
    
//     </div>
//   );
// }

// ##############################

import {RouterProvider} from "react-router-dom";
import router  from "@/app/router/index";
export default function App(){
  return(
    <RouterProvider router={router}/>
  )
}






