import { _slideToggle } from "./modules/functions.js";

//Check mobile
const isMobile = {
  Android: () => {
    return !!navigator.userAgent.match(/Android/i);
  },
  BlackBerry: () => {
    return !!navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: () => {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: () => {
    return !!navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: () => {
    return !!navigator.userAgent.match(/IEMobile/i);
  },
  any: () => {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

//Set touch mode or mouse mode
if (isMobile.any()) {
  async function showSubMenu(e) {
    await _slideToggle(e.target.nextElementSibling, e.target.previousElementSibling);
    if (!e.target.nextElementSibling.classList.contains("_open")) {
      e.target.nextElementSibling.classList.toggle("_open");
    }
    e.target.classList.toggle("_active");
  }
  document.body.classList.add("_touch");
  const arrows = document.querySelectorAll("._popup-arrow");
  if (arrows.length > 0) {
    [].forEach.call(arrows, (arr) => {
      arr.previousElementSibling.classList.add("_parent");
      _slideUp(arr.nextElementSibling, arr.previousElementSibling);
      arr.addEventListener("click", showSubMenu);
    });  
  }
} else {
  document.body.classList.add("_mouse");
}
