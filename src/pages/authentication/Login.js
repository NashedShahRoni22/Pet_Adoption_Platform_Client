import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import SmallSpinner from "../../components/SmallSpinner";

export default function Login() {
  const { loginUser, loading } = useContext(AuthContext);
  //private route setup
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  //handel user login
  const handelUserLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((res) => {
        const user = res.user;
        const currentUser = {
          email: user.email,
        };
        console.log(currentUser);
        toast.success("Login Successfull!");
        console.log("success");
        //get jwt token
        // fetch("https://chitromaya-server.vercel.app/jwt", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify(currentUser),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     localStorage.setItem("ChitromayaUserToken", data.token);
        form.reset();
        navigate(from, { replace: true });
        // });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.log(errorMessage);
      });
  };
  return (
    <section className="flex justify-center py-20">
      <Card color="transparent" shadow={false} className="shadow-xl p-5">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <form
          onSubmit={handelUserLogin}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Email" name="email" />
            <Input type="password" size="lg" label="Password" name="password" />
          </div>
          <Button
            className="mt-6 flex gap-2 justify-center"
            fullWidth
            type="submit"
          >
            Sign In
            {loading && <SmallSpinner />}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            New here?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </section>
  );
}
