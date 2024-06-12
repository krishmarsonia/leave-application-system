import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user?.publicMetadata.isAdmin) {
      navigate("/notAdmin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded) return "Loading...";

  return <Outlet />;
}
