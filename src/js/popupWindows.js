const popupLinks = document.querySelectorAll("._popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll("._lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  [].forEach.call(popupLinks, (pl) => {
    pl.addEventListener("click", (e) => {
      const popupName = pl.getAttribute("href").replace("#", "");
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  });
}

const popupCloseIcons = document.querySelectorAll("._popup-close");
if (popupCloseIcons.length > 0) {
  [].forEach.call(popupCloseIcons, (pci) => {
    pci.addEventListener("click", (e) => {
      popupClose(pci.closest("._popup"));
      e.preventDefault();
    });
  });
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector("_popup._open-popup");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
  }

  currentPopup.classList.add("_open-popup");
  currentPopup.addEventListener("click", (e) => {
    if (!e.target.closest("._popup-content")) {
      popupClose(e.target.closest("._popup"));
    }
  });
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("_open-popup");
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector("._wrapper").offsetWidth + "px";
  if (lockPadding.length > 0) {
    [].forEach.call(lockPadding, (lp) => {
      lp.style.paddingRight = lockPaddingValue;
    });
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("_lock");

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(() => {
    if (lockPadding.length > 0) {
      [].forEach.call(lockPadding, (lp) => {
        lp.style.paddingRight = "0px";
      });
    }
    body.style.paddingRight = "0px";
    body.classList.remove("_lock");
  }, timeout);

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", (e) => {
	if (e.which === 27) {
		const popupActive = document.querySelector("._poppup.open-popup");
		popupClose(popupActive);
	}
});

(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function(css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMathesSelector;
	}
})();
