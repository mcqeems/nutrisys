"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "@/lib/validation/auth";
import { FloatingText } from "@/components/ui/floating-text";
import { AnimatedBackground } from "@/components/ui/animated-background";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const error = params.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    // Client-side validation
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      setFormError(first?.message || "Invalid input");
      return;
    }
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });
    setLoading(false);
    if (res?.error) {
      setFormError(res.error);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <AnimatedBackground>
      <div
        style={{ maxWidth: 360, margin: "40px auto", fontFamily: "system-ui" }}
      >
        <h1>Login</h1>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        {formError && <p style={{ color: "crimson" }}>{formError}</p>}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              style={{ width: "100%" }}
            />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              style={{ width: "100%" }}
            />
          </label>

          <button
            disabled={loading}
            type="submit"
            style={{ padding: "8px 12px" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={{ marginTop: 12 }}>
          No account? <a href="/register">Register</a>
        </p>
      </div>
    </AnimatedBackground>
  );
}
