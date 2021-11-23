const buttons = document.querySelector(".buttons");
const map = document.querySelector(".map");
const mapContainer = document.querySelector(".map_container");

buttons.addEventListener("click", handleClick);

function handleClick(e) {
  if (e.target.classList.contains("plus")) {
    zoomIn();
  } else {
    zoomOut();
  }

  map.onmousedown = function (e) {
    map.style.position = "absolute";
    mapContainer.appendChild(map);

    map.style.zIndex = 1000;

     const coords = getCoords(map);
     const shiftX = e.pageX - coords.left;
     const shiftY = e.pageY - coords.top;

    function moveAt(e) {
       map.style.left = e.pageX - shiftX + "px";
       map.style.top = e.pageY - shiftY + "px";

    }

    document.onmousemove = function (e) {
      moveAt(e);
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };

     function getCoords(elem) {
       const box = elem.getBoundingClientRect();
       console.log(box);
       return {
         top: box.top + pageYOffset,
         left: box.left + pageXOffset
       };
     }
  };
}

function zoomIn() {
  const mapCurrWidth = map.clientWidth;
  if (mapCurrWidth === 3267) {
    return false;
  } else {
    map.style.width = mapCurrWidth + 300 + "px";
  }
}

function zoomOut() {
  const mapCurrWidth = map.clientWidth;
  if (mapCurrWidth <= 1480) {
    return false;
  } else {
    map.style.width = mapCurrWidth - 300 + "px";
    map.style.left = null;
    map.style.top = null;
  }
}

map.ondragstart = function () {
  return false;
};
