import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import Public from "./routes/public.tsx";
import Private from "./routes/private.tsx";
import NotAdmin from "./routes/notAdmin.tsx";
import SignInPage from "./routes/sign-in.tsx";
import SignUpPage from "./routes/sign-up.tsx";
import UserLeaves from "./routes/userLeaves.tsx";
import AdminReview from "./routes/adminReview.tsx";
import RootLayout from "./layouts/root-layout.tsx";
import AdminLayout from "./layouts/admin-layout.tsx";
import RequestLeave from "./routes/requestLeave.tsx";
import SuccessLeave from "./routes/successLeave.tsx";
import DashboardLayout from "./layouts/dash-layout.tsx";


import "./index.css";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Publishable key missing");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Public /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      { path: "/notAdmin", element: <NotAdmin /> },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/private",
            element: <Private />,
          },
          { path: "/app", element: <App /> },
          { path: "/requestLeave", element: <RequestLeave /> },
          { path: "/userLeaves", element: <UserLeaves /> },
          { path: "/successLeave", element: <SuccessLeave /> },
          {
            element: <AdminLayout />,
            children: [
              {
                path: "/adminReview",
                element: <AdminReview />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
