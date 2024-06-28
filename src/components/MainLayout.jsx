import PropTypes from "prop-types";
import Header from "./Header";
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-[600px] border-4 border-yellow-500">
        {" "}
        {children}
      </div>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;

//   bg-red-500  border-4 border-yellow-500
