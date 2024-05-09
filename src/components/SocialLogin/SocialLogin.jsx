/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function SocialLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { googleLogIn, githubLogIn } = useContext(AuthContext);
  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((result) => {
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => error.message);
  };
  const handleGithubLogIn = () => {
    githubLogIn()
      .then((result) => {
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => error.message);
  };
  return (
    <div className="flex justify-center mt-4">
      <div className="flex gap-4">
        <button
          onClick={handleGoogleLogIn}
          className="flex gap-2 items-center bg-cozy-green px-4 py-2 bg-art-light border-2 dark:bg-transparent font-bold rounded-xl"
        >
          <FaGoogle />
          <p>Google</p>
        </button>
        <button
          onClick={handleGithubLogIn}
          className="flex gap-2 items-center bg-cozy-green px-4 py-2 bg-art-light border-2 dark:bg-transparent font-bold rounded-xl"
        >
          <FaGithub />
          <p>Github</p>
        </button>
      </div>
    </div>
  );
}

export default SocialLogin;
