import { NavLink as NavLink } from "react-router";

export function Link({
  href,
  children,
  className = "",
  activeClassName = "active",
  exact = true,
  ...restOfProps
}) {
  
  return (
      <NavLink
          href={href}
          onClick={handleClick}
      className={({ isActive }) =>
          [className, isActive ? activeClassName : ""].filter(Boolean).join(" ")}
          {...restOfProps} >
      {children}
    </NavLink>
  );
}