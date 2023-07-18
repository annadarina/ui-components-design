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

  function tabs($rootElem, listItems, defaultValue) {
    // 1. Create main blocks
    const $tabBar = document.createElement('div');
    const $tabPanels = document.createElement('div');

    // 2. State for the default selected tab
    const state = {
      value: defaultValue || listItems[0].id
    }

    // 3. Initialize tabs container and main inner blocks
    function init() {
      $rootElem.classList.add('tabs');
      $tabBar.className = 'tabs__buttons';
      $rootElem.appendChild($tabBar);
      $rootElem.appendChild($tabPanels);
    }

    // 4. Update tabs elements
    function update() {
      // Create fragments for tab bar and panels
      const $tabBarFragment = document.createDocumentFragment();
      const $tabPanelsFragment = document.createDocumentFragment();

      itemsList.forEach(({ id, label, panel }) => {
        // Create a tab button
        const $tabButton = document.createElement('button');
        $tabButton.className = 'tabs__button';
        $tabButton.type = 'button';
        $tabButton.textContent = label;
        $tabButton.setAttribute('data-value', id);

        // Create single tab panel
        const $tabPanel = document.createElement('div');
        $tabPanel.textContent = panel;

        const isActiveTab = state.value === id;

        if (isActiveTab) {
          $tabButton.classList.add('tabs__button--active');
        }

        $tabPanel.hidden = !isActiveTab;

        $tabBarFragment.appendChild($tabButton);
        $tabPanelsFragment.appendChild($tabPanel);
      })

      $tabBar.innerHTML = '';
      $tabPanels.innerHTML = '';

      $tabBar.appendChild($tabBarFragment);
      $tabPanels.appendChild($tabPanelsFragment);
    }

    // 5. Attach event listeners
    function attachEvents () {
      $tabBar.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
          return;
        }

        state.value = event.target.getAttribute('data-value');
        update();
      })
    }


    init();
    update();
    attachEvents();
  }

  tabs(document.querySelector('#tabs'), itemsList);
})()