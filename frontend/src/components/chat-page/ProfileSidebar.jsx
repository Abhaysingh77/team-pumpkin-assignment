import PropTypes from "prop-types";

const ProfileSidebar = ({ user, showProfile, toggleProfile }) => {
  if (!user || !showProfile) return null;

  return (
    <div className="w-80 border-l p-6 transition-all duration-300 transform translate-x-0 absolute right-0 top-0 bottom-0 bg-white shadow-lg">
      <button
        onClick={toggleProfile}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="text-center mt-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center text-4xl font-semibold">
          {user.name.charAt(0)}
        </div>
        <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {user.phone || "+1234567890"}
        </p>
        <p className="text-sm text-gray-500">
          {user.email || "user@example.com"}
        </p>
      </div>
    </div>
  );
};
ProfileSidebar.propTypes = {
  user: PropTypes.object.isRequired,
  showProfile: PropTypes.bool.isRequired,
  toggleProfile: PropTypes.func.isRequired,
};

export default ProfileSidebar;
