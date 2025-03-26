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
import { Icon } from "@iconify/react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Email Validation
  const { user } = useFirebase();
  const auth = getAuth();

  useEffect(() => {
    if (user && user.emailVerified) {
      router.push("/");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
    mode: "onChange",
  });

  // Pre-validate the email before creating the account
  const validateEmail = async () => {
    setIsLoading(true);

    // First validate form fields
    const isValid = await trigger(["name", "email", "password"]);
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    const email = getValues("email");

    try {
      // Check if email is already registered
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        toast.error("Email already in use");
        setIsLoading(false);
        return;
      }

      // Email is valid and not in use
      setStep(2);
      toast.success(
        "Email validated! Please confirm your details to complete registration."
      );
    } catch (error: any) {
      toast.error("Failed to validate email");
    } finally {
      setIsLoading(false);
    }
  };

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

      console.log(userCredential.user);

      // Send email verification
      await sendEmailVerification(userCredential.user);

      setVerificationSent(true);
      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
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
      provider.setCustomParameters({
        prompt: "select_account",
      });
      await signInWithPopup(auth, provider);

      // Google signup automatically verifies email
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up with Google");
    }
  };

  const handleResendVerification = async () => {
    if (!auth.currentUser) return;

    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email resent!");
    } catch (error: any) {
      toast.error("Failed to resend verification email");
    }
  };

  const handleGoToSignIn = async () => {
    try {
      // Sign out the current user first
      await auth.signOut();
      // Then navigate to sign in
      router.push("/signin");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  if (verificationSent) {
    return (
      <div className="bg-customBlack2 h-screen flex justify-center items-center p-4">
        <div className="bg-customBlack w-full max-w-md p-8 rounded-lg shadow-lg text-center">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-16 h-16 mx-auto mb-6 object-cover rounded-full"
          />
          <h2 className="text-2xl font-bold mb-4 text-white">
            Verify Your Email
          </h2>
          <p className="text-gray-300 mb-6">
            We've sent a verification email to your inbox. Please check your
            email and click the verification link to complete your registration.
          </p>
          <div className="flex flex-col gap-4">
            <Button onClick={handleResendVerification} type="button" fullWidth>
              Resend Verification Email
            </Button>
            <Button onClick={handleGoToSignIn} type="button" fullWidth>
              Go to Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
              {step === 1 ? (
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validateEmail();
                    }}
                  >
                    <div className="gap-2 Xl:gap-[1.3vh] flex flex-col my-2 Xl:my-[2vh] ">
                      <Input
                        id="name"
                        label="Name"
                        type="text"
                        register={register("name", { required: true })}
                        placeholder="Name"
                        errors={errors}
                        disabled={isLoading}
                      />
                      <Input
                        id="email"
                        type="email"
                        label="Email Address"
                        register={register("email", {
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        placeholder="example@gmail.com"
                        errors={errors}
                        disabled={isLoading}
                      />
                      <Input
                        id="password"
                        type="password"
                        label="Password"
                        register={register("password", {
                          required: true,
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                        placeholder="minimum 8 characters"
                        errors={errors}
                        disabled={isLoading}
                      />
                      <Button type="submit" disabled={isLoading} fullWidth>
                        {isLoading ? "Validating..." : "Validate & Continue"}
                      </Button>
                      <Button onClick={handleGoogleSignUp} type="button">
                        <Icon
                          icon="flat-color-icons:google"
                          className="text-xl"
                        />
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
              ) : (
                <div>
                  <h3 className="text-white text-xl mb-4">
                    Confirm Your Details
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Your email has been validated. Please review your
                    information below and create your account.
                  </p>
                  <div className="bg-gray-800 p-3 rounded-md mb-6">
                    <p className="text-gray-300">
                      <strong>Name:</strong> {getValues("name")}
                    </p>
                    <p className="text-gray-300">
                      <strong>Email:</strong> {getValues("email")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      disabled={isLoading}
                      fullWidth
                    >
                      {isLoading
                        ? "Creating Account..."
                        : "Create Account & Verify Email"}
                    </Button>
                    <Button
                      onClick={() => setStep(1)}
                      type="button"
                      fullWidth
                      className="bg-gray-700 hover:bg-gray-600"
                    >
                      Back to Edit
                    </Button>
                  </div>
                </div>
              )}
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
