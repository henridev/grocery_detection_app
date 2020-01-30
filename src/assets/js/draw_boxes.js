export default function drawBoxes(predictions, photo, svg) {
  svg.parentNode.replaceChild(svg.cloneNode(false), svg);
  svg.setAttribute("width", photo.width);
  svg.setAttribute("height", photo.height);
  predictions.forEach(prediction => {
    const { box, label, score } = prediction;
    const { left, top, width, height } = box;
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("x", left);
    rect.setAttribute("y", top);
    rect.setAttribute("class", "box");
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", left + width / 2);
    text.setAttribute("y", top);
    text.setAttribute("dy", 12);
    text.setAttribute("class", "label");
    text.textContent = `${label}: ${score.toFixed(3)}`;
    svg.appendChild(rect);
    svg.appendChild(text);
    const textBBox = text.getBBox();
    const textRect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    textRect.setAttribute("x", textBBox.x);
    textRect.setAttribute("y", textBBox.y);
    textRect.setAttribute("width", textBBox.width);
    textRect.setAttribute("height", textBBox.height);
    textRect.setAttribute("class", "label-rect");
    svg.insertBefore(textRect, text);
  });
}
