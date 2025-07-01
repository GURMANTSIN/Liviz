import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">{isLogin ? "Login" : "Register"}</button>
        <p onClick={() => setIsLogin(!isLogin)} className="text-sm text-blue-500 text-center cursor-pointer">
          {isLogin ? "Create account" : "Back to login"}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
