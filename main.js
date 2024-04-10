let list = [];

document.querySelector("#list-items").addEventListener("click", function(e) {
  if (e.target.tagName === "SPAN"){
    let listItem = e.target.parentNode;
    const index = Array.from(listItem.parentNode.children).indexOf(listItem);
    if (index !== -1) {
      list.splice(index, 1);
      updateListInLocalStorage();
      listItem.remove();
    }
  }
});

function add() {
  const itemInput = document.getElementById("itemInput");
  const categorySelect = document.getElementById("categorySelect");

  if (!isValidated(itemInput.value.trim(), categorySelect.value)) {
    console.log("Invalid inputs");
    return;
  }

  const listItems = document.getElementById("list-items");

  const newItem = document.createElement("li");
  newItem.className = "m-3 p-2";

  const emojiSpan = document.createElement("span");
  emojiSpan.textContent = "➡";
  newItem.appendChild(emojiSpan);

  const textSpan = document.createElement("span");
  textSpan.textContent = itemInput.value.trim();
  newItem.appendChild(textSpan);

  const categorySpan = document.createElement("span");
  categorySpan.textContent = categorySelect.value;
  categorySpan.className = "ml-3 p-2 rounded-2xl";

  switch (categorySelect.value) {
    case "fruit":
      categorySpan.classList.add("bg-purple-300");
      break;
    case "dairy":
      categorySpan.classList.add("bg-fuchsia-500");
      break;
    case "meat":
      categorySpan.classList.add("bg-blue-400");
      break;
    default:
      break;
  }
  newItem.appendChild(categorySpan);

  listItems.appendChild(newItem);

  const newItemObj = { name: itemInput.value.trim(), category: categorySelect.value };
  list.push(newItemObj);
  updateListInLocalStorage();

  itemInput.value = "";
  categorySelect.value = "";
}

function isValidated(textInput, dropdownValue) {
  let isValid = false;

  if (textInput !== "" && dropdownValue !== "") {
    isValid = true;
  } else {
    if (textInput === "") {
      document.getElementById("itemInput").classList.add("border-red-500");
    }
    if (dropdownValue === "") {
      document.getElementById("categorySelect").classList.add("border-red-500");
    }
  }

  return isValid;
}

function updateListInLocalStorage() {
  localStorage.setItem('listItems', JSON.stringify(list));
}

document.addEventListener("DOMContentLoaded", function () {
  const storedList = localStorage.getItem('listItems');
  if (storedList) {
    list = JSON.parse(storedList);
    list.forEach(item => {
      const newItem = document.createElement("li");
      newItem.className = "m-3 p-2";
  
      const emojiSpan = document.createElement("span");
      emojiSpan.textContent = "➡";
      newItem.appendChild(emojiSpan);
  
      const textSpan = document.createElement("span");
      textSpan.textContent = item.name;
      newItem.appendChild(textSpan);
  
      const categorySpan = document.createElement("span");
      categorySpan.textContent = item.category;
      categorySpan.className = "ml-3 p-2 rounded-2xl";
  
      switch (item.category) {
        case "fruit":
          categorySpan.classList.add("bg-yellow-300");
          break;
        case "dairy":
          categorySpan.classList.add("bg-green-500");
          break;
        case "meat":
          categorySpan.classList.add("bg-fuchsia-400");
          break;
        default:
          break;
      }
      newItem.appendChild(categorySpan);
  
      document.getElementById("list-items").appendChild(newItem);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector('.bg-sky-600');
  addButton.addEventListener("click", add);
});