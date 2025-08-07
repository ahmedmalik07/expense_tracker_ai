
import { checkUser } from "@/lib/checkUser";

export default function Navbar() {
  const user = checkUser();
  return <div className="text-yellow-500"> Navbar </div>;
}