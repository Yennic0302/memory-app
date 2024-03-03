import { useLocation } from "react-router-dom";

export default function Page404() {
  const location = useLocation();
  console.log(location);

  console;
  return <h1>Page not found</h1>;
}
