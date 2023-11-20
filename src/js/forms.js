import { _slideUp } from "./modules/functions.js";
const errClassName = "_error";
const activeClassName = "_active";

const PLACEHOLDER_OPACITY = 0.5;
const inputs = document.querySelectorAll("._input");
if (inputs) {
  [].forEach.call(inputs, (e) => {
    const dv = e.getAttribute("data-value");
    let isPlaceholder = true;
    //e.isPlaceholder = isPlaceholder;
    if (dv) {
      e.style.color = `rgba(255, 255, 255, ${PLACEHOLDER_OPACITY})`;
      e.value = dv;
      e.addEventListener("focus", () => {
        if (isPlaceholder) {
          e.value = "";
          isPlaceholder = false;
          e.isPlaceholder = isPlaceholder;
          e.style.color = `rgba(255, 255, 255, 1)`;
        }
      });
      e.addEventListener("blur", () => {
        if (e.value === "") {
          e.value = dv;
          isPlaceholder = true;
          e.isPlaceholder = isPlaceholder;
          e.style.color = `rgba(255, 255, 255, ${PLACEHOLDER_OPACITY})`;
        }
      });
    }
  });
}
const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", formSend);
  async function formSend(e) {
    e.preventDefault();
    if (formValidate() === 0) {
      //
      let formData = new FormData(form);
      formData.append("image", formImage.files[0]);

      form.classList.add("_sending");
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = "";
        form.reset();
        form.classList.remove("_sending");
      } else {
        alert("Ошибка передачи данных. " + response.status);
        form.classList.remove("_sending");
        console.log(response);
      }
    } else {
      alert("Заполните обязательные поля");
    }
  }
}

function formValidate() {
  let error = 0;
  const formReq = document.querySelectorAll("._req");
  [].forEach.call(formReq, (el) => {
    formRemoveError(el);
    if (el.getAttribute("type") === "email") {
      if (emailTest(el)) {
        formAddError(el);
        error++;
      }
    } else if (el.getAttribute("type") === "checkbox" && el.checked === false) {
      formAddError(el);
      error++;
    } else if (el.value === "" || el.isPlaceholder) {
      formAddError(el);
      error++;
      console.log(el.value + " + " + el.isPlaceholder);
    }
  });
  return error;
}

function formAddError(input) {
  input.parentElement.classList.add("_err");
  input.classList.add("_err");
}

function formRemoveError(input) {
  input.parentElement.classList.remove("_err");
  input.classList.remove("_err");
}

function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

function digi(str) {
  return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}

function digiAnimate(digiAnimate) {
  if (digiAnimate.length > 0) {
    [].forEach.call(digiAnimate, (el) => {
      const elTo = +el.innerHTML.replace(" ", "");
      if (!el.classList.contains("_done")) {
        // digiAnimateValue(el, 0, elTo, 1500);
      }
    });
  }
}

const quantityButtons = document.querySelectorAll(".quantity__button");
if (quantityButtons.length > 0) {
  [].forEach.call(quantityButtons, (qb) => {
    qb.addEventListener("click", (e) => {
      let value = parseInt(
        qb.closest(".quantity").querySelector("input").value
      );
      if (qb.classList.contains("quantity__button--plus")) {
        value++;
      } else {
        value--;
        if (value < 1) {
          value = 1;
        }
      }
      qb.closest(".quantity").querySelector("input").value = value;
    });
  });
}

const formImage = document.getElementById("formImage");
const formPreview = document.getElementById("formPreview");
formImage.addEventListener("change", () => {
  uploadFile(formImage.files[0]);
});

function uploadFile(file) {
  if (
    !["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type)
  ) {
    alert("Разрешены только изображения.");
    formImage.value = "";
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    alert("Файл должен быть менее 2 МБ.");
    return;
  }

  let reader = new FileReader();
  reader.onload = (e) => {
    formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
  };
  reader.onerror = (e) => {
    alert("Ошибка чтения файла.");
  };
  reader.readAsDataURL(file);
}

// Select
const selects = document.getElementsByTagName("select+++++++++++");
if (selects.length > 0) {
  selectsInit();
}

function selectsInit() {
  [].forEach.call(selects, (select) => {
    selectInit(select);
  });

  document.addEventListener("click", (e) => {
    selectsClose(e);
  });
  document.addEventListener("keydown", (e) => {
    if (e.which == 27) {
      selectsClose(e);
    }
  });
}

function selectsClose(e) {
  const selects = document.querySelectorAll("._select");
  if (!e.target.closest("._select")) {
    [].forEach.call(selects, (select) => {
      const selectBodyOptions = select.querySelector("._select__options");
      select.classList.remove(activeClassName);
      _slideUp(selectBodyOptions, null, 100);
    });
  }
}

function selectInit(select) {
  const selectParent = select.parentElement;
  const selectModifier = select.getAttribute("class");
  const selectSelectedOption = select.querySelector("option:checked");
  select.setAttribute("data-default", selectSelectedOption.value);
  select.style.display = "none";

  selectParent.insertAdjacentHTML(
    "beforeend",
    "<div class='_select _select_" + selectModifier + "'></div>"
  );

  const newSelect = selectParent.querySelector("._select");
  newSelect.append(select);
  selectItem(select);
}

function selectItem(select) {
  const selectParent = select.parentElement;
  const selectItems = selectParent.querySelector("._select__item");
  const selectOptions = select.querySelectorAll("option");
  const selectSelectedOption = select.querySelector("option:checked");
  const selectSelectedText = selectSelectedOption.text;
  const selectType = select.getAttribute("data_type");

  if (selectItems) {
    selectItems.remove();
  }

  let selectTypeContent = "";
  if (selectType == "input") {
    selectTypeContent =
      "<div class='_select__value icon-select-arrow'><input autocomplete='off' type='text' name='form[]' value='" +
      selectSelectedText +
      "'/></div>";
  } else {
    selectTypeContent =
      "<div class='_select__value icon-select-arrow'><span>" +
      selectSelectedText +
      "</span></div>";
  }

  selectParent.insertAdjacentHTML(
    "beforeend",
    "<div class='_select__item'>" +
      "<div class='_select__title'>" +
      selectTypeContent +
      "</div>" +
      "<div class='_select__options'>" +
      selectGetOptions(selectOptions) +
      "</div></div></div>"
  );

  selectActions(select, selectParent);
}

function selectActions(original, select) {
  const selectItem = select.querySelector("._select__item");
  const selectBodyOptions = select.querySelector("._select__options");
  const selectOptions = select.querySelectorAll("._select__option");
  const selectType = original.getAttribute("data-type");
  const selectInput = select.querySelector("._select__input");

  selectItem.addEventListener("click", () => {
    const selects = document.querySelectorAll("._select");
    [].forEach.call(selects, (select) => {
      const selectBodyOptions = select.querySelector("._select__options");
      if (select != selectItem.closest("._select")) {
        select.classList.remove(activeClassName);
        _slideUp(selectBodyOptions, null, 100);
      }
    });
    _slideToggle(selectBodyOptions, null, 100);
    select.classList.toggle(activeClassName);
  });

  [].forEach.call(selectOptions, (selectOption) => {
    const selectOptionValue = selectOption.getAttribute("data-value");
    const selectOptionText = selectOption.innerHTML;

    if (selectType == "input") {
      selectInput.addEventListener("keyup", selectSearch);
    } else {
      if (selectOption.getAttribute("data-value") == original.value) {
        selectOption.style.display = "none";
      }
    }
    selectOption.addEventListener("click", () => {
      [].forEach.call(selectOptions, (el) => {
        el.style.display = "block";
      });
      if (selectType == "input") {
        selectInput.value = selectOptionText;
        original.value = selectOptionValue;
      } else {
        select.querySelector(".select__value").innerHTML =
          "<span>" + selectOptionText + "</span>";
        original.value = selectOptionValue;
        selectOption.style.display = "none";
      }
    });
  });
}

function selectGetOptions(selectOptions) {
  if (selectOptions) {
    let selectOptionsContent = "";
    [].forEach.call(selectOptions, (selectOption) => {
      const selectOptionValue = selectOption.value;
      if (selectOptionValue) {
        const selectOptionText = selectOption.text;
        selectOptionsContent =
          selectOptionsContent +
          "<div data-value='" +
          selectOptionValue +
          "' class='_select__option'>" +
          selectOptionText +
          "</div>";
      }
    });
    return selectOptionsContent;
  }
}

function selectSearch(e) {
  const selectBlock = e.target
    .closest("._select")
    .querySelector("._select__options");
  const selectOptions = e.target
    .closest("._select")
    .querySelectorAll("._select__option");
  const selectSearchText = e.target.value.toUpperCase();

  [].forEach.call(selectOptions, (selectOption) => {
    const selectTxtValue = selectOption.textContent || selectOption.innerText;
    if (selectTxtValue.toUpperCase().indexOf(selectSearchText) > -1) {
      selectOption.style.display = "";
    } else {
      selectOption.style.display = "none";
    }
  });
}

function selectsUpdateAll() {
  const selects = document.querySelectorAll("select");
  if (selects) {
    [].forEach.call(selects, (select) => {
      selectItem(select);
    });
  }
}
// Select end
