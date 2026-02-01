import { useContext } from "react";
import Context from "./Context";
import MenuItem from "./MenuItem";
import useAuth from "./hooks/useAuth";

function Menu() {
  const links = useContext(Context);
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <ul className="menu">
        {links.map(({ href, icon, title }) => (
          <MenuItem key={href} href={href} icon={icon}>
            {title}
          </MenuItem>
        ))}
        {isLoggedIn && (
          <MenuItem href="/profile" icon="profile">
            Profile
          </MenuItem>
        )}
      </ul>
    </nav>
  );
}

export default Menu;
