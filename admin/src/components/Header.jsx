import logo from "../assets/admin-logo.png";

const Header = ({ setToken }) => {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center py-2 px-[4%] justify-between border-b border-gray-300 bg-white z-10">
      <img className="w-[12%]" src={logo} alt="" />
      <button
        onClick={setToken}
        className="bg-purple-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-sm cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
