"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Btn";
import HeadPara from "@/app/components/common/HeadPara";
import BottomWarning from "@/app/components/common/ButtonWarning";
import { signIn, useSession } from "next-auth/react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Image from "next/image";

export default function Signup(): any {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const res: any = axios.post("/api/register", data);
    toast
      .promise(res, {
        loading: "Registering...",
        success: "Registration successful!",
        error: (err) => {
          const errorCode = err.response?.status;
          if (errorCode === 400) {
            return "Please enter your email and password!";
          } else if (errorCode === 409) {
            return "Email already exists!";
          } else {
            return "Something went wrong!";
          }
        },
      })
      .then(() => {
        signIn("credentials", { ...data, redirect: false }).then(() => {
          router.push("/");
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="bg-customBlack2 h-screen flex justify-center items-center p-4">
      <div className="flex flex-col lg:flex-row bg-customBlack w-full max-w-4xl Xl:max-w-[54vw] h-auto lg:h-[85%] rounded-lg overflow-hidden shadow-lg">
        <div className="lg:w-1/2 flex flex-col justify-center items-center p-8 gap-4">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-10 h-10 object-cover rounded-full -ml-[90%]"
          />
          <div className="flex flex-col gap-8 w-4/5 max-w-md">
            <div className="w-full">
              <HeadPara title="Join OvaDrive!" highlightIndex={1} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="gap-2 flex flex-col my-2">
                  <Input
                    id="name"
                    label="Name"
                    type="text"
                    register={register}
                    placeholder="Name"
                    errors={errors}
                    disabled={isLoading}
                  />
                  <Input
                    id="email"
                    type="email"
                    label="Email Address"
                    register={register}
                    placeholder="example@gmail.com"
                    errors={errors}
                    disabled={isLoading}
                  />
                  <Input
                    id="password"
                    type="password"
                    label="Password"
                    register={register}
                    placeholder="minimum 8 characters"
                    errors={errors}
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading} fullWidth>
                    Sign up
                  </Button>
                  {/* Closing form tag added here */}
                </div>
              </form>{" "}
              <BottomWarning
                text={"Already have an account?"}
                linkText={"Sign in"}
                path={"/signin"}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 hidden lg:block relative">
          <Image
            src="/images/hero.png"
            alt="side image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
