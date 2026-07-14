import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Studio } from "sanity";
import config from "../../sanity.config";

export const Route = createFileRoute("/studio")({
  component: StudioPage,
});

function StudioPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "#666",
        }}
      >
        Loading Sanity Studio...
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Studio config={config} />
    </div>
  );
}
