export function Link({ href, children, ...restOfProps }) {

    const handleClick = (event) => {
        event.preventDefault();

        window.history.pushState({}, '', href); 
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    return (
        <a href={href} onClick={handleClick} {...restOfProps}>
            {children}
        </a>
    );
}