/*
* Handles the toggling of vertical exaggeration input between a select dropdown and a custom input field.
*/

export function initToggleVerticalExaggeration() {
  const customBtn = document.getElementById('customExaggerationBtn');
  const select = document.getElementById('verticalExaggerationSelect');
  const customInput = document.getElementById('verticalExaggerationInput');

  customBtn.addEventListener('click', () => {
    if (customInput.style.display === 'none') {
      customInput.style.display = '';
      select.style.display = 'none';
      customInput.value = select.value;
      customInput.focus();
    } else {
      customInput.style.display = 'none';
      select.style.display = '';
    }
  });

  // Update custom input when select changes
  select.addEventListener('change', () => {
    customInput.value = select.value;
  });
}

// Returns the current vertical exaggeration value based on the visibility of the input field
export function getCurrentVerticalExaggeration() {
  const select = document.getElementById("verticalExaggerationSelect");
  const input = document.getElementById("verticalExaggerationInput");
  if (input.style.display !== "none") {
    return parseFloat(input.value);
  } else {
    return parseFloat(select.value);
  }
}
