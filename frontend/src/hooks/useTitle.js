import { useEffect } from "react";

export function useTitle(title) {
  useEffect(() => {
    document.title = `Portal Startec - ${title}`;
  }, []);

  return null;
}