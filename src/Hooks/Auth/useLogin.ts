import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LoginFormData {
  username: string;
  password: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetFormData = () => {
    setFormData({
      username: "",
      password: "",
    });
  };

  const validateLoginData = (data: LoginFormData): boolean => {
    if (!data.username || data.username.trim() === "") {
      toast.error("Username is required");
      return false;
    }

    if (!data.password || data.password.trim() === "") {
      toast.error("Password is required");
      return false;
    }

    return true;
  };

  const login = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);

      if (!validateLoginData(formData)) {
        return;
      }

      const result = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
        toast.error("Invalid username or password");
        return;
      }

      if (result?.ok) {
        toast.success("Login successful!");
        router.push("/admin/dashboard");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/admin/login");
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
      console.log(err);
    }
  };

  return {
    formData,
    handleChange,
    resetFormData,
    login,
    logout,
    isLoading,
    error,
  };
}; 