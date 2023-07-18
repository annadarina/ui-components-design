(() => {
  function progressBar($rootElem, value) {
    const MIN = 0;
    const MAX = 100;

    // 1. Set class name for the root element
    $rootElem.classList.add('progress');

    // 2. Create progress bar element
    const $progressBarElem = document.createElement('div');
    $progressBarElem.classList.add('progress-bar');
    // Set aria attributes
    $progressBarElem.setAttribute('role', 'progressbar');
    $progressBarElem.setAttribute('aria-valuemin', MIN.toString());
    $progressBarElem.setAttribute('aria-valuemax', MAX.toString());

    // 3. Set value for the progress bar
    function setValue(val) {
      // Check if value is within a range, convert them if needed
      const value = Math.min(Math.max(val, MIN), MAX);

      // Set style for the progress bar
      $progressBarElem.style.width = `${value}%`;
      $progressBarElem.textContent = `${value}%`;
      $progressBarElem.setAttribute('aria-valuenow', value.toString());
    }

    // 4. Append progress bar to the root element
    $rootElem.appendChild($progressBarElem);
    setValue(value);

    return {
      setValue
    }
  }

  // Initialize examples
  progressBar(document.querySelector('#progress-0'), 0);
  progressBar(document.querySelector('#progress-25'), 25);
  progressBar(document.querySelector('#progress-50'), 50);
  progressBar(document.querySelector('#progress-75'), 75);
  progressBar(document.querySelector('#progress-100'), 100);
  progressBar(document.querySelector('#progress--50'), -50);
  progressBar(document.querySelector('#progress-150'), 150);

  // Initialize progress bar controlled with range controller
  const controlledElem = progressBar(document.querySelector('#progress-bar'), 10);

  function handleRangeChange(event) {
    controlledElem.setValue(event.target.value);
  }

  document.querySelector('#rangeControl').addEventListener('change', handleRangeChange);
})()