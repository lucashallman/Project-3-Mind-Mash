//import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";



const Navbar = () => {
  return (
    <nav>
      <div>
      <h2>Mind Mash</h2>
        <Link to="/">Home</Link>
        <Link to="/trivia">Trivia</Link>
        <Link to="/riddles">Riddles</Link>
      </div>
    </nav>
  );
};
export default Navbar;