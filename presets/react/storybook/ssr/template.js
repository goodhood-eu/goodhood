const renderLink = (path) => `<link rel="stylesheet" href="${path}" />`;
const renderScript = (path) => `<script type="module" src="${path}"></script>`;

module.exports = ({ stylesheets, scripts, rootContent }) => `
<html>
  <head>
    <title>Storybook</title>
    ${stylesheets.map(renderLink).join('')}
    <script>
    try {
      if (window.top !== window) {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.top.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('unable to connect to top frame for connecting dev tools');
    }
    </script>
    <style>
    :not(.sb-show-main) > .sb-main,
    :not(.sb-show-nopreview) > .sb-nopreview,
    :not(.sb-show-errordisplay) > .sb-errordisplay {
     display: none;
    } 
    </style>
  </head>
  <body>
    <div id="root">${rootContent}</div>
    <div id="docs-root"></div>
    <div class="sb-errordisplay sb-wrapper">
      <pre id="error-message" class="sb-heading"></pre>
      <pre class="sb-errordisplay_code"><code id="error-stack"></code></pre>
    </div>
    ${scripts.map(renderScript).join('')}
  </body>
</html>
`;
