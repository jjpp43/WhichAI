import { LoginButton } from "./LoginButton";

export default function Navigation() {
  return (
    <nav className="w-full mb-8 bg-white/80 backdrop-blur-sm border border-neutral-100 rounded-xl shadow-sm px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-neutral-900">WhichAI</h1>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-8">
          {/* Category Dropdown */}
          {/* <div className="relative group">
            <button className="flex items-center text-neutral-600 hover:text-neutral-900 font-medium transition-colors duration-200">
              Category
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Chatbots
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Image Generation
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Video Tools
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Writing Assistants
                </a>
              </div>
            </div>
          </div> */}

          {/* Most Used Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-neutral-600 hover:text-neutral-900 font-medium transition-colors duration-200">
              Most Used
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Popular Tools
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Trending
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Recently Added
                </a>
              </div>
            </div>
          </div>

          {/* Blog Link */}
          <a
            href="/blog"
            className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors duration-200"
          >
            Blog
          </a>

          {/* About Link */}
          <a
            href="#"
            className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors duration-200"
          >
            About
          </a>

          {/* Login Button */}
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}
