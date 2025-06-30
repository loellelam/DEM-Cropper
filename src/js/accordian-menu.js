/*
* Accordian Menu Functionality: Toggles visibility of accordion content when the header is clicked.
*/

export function accordianMenu() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;

      // Toggle active class for the clicked accordion content
      content.classList.toggle('active');

      // Close other accordion items
      document.querySelectorAll('.accordion-content').forEach(item => {
        if (item !== content) {
          item.classList.remove('active');
        }
      });
    });
  });
}