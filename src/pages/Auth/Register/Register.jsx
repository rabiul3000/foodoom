import React, { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";

const Register = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <h1 className="text-3xl">Sign In to continue</h1>
        <div className="card bg-base-100 w-screen  max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="fieldset">
              <button
                type="button"
                className="btn btn-secondary mt-4"
                onClick={signInWithGoogle}
              >
                Sign In With Google
              </button>
              <button className="btn btn-secondary mt-4" disabled type="button">
                Register With Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
