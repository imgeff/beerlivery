const setActiveElement = (styleSelector, elementSelector, removePreview) => {
  if (removePreview) {
    const previewElement = document.querySelector(`.${styleSelector}`);
    previewElement.classList.remove(styleSelector);
  }
  const element = document.querySelector(elementSelector);
  element.classList.add(styleSelector);
};

export default setActiveElement;
