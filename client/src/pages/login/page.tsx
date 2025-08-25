export default function Login() {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-8 w-full max-w-md">
      {/* Logo */}
      <h1 className="text-center text-white text-2xl font-bold mb-6">
        Your logo
      </h1>

      {/* Title */}
      <h2 className="text-xl text-white font-semibold mb-6">Login</h2>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm text-white mb-2">Email</label>
        <input
          type="email"
          placeholder="username@gmail.com"
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm text-white mb-2">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Forgot Password */}
      <div className="mb-4 text-right">
        <a href="#" className="text-sm text-white/80 hover:underline">
          Forgot Password?
        </a>
      </div>

      {/* Button */}
      <button className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">
        Sign in
      </button>
    </div>
  );
}
