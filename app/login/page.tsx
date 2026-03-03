export default function LoginPage() {
  return (
    <div className="mx-auto mt-4 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-10 sm:p-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">အကောင့်ဝင်ရန်</h1>
      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full rounded-lg border border-slate-300 p-3"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input type="password" id="password" className="w-full rounded-lg border border-slate-300 p-3" />
        </div>
        <button type="submit" className="mt-2 w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
