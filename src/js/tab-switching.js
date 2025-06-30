/*
* This file handles the switching between different tabs in the UI.
*/

// Adds event listeners to each tab and handles the display of corresponding views
export function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and views
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

      // Add active class to the clicked tab and corresponding view
      tab.classList.add('active');
      document.getElementById(tab.dataset.view).classList.add('active');
    });
  });
}

// Forces a switch to a specific tab and its corresponding view
export function switchToTab(tabId) {
  // Remove the active class from all tabs and views
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));

  // Add the active class to the specified tab and its corresponding view
  const targetTab = document.querySelector(`.tab[data-view="${tabId}"]`);
  const targetView = document.getElementById(tabId);

  if (targetTab && targetView) {
    targetTab.classList.add('active');
    targetView.classList.add('active');
  }
}
