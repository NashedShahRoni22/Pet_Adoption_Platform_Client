import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="flex justify-center py-20">
      <Card color="transparent" shadow={false} className="shadow-xl p-5" > 
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
          </div>
          <Button className="mt-6" fullWidth>
            Sign In
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
