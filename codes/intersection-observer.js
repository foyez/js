const options = {
  // the bounding box
  // the top-level document's viewport is used,
  // if no root is passed or null
  root: null,
  // An offset rectangle applied to the root's bounding box
  // px or %
  rootMargin: "0px 0px 0px 0px",
  // ratio of intersection area to bounding box area of an observed target
  // default value is 0
  threshold: 0.5, // callback will be executed when 50% of target is enter in bounding box
};
const observer = new IntersectionObserver((entries, observer) => {
  // callback will be executed when target is entering or leaving the bounding box
  entries.forEach((entry) => {
    // If intersectionRatio is 0, the target is out of view
    // and we do not need to do anything.
    if (entry.intersectionRatio <= 0) return;

    console.log(entry); // time, rootBounds, boundingClientRect, intersectionRect, isIntersecting, intersectionRatio, target

    // stop observing a particular target element.
    observer.unobserve(entry.target);
  });
}, options);
const targetElement = document.querySelector(".btn");
observer.observe(targetElement);
