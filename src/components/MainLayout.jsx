import PropTypes from "prop-types";
import Header from "./Header";
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-[600px]"> {children}</div>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
