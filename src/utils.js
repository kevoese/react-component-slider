export const getSliderValues = ({
  minWidth,
  elementsPerView,
  sliderWidth,
  length
}) => {
  const newElementsPerView = Math.floor(sliderWidth / Number(minWidth));
  let elements =
    newElementsPerView < elementsPerView ? newElementsPerView : elementsPerView;
  elements = elements < 1 ? 1 : elements;
  const percent = 100 / Number(elements);
  const pages = Math.ceil(length / elements) - 1;
  return { elementsPerView: elements, percent, pages, length };
};

export const propTypeValidation = {
  height: (props, propName) => {
    if (typeof props[propName] != 'number')
      return new Error(
        `Invalid ${propName} supplied to slider menu component. Please provide a height!`
      );
  },
  elementsPerView: (props, propName) => {
    if (typeof props[propName] != 'number')
      return new Error(
        `Invalid ${propName} supplied to slider menu component. Please provide the number of elements to be displayed on each view!`
      );
  },
  
  btnColor: (props, propName) => {
    if (props[propName] && typeof props[propName] != "string")
      return new Error(
        `Invalid ${propName} supplied to slider menu component!`
      );
  },
  elementsMinWidth: (props, propName) => {
    if (props[propName] && typeof props[propName] != 'number')
      return new Error(
        `Invalid ${propName} supplied to slider menu component!`
      );
  },
  autoModeDelayTime: (props, propName) => {
    if (props[propName] && typeof props[propName] != 'number')
      return new Error(
        `Invalid ${propName} supplied to slider menu component!`
      );
  },
  sliderTransition: (props, propName) => {
    if (props[propName] && typeof props[propName] != 'number')
      return new Error(
        `Invalid ${propName} supplied to slider menu component!`
      );
  },
  autoMode: (props, propName) => {
    if (props[propName] && typeof props[propName] != 'boolean')
      return new Error(
        `Invalid ${propName} supplied to slider menu component!`
      );
  },
};
