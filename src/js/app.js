/*import { useDynamicAdapt } from './modules/dynamicAdapt.js'
useDynamicAdapt()*/
import * as ivmalFunctions from "./modules/functions.js";
//import "swiper/css/bundle";
//@@include('ymap.js');
@@include('forms.js');
@@include('popupMenu.js');
@@include('popupWindows.js');
@@include('rating.js');
@@include('lazyLoading.js');
@@include('spoilers.js');
@@include('swiper.js');

ivmalFunctions.isWebp();

const img = document.querySelectorAll("._ibg");
Array.prototype.forEach.call(img, (value) => {
  if (value.querySelector("img")) {
    value.style.backgroundImage =
      "url(" + value.querySelector("img").getAttribute("src") + ")";
  }
});

// Spoilers
/*const spoilers = document.querySelectorAll("._spoilers");
if (spoilers) {
  [].forEach.call(spoilers, (el) => {
    const spoilerItems = el.querySelectorAll("._spoiler");
    [].forEach.call(spoilerItems, (spoiler) => {
      const spoilerBody = spoiler.nextElementSibling;
      spoiler.addEventListener("click", (e) => {
        if (el.classList.contains("_accordeon")) {
          [].forEach.call(spoilerItems, (si) => {
            if (si.classList.contains("_active") && si != spoiler) {
              si.classList.remove("_active");
              ivmalFunctions._slideUp(si.nextElementSibling, si);
            }
          });
        }
        spoiler.classList.toggle("_active");
        ivmalFunctions._slideToggle(spoilerBody, spoiler);
      });
    });
  });
}*/

// Responsive mobile menu
const menuIcon = document.querySelector(".header-menu__icon");
const menu = document.querySelector(".header-menu");
const links = document.querySelectorAll(".header-menu__link");

function toggleClass(c) {
  menuIcon.classList.toggle(c);
  menu.classList.toggle(c);
  [].forEach.call(links, (lnk) => {
    lnk.classList.toggle("_active");
  });
  document.body.classList.toggle("_lock");
}

menuIcon.addEventListener("click", () => {
  function toggleClass(c) {
    menuIcon.classList.toggle(c);
    menu.classList.toggle(c);
    [].forEach.call(links, (lnk) => {
      lnk.classList.toggle("_active");
    });
    document.body.classList.toggle("_lock");
  }
  toggleClass("_active");

  function linkCB() {
    toggleClass("_active");
    [].forEach.call(links, (l) => {
      l.removeEventListener("click", linkCB);
    });
  }

  [].forEach.call(links, (l) => {
    l.addEventListener("click", linkCB);
  });
});

// Page smooth scrolling
const menuHeader = document.querySelector(".header");
// const links = document.querySelectorAll(".header-menu__link");

let scrolled = false;
const blocks = [];
let current = -1;

function getBlocks() {
  [].forEach.call(links, (l) => {
    blocks.push(
      document.querySelector("." + l.getAttribute("href").split("#")[1])
    );
  });
}
getBlocks();

window.addEventListener("scroll", () => {
  scrollUpdate();
});

scrollUpdate();

function scrollUpdate() {
  if (pageYOffset > 0) {
    scrolled = true;
    if (scrolled) {
      menuHeader.classList.add("_scrolled");
      // mainBlock.style.marginTop = `${menuHeader.offsetHeight}px`;
    }
  } else {
    scrolled = false;
    // mainBlock.style.marginTop = `0px`;
    menuHeader.classList.remove("_scrolled");
  }

  const boxes = [];
  if (blocks[0]) {
    Array.prototype.forEach.call(blocks, (b) => {
      boxes.push(Math.abs(b.getBoundingClientRect().top));
    });
    const min = Math.min(...boxes);
    const i = boxes.indexOf(min);
    if (i != current || min >= 500) {
      current = -1;
      Array.prototype.forEach.call(links, (l) => {
        l.classList.remove("_current");
      });
      if (min < 500) {
        current = i;
        links[i].classList.add("_current");
        // links[i + links.length / 2].classList.add("_current");
      }
    }
  }
}

//smooth scroll from first fullscreen to content
const gotos = document.querySelectorAll("._goto");
if (gotos) {
  [].forEach.call(gotos, (e) => {
    e.addEventListener("click", () => {
      if (menuIcon) {
        if (menuIcon.classList.contains("_active")) {
          toggleClass("_active");
        }
      }
      const link = e.getAttribute("href");
      if (link) {
        const box = document
          .querySelector("." + link.split("#")[1])
          .getBoundingClientRect();
        window.scrollTo({
          top: box.top + pageYOffset - menuHeader.offsetHeight,
          behavior: "smooth",
        });
        //e.preventDefault();
      }
    });
  });
}

