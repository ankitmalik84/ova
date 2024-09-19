"use client";
import BottomWarning from "@/app/components/common/ButtonWarning";
import Button from "@/app/components/common/Btn";
import HeadPara from "@/app/components/common/HeadPara";
import Input from "@/app/components/common/Input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Image from "next/image";

export default function Signin() {
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
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const res: any = signIn("credentials", {
      ...data,
      redirect: false,
    });

    toast.promise(res, {
      loading: "Signing in...",
      success: (res: any) => {
        if (res?.ok) {
          router.push("/");
          return "Welcome back!";
        } else {
          throw new Error(res?.error);
        }
      },
      error: (err) => err.message,
    });
    setIsLoading(false);
  };

  return (
    <div className="bg-customBlack2 h-screen flex justify-center items-center p-4">
      <div className="flex flex-col lg:flex-row bg-customBlack w-full max-w-4xl Xl:max-w-[54vw] h-auto lg:h-[85%] rounded-lg overflow-hidden shadow-lg">
        <div className="lg:w-1/2 flex flex-col justify-center items-center p-8 gap-4">
          {/* Left side sign-in form section and logo */}
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-10 Xl:w-[2.5vw] h-10 Xl:h-[2.5vw] object-cover rounded-full -ml-[90%] Xl:mb-[3vh]"
          />
          <div className="flex flex-col gap-8 w-4/5 Xl:max-w-[80%]">
            {/* Form */}
            <div className="w-full ">
              <HeadPara title="Welcome back to OvaDrive!" highlightIndex={3} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="gap-2 Xl:gap-[1.3vh] flex flex-col my-6 Xl:my-[2vh]">
                  <Input
                    id="email"
                    label="Email"
                    placeholder="sample@gmail.com"
                    register={register}
                    type="email"
                    errors={errors}
                    disabled={isLoading}
                  />
                  <Input
                    id="password"
                    label="Password"
                    placeholder="minimum 8 characters"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    type="password"
                  />
                  <Button disabled={isLoading} type="submit" fullWidth>
                    Sign in
                  </Button>
                </div>
              </form>
                  <BottomWarning
                    text={"Don't have an account?"}
                    linkText={"Register"}
                    path={"/signup"}
                  />
            </div>
          </div>
        </div>
        {/* Right side Image */}
        <div className="lg:w-1/2 hidden lg:block relative">
          <Image
            src="/images/hero.png"
            alt="side image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>{" "}
      {/* This is the missing closing tag for the wrapping div */}
    </div>
  );
}
