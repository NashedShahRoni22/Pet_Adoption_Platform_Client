import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import SmallSpinner from "../../components/SmallSpinner";

export default function Register() {
  const { createUser, updateUser, loading } = useContext(AuthContext);
  const navigatae = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const password = form.password.value;
    console.log(name, email, password);
    createUser(email, password)
      .then(() => {
        toast.success("Registration Successfull!");
        console.log("success");
        userProfileUpdate(name);
        form.reset();
        navigatae("/login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.log(errorMessage);
      });
  };
  //handel update user name
  const userProfileUpdate = (name) => {
    const profile = {
      displayName: name,
    };
    updateUser(profile)
      .then(() => {
        console.log("Profile updated!");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <section className="py-20 flex justify-center min-h-screen">
      <Card color="transparent" shadow={false} className="shadow-xl p-5 h-fit">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          onSubmit={handleRegister}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" name="name" />
            <Input size="lg" label="Email" name="email" />
            <Input type="password" size="lg" label="Password" name="password" />
          </div>
          <Button className="mt-6 flex gap-2 justify-center" fullWidth type="submit">
          {loading ? <SmallSpinner /> : "Sign Up"}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </section>
  );
}
