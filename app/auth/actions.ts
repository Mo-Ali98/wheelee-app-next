"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function emailLogin(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    redirect("/login?message=Error logging in");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  console.log(error);

  if (error) {
    redirect("/signup?message=Error signing up");
  }

  revalidatePath("/", "layout");
  redirect("/signup?message=Check email to continue sign in process");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = createClient();

  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required" };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.log(error, `Failed to send password reset email: ${email}`);
  }

  redirect(
    "/forgot-password?message=Password reset email sent. Check your inbox."
  );
}

export async function resetPassword(formData: FormData) {
  const supabase = createClient();

  const newPassword = formData.get("newPassword") as string;

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error("Error resetting password:", error.message);
    redirect("/reset-password?message=Error resetting password");
  }

  redirect(
    "/login?message=Password reset successfully. You can now log in with your new password."
  );
}
