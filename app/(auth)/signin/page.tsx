"use client";
import BottomWarning from "@/app/components/common/ButtonWarning";
import Button from "@/app/components/common/Btn";
import HeadPara from "@/app/components/common/HeadPara";
import Input from "@/app/components/common/Input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useFirebase } from "../../context/FirebaseContext";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Signin() {
  const { user } = useFirebase();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        router.push("/");
      } else {
        toast.error("Please verify your email before signing in");
        auth.signOut();
      }
    }
  }, [user, router, auth]);

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setIsSigningIn(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  // Use watch to keep track of the email field for reset password
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.email) {
        setEmailForReset(value.email as string);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSigningIn(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      if (auth.currentUser) {
        await auth.currentUser.reload();
        const freshUser = auth.currentUser;

        if (!freshUser.emailVerified) {
          toast.error("Please verify your email before signing in");
          await auth.signOut();
          setIsSigningIn(false);
          return;
        }
      }

      toast.success("Welcome back!");
      router.push("/");
    } catch (error: any) {
      console.error("Sign-in error:", error.code, error.message);
      let errorMessage = "Failed to sign in";

      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Try again later";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error - check your connection";
          break;
      }

      toast.error(errorMessage);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleToggleResetForm = () => {
    setShowResetForm(!showResetForm);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailForReset || emailForReset.trim() === "") {
      toast.error("Please enter your email address");
      return;
    }

    setIsResetting(true);

    try {
      await sendPasswordResetEmail(auth, emailForReset);
      toast.success("Password reset email sent! Check your inbox");
      setShowResetForm(false); // Hide reset form after successful submission
    } catch (error: any) {
      console.error("Password reset error:", error);
      let errorMessage = "Failed to send reset email";

      switch (error.code) {
        case "auth/user-not-found":
          // Security best practice - don't reveal if email exists
          toast.success(
            "If this email is registered, you'll receive a reset link"
          );
          setShowResetForm(false);
          return;
        case "auth/invalid-email":
          errorMessage = "Invalid email address format";
          break;
        case "auth/missing-email":
          errorMessage = "Please enter your email address";
          break;
        default:
          errorMessage = `Error: ${error.message}`;
      }

      toast.error(errorMessage);
    } finally {
      setIsResetting(false);
    }
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
            <div className="w-full">
              {!showResetForm ? (
                <>
                  <HeadPara
                    title="Welcome back to OvaDrive!"
                    highlightIndex={3}
                  />
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="gap-2 flex flex-col ">
                      <Input
                        id="email"
                        label="Email"
                        placeholder="sample@gmail.com"
                        register={register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        type="email"
                        errors={errors}
                        disabled={isSigningIn}
                      />
                      <Input
                        id="password"
                        label="Password"
                        placeholder="minimum 8 characters"
                        register={register("password", {
                          required: "Password is required",
                        })}
                        errors={errors}
                        disabled={isSigningIn}
                        type="password"
                      />
                      <div className="text-right mb-1">
                        <button
                          type="button"
                          onClick={handleToggleResetForm}
                          className="text-customPurple text-sm hover:underline focus:outline-none"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <Button disabled={isSigningIn} type="submit" fullWidth>
                        {isSigningIn ? "Signing in..." : "Sign in"}
                      </Button>
                      <Button
                        onClick={handleGoogleSignIn}
                        type="button"
                        disabled={isSigningIn}
                      >
                        <Icon
                          icon="flat-color-icons:google"
                          className="text-xl"
                        />
                        Sign in with Google
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <HeadPara title="Reset Your Password" highlightIndex={2} />
                  <form onSubmit={handleForgotPassword}>
                    <div className="gap-2 Xl:gap-[1.3vh] flex flex-col my-6 Xl:my-[2vh]">
                      <p className="text-gray-300 mb-2">
                        Enter your email address and we'll send you a link to
                        reset your password.
                      </p>
                      <div className="mb-4">
                        <label className="text-white block mb-2 text-sm">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={emailForReset}
                          onChange={(e) => setEmailForReset(e.target.value)}
                          className="bg-customBlack2 text-white w-full p-3 rounded-md border border-gray-700 focus:border-customPurple focus:outline-none"
                          placeholder="your@email.com"
                          disabled={isResetting}
                        />
                      </div>
                      <Button disabled={isResetting} type="submit" fullWidth>
                        {isResetting ? "Sending..." : "Send Reset Link"}
                      </Button>
                      <Button
                        onClick={handleToggleResetForm}
                        type="button"
                        className="bg-gray-700 hover:bg-gray-600"
                      >
                        Back to Sign In
                      </Button>
                    </div>
                  </form>
                </>
              )}
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
      </div>
    </div>
  );
}
