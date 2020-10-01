const html = document.querySelector("html");

const getStyle = (style) => {
  return window.getComputedStyle(html).getPropertyValue(style);
};

const transformKey = (key) =>
  "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeTheme = (colors) => {
  Object.keys(colors).map((key) => {
    html.style.setProperty(transformKey(key), colors[key]);
  });
};

const initialTheme = {
  bgBody: getStyle("--bg-body"),
  bgForm: getStyle("--bg-form"),
  bgFooter: getStyle("--bg-footer"),
  borderColor: getStyle("--border-color"),
  fontColor: getStyle("--font-color"),
};

const darkTheme = {
  bgBody: "#333333",
  bgForm: "#F2B705",
  bgFooter: "#1F1F1F",
  borderColor: "#454545",
  fontColor: "#d3d3d3",
};

const toggleTheme = document.querySelector(".toggle-theme");
toggleTheme.addEventListener("change", ({ target }) => {
  target.checked ? changeTheme(darkTheme) : changeTheme(initialTheme);
});
