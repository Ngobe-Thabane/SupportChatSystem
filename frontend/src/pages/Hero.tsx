
import { useState } from "react";
import { login,register} from "../api/Auth";
import { useNavigate } from "react-router";

export default function Hero() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role:'customer'
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      const result = await login(formData);
      if(result.status === 200){
        localStorage.setItem('token', result.data.token);
        navigate('/dashboard');
      }
      else{
        alert(result.data.message);
      }
    } else {
      const result = await register(formData);
      if(result.status === 201){
        setMode('login');
      }else{
        alert(result.data.message);
      }
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen transition-all duration-700">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body transition-all duration-300 ease-in-out">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset space-y-4">
                {mode === "register" && (
                  <>
                    <label className="label">Name</label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Your Name"
                      name="name"
                      onChange={handleInput}
                      value={formData.name}
                    />
                  </>
                )}

                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  name="email"
                  onChange={handleInput}
                  value={formData.email}
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  name="password"
                  onChange={handleInput}
                  value={formData.password}
                />

                {mode === "login" && (
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                )}

                <button className="btn btn-neutral w-full mt-4" type="submit">
                  {mode === "login" ? "Login" : "Register"}
                </button>

                <div className="text-center mt-4">
                  <span className="text-sm">
                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="btn btn-link btn-sm no-underline hover:underline"
                  >
                    {mode === "login" ? "Register" : "Login"}
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            {mode === "login" ? "Login now!" : "Join us now!"}
          </h1>
          <p className="py-6 w-full">
            {mode === "login"
              ? "Get access to your account in seconds."
              : "Register now and become one of us. It's mildly worth it!"}
          </p>
        </div>
      </div>
    </div>
  );
}
