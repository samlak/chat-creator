import Head from "next/head";
import Link from "next/link";

export default function Template({ children, title, activeTab }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="relative z-0 flex min-h-screen flex-col overflow-hidden bg-gray-50 py-10 md:py-12 lg:py-20 px-4">
        <img src="/images/background.jpg" alt="Background image" className="absolute top-0 left-0 -z-20 h-full min-h-screen min-w-full object-cover block" />
        <div className="flex justify-center">
          <h1 className={`text-4xl font-bold  text-white`}>CHAT CREATOR</h1>
        </div>
        <div className="relative mt-10 w-full overflow-hidden bg-white shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:h-min sm:max-w-2xl sm:rounded-lg lg:max-w-5xl md:max-w-3xl 2xl:max-w-6xl">
          <nav className="isolate flex shadow" aria-label="Menu">    
            <Link href="/" className="group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10 text-gray-500 transition hover:text-gray-700">
              <div className="flex items-center justify-center space-x-1 md:space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" className="h-5 md:h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                  ></path>
                </svg>
                <span className="text-base md:text-lg">Create</span>
              </div>
              { activeTab == "create" ?
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-400"></span>
              : <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-transparent"></span> }
            </Link>
            <Link aria-current="page" href="/chat" className="router-link-active router-link-exact-active group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10 text-gray-900">
              <div className="flex items-center justify-center space-x-1 md:space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" className="h-5 md:h-6 text-gray-900">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  ></path>
                </svg>
                <span className="text-base md:text-lg">Chat</span>
              </div>
              { activeTab == "chat" ?
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-400"></span>
              : <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-transparent"></span> }
            </Link>
          </nav>
          <div className="pt-10 px-6 pb-8 sm:px-10">
            {children}
          </div>
        </div>
        <footer className="text-center mt-10">
            <p className="font-bold ">© 2023 CHAT CREATOR</p>
        </footer>
      </div>
    </div>
  );
}
