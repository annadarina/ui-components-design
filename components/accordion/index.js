(() => {
  const itemsList = [
    {
      id: 'html',
      label: 'HTML',
      panel:
        'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
    },
    {
      id: 'css',
      label: 'CSS',
      panel:
        'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
    },
    {
      id: 'javascript',
      label: 'JavaScript',
      panel:
        'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
    },
  ];

  function accordion($rootElem, items) {

    function init() {
      $rootElem.classList.add('accordion');

      const $accordionSections =
        document.createDocumentFragment();

      items.forEach(({id, label, panel}) => {
        // Create accordion section wrapper
        const $accordionSection = document.createElement('div');
        $accordionSection.classList.add('accordion__item');

        // Create accordion toggle button
        const $accordionButton = document.createElement('button');
        $accordionButton.type = 'button';
        $accordionButton.textContent = label;
        $accordionButton.classList.add('accordion__button');
        $accordionButton.setAttribute('data-value', id);
        $accordionButton.setAttribute('aria-expanded', 'false');
        $accordionButton.setAttribute('aria-controls', `${id}-panel`);

        // Create icon
        const $accordionIcon = document.createElement('span');
        $accordionIcon.classList.add('accordion__icon');
        $accordionIcon.setAttribute('aria-hidden', 'true');

        $accordionButton.append($accordionIcon);

        // Create content section
        const $accordionContent = document.createElement('div');
        $accordionContent.classList.add('accordion__content');
        $accordionContent.hidden = true;
        $accordionContent.textContent = panel;
        $accordionContent.role = 'region';
        $accordionContent.setAttribute('aria-labelledby', `${id}-header`);

        // Append all the content
        $accordionSection.append($accordionButton, $accordionContent);
        $accordionSections.append($accordionSection);
      })

      $rootElem.append($accordionSections);
    }

    function attachEvents() {
      $rootElem.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
          return;
        }

        // Rotate arrow icon
        const $iconEl = event.target.querySelector('.accordion__icon');
        $iconEl.classList.toggle('accordion__icon--rotate');


        // Toggle panel visibility
        const $accordionContents = event.target.nextSibling;
        $accordionContents.hidden = !$accordionContents.hidden;

        if (!$accordionContents.hidden) {
          event.target.setAttribute('aria-expanded', 'true');
        }
      })
    }

    init();
    attachEvents();
  }

  accordion(document.querySelector('#accordion'), itemsList);
})()