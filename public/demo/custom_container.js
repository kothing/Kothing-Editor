import icons from '../src/assets/defaultIcons';

export default {
  // @Required
  // plugin name
  name: 'custom_container',

  // @Required
  // data display
  display: 'container',

  // @Required
  // add function - It is called only once when the plugin is first run.
  // This function generates HTML to append and register the event.
  // arguments - (core : core object, targetElement : clicked button element)
  add: function (core, targetElement) {
    // @Required
    // Registering a namespace for caching as a plugin name in the context object
    const context = core.context;
    context.customContainer = {};

    // Generate submenu HTML
    // Always bind "core" when calling a plugin function
    let listDiv = this.setSubmenu.call(core);

    // You must bind "core" object when registering an event.
    /** add event listeners */
    listDiv.querySelector('.__ke_container').addEventListener('click', this.onClick.bind(core));

    // @Required
    // You must add the "submenu" element using the "core.initMenuTarget" method.
    /** append target button menu */
    core.initMenuTarget(this.name, targetElement, listDiv);
  },

  setSubmenu: function () {
    const listDiv = this.util.createElement('DIV');

    listDiv.className = 'ke-submenu ke-list-layer';
    listDiv.innerHTML = '' +
            '<div class="ke-list-inner">' +
            '<ul>' +
            '<li>' +
            '<div class="ke-submenu-form-group __ke_container">' +
            // The "position" of each element surrounding the button must be "relative".
            '<div style="position:relative;">' +
            // Enter the button name of the plug-in or default command in the button's "data-command"
            '<button type="button" class="ke-btn ke-tooltip" data-command="bold" style="margin: 0 !important;">' +
            icons.bold +
            '<span class="ke-tooltip-inner">' +
            '<span class="ke-tooltip-text">Quote</span>' +
            '</span>' +
            '</button>' +
            '</div>' +
            '<div style="position:relative;">' +
            '<button type="button" class="ke-btn ke-tooltip" data-command="blockquote">' +
            '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" /></svg>' +
            '<span class="ke-tooltip-inner">' +
            '<span class="ke-tooltip-text">Quote</span>' +
            '</span>' +
            '</button>' +
            '</div>' +
            '<div style="position:relative;">' +
            '<button type="button" class="ke-btn ke-tooltip" data-command="link">' +
            icons.link +
            '<span class="ke-tooltip-inner">' +
            '<span class="ke-tooltip-text">Link</span>' +
            '</span>' +
            '</button>' +
            '</div>' +
            '<div style="position:relative;">' +
            '<button type="button" class="ke-btn ke-tooltip" data-command="table">' +
            icons.table +
            '<span class="ke-tooltip-inner">' +
            '<span class="ke-tooltip-text">Table</span>' +
            '</span>' +
            '</button>' +
            '</div>' +
            '<div style="position:relative;">' +
            '<button type="button" class="ke-btn ke-tooltip" data-command="textStyle">' +
            icons.text_style +
            '<span class="ke-tooltip-inner">' +
            '<span class="ke-tooltip-text">Text style</span>' +
            '</span>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '</div>';

    return listDiv;
  },

  onClick: function (e) {
    e.preventDefault();
    e.stopPropagation();

    let target = e.target;
    let command = '';

    while (!command && !/^UL$/i.test(target.tagName)) {
      command = target.getAttribute('data-command');
      if (command) { break; }
      target = target.parentNode;
    }

    if (!command) { return; }

    const plugin = this.plugins[command];
    this.actionCall(command, (plugin ? plugin.display : ''), target);
  },
};