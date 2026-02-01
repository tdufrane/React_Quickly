import { useContext } from "react";
import Context from "./Context";
import MenuItem from "./MenuItem";
function Menu() {
  const links = useContext(Context);
  return (
    <nav>
      <ul className="menu">
        {links.map(({ href, icon, title }) => (
          <MenuItem key={href} href={href} icon={icon}>
            {title}
          </MenuItem>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
