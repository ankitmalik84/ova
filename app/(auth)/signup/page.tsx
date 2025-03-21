"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Btn";
import HeadPara from "@/app/components/common/HeadPara";
import BottomWarning from "@/app/components/common/ButtonWarning";
import { useFirebase } from "../../context/FirebaseContext";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useFirebase();
  const auth = getAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      toast.success("Registration successful!");
      router.push("/");
    } catch (error: any) {
      let errorMessage = "Registration failed";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up with Google");
    }
  };

  return (
    <div className="bg-customBlack2 h-screen flex justify-center items-center p-4">
      <div className="flex flex-col lg:flex-row bg-customBlack w-full max-w-4xl Xl:max-w-[54vw] h-auto lg:h-[85%] rounded-lg overflow-hidden shadow-lg">
        <div className="lg:w-1/2 flex flex-col justify-center items-center p-8 gap-4">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-10 Xl:w-[2.5vw] h-10 Xl:h-[2.5vw] object-cover rounded-full -ml-[90%]"
          />
          <div className="flex flex-col gap-8 w-4/5 Xl:max-w-[80%] ">
            <div className="w-full">
              <HeadPara title="Join OvaDrive!" highlightIndex={1} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="gap-2 Xl:gap-[1.3vh] flex flex-col my-2 Xl:my-[2vh] ">
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
                  <Button onClick={handleGoogleSignUp} type="button">
                    Sign up with Google
                  </Button>
                </div>
              </form>
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
