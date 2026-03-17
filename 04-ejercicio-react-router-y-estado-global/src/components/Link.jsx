import { useRouter } from "../hooks/useRouter.jsx";


export function Link({
  href,
  children,
  className = "",
  activeClassName = "active",
  exact = true,
  ...restOfProps
}) {
  const { currentPath, navigateTo } = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    navigateTo(href);
    };
    
    const isActive = exact
      ? currentPath === href
        : currentPath.startsWith(href);
    
      const combinedClassName = [className, isActive ? activeClassName : ""]
        .filter(Boolean)
        .join(" ");

  return (
      <a
          href={href}
          onClick={handleClick}
          className={combinedClassName || undefined}
          {...restOfProps} >
      {children}
    </a>
  );
}