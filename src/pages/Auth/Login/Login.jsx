import React, { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";

const Login = () => {
  const { signInWithGoogle, loading } = useContext(AuthContext);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-screen  max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="fieldset">
              <button
                type="button"
                className="btn btn-secondary mt-4"
                onClick={signInWithGoogle}
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign In With Google"}
              </button>
              <button className="btn btn-secondary mt-4" disabled type="button">
                Login With Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
