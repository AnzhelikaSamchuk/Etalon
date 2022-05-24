import React from "react";
import './Layout.styles.scss';
interface ILayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<ILayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <div className="LayoutWrapper">
        {children}
      </div>
    </>
  );
};

export default Layout;
