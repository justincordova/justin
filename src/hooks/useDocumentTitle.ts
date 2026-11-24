import { useEffect } from "react";

const SITE_NAME = "Justin Cordova";

/**
 * Sets the tab title for the current page, e.g. "Projects — Justin Cordova".
 * Omit `page` for the bare site name (the home page).
 */
export function useDocumentTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} — ${SITE_NAME}` : SITE_NAME;
  }, [page]);
}
