import { get, writable } from "svelte/store";

type Theme = "light" | "dark";

function createThemeStore() {
  const store = writable<Theme>(
    typeof window !== "undefined" 
      ? (window.localStorage.getItem("theme") as Theme) ?? "light"
      : "light"
  );

  return {
    subscribe: store.subscribe,
    toggle: () => {
      const currentTheme = get(store);
      const newTheme = currentTheme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark");
      }
      store.set(newTheme);
    },
  };
}

export const theme = createThemeStore(); 