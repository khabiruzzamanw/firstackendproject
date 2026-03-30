themeChanger();

function themeChanger() {
  const theme = document.querySelector("#theme");

  const imageIcons = {
    light: {
      themeIcon: "svgs/lightMode.svg",
    },

    dark: {
      themeIcon: "svgs/darkMode.svg",
    },
  };

  const themeInfo = localStorage.getItem("userTheme") || "dark";
  document.body.classList.remove("dark", "light");
  document.body.classList.add(themeInfo);

  setIcons(themeInfo);

  theme.addEventListener("click", () => {
    const darkThemed = document.body.classList.contains("dark");

    if (!darkThemed) {
      document.body.classList.replace("light", "dark");
      setIcons("dark");
      localStorage.setItem("userTheme", "dark");
    } else {
      document.body.classList.replace("dark", "light");
      setIcons("light");
      localStorage.setItem("userTheme", "light");
    }
  });

  function setIcons(themeKey) {
    theme.src = imageIcons[themeKey].themeIcon;
  }
}
