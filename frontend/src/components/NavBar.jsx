import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
const NavBar = () => {
  return (
    <header 
      className="relative border-b border-white/10 bg-[radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"
    >
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
            <a
              href="/"
              className="text-lg font-bold text-white tracking-tight"
            >
              ThinkBoard
            </a>
            <div className="flex items-center space-x-2">
              <Link to={"/create"} className="btn btn-success text-black rounded-full">
                <PlusIcon className="size-5" />
                <span>New Note</span>
              </Link>
            </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
