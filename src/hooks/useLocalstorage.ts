export const setThemeUpdate = (theme: string) => {
  if (theme === "light") {
    localStorage.setItem("theme", JSON.stringify(theme));

    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  } else if (theme === "dark") {
    localStorage.setItem("theme", JSON.stringify(theme));

    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  } else {
    localStorage.removeItem("theme");

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};

export const getLocalStorage = () => {
  const theme = localStorage.getItem("theme");

  if (theme) {
    return JSON.parse(theme);
  } else {
    return "system";
  }
};

setThemeUpdate(getLocalStorage());
