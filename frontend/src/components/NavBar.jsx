import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
const NavBar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
            <a
              href="/"
              className="text-lg font-bold text-orange-600 tracking-tight"
            >
              ThinkBoard
            </a>
            <div className="flex items-center space-x-2">
              <Link to={"/create"} className="btn btn-success">
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
