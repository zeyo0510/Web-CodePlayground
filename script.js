document.addEventListener('DOMContentLoaded', function() {
  let htmlCode = '';
  let cssCode = '';
  let jsCode = '';
  /************************************************/
  const titleInfo        = document.getElementById('title-info');
  const fullscreenButton = document.getElementById('fullscreen-button');
  const runButton        = document.getElementById('run-button');
  const htmlTab          = document.getElementById('html-tab');
  const cssTab           = document.getElementById('css-tab');
  const jsTab            = document.getElementById('js-tab');
  const previewTab       = document.getElementById('preview-tab');
  const htmlContent      = document.getElementById('html-content');
  const cssContent       = document.getElementById('css-content');
  const jsContent        = document.getElementById('js-content');
  const previewContent   = document.getElementById('preview-content');
  const htmlEditor       = document.getElementById('html-editor');
  const cssEditor        = document.getElementById('css-editor');
  const jsEditor         = document.getElementById('js-editor');
  const previewWebview   = document.getElementById('preview-webview');
  const copyrighInfo     = document.getElementById('copyright-info');
  const githubLink       = document.getElementById('github-link');
  /************************************************/
  async function load() {
    // htmlEditor
    await fetch('demo/demo.html')
      .then(response => response.text())
      .then(data => htmlCode = data);
    // cssEditor
    await fetch('demo/demo.css')
      .then(response => response.text())
      .then(data => cssCode = data);
    // jsEditor
    await fetch('demo/demo.js')
      .then(response => response.text())
      .then(data => jsCode = data);
  }
  /************************************************/
  function init() {
    // titleInfo
    titleInfo.textContent = document.title;
    // fullscreenButton
    fullscreenButton.textContent = 'fullscreen';
    fullscreenButton.title = 'Fullscreen';
    fullscreenButton.addEventListener('click', fullscreen);
    // runButton
    runButton.textContent = 'play_arrow';
    runButton.title = 'Run';
    runButton.addEventListener('click', runCode);
    // htmlTab
    htmlTab.textContent = 'HTML';
    htmlTab.addEventListener('click', switchTab);
    // cssTab
    cssTab.textContent = 'CSS';
    cssTab.addEventListener('click', switchTab);
    // jsTab
    jsTab.textContent = 'JS';
    jsTab.addEventListener('click', switchTab);
    // previewTab
    previewTab.textContent = 'Preview';
    previewTab.addEventListener('click', switchTab);
    // copyrighInfo
    copyrighInfo.textContent = 'Code Playground © 2025 | HTML, CSS, JS Live Editor';
    // githubLink
    githubLink.href = githubLink.dataset['url'];
    githubLink.target = '_blank';
    githubLink.textContent = '❤️GitHub';
    // htmlEditor
    htmlEditor.value = htmlCode;
    // cssEditor
    cssEditor.value = cssCode;
    // jsEditor
    jsEditor.value = jsCode;
  }
  /************************************************/
  function switchTab() {
    const target = this.dataset['target'];
    /************************************************/
    htmlTab.classList.remove('active');
    cssTab.classList.remove('active');
    jsTab.classList.remove('active');
    previewTab.classList.remove('active');
    /************************************************/
    this.classList.add('active');
    /************************************************/
    htmlContent.classList.add('hide');
    cssContent.classList.add('hide');
    jsContent.classList.add('hide');
    previewContent.classList.add('hide');
    /************************************************/
    document.getElementById(target).classList.remove('hide');
  }
  /************************************************/
  function runCode() {
    const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<style>
${cssEditor.value}
</style>
</head>
<body>
${htmlEditor.value}
<script>
${jsEditor.value}
</script>
</body>
</html>`;
    /************************************************/
    let blob = new Blob([fullCode], {type : 'text/html'});
    /************************************************/
    previewWebview.src = window.URL.createObjectURL(blob);
    /************************************************/
    previewTab.click();
  }
  /************************************************/
  function fullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      /************************************************/
      return;
    }
    /************************************************/
    document.body.requestFullscreen();
  }
  /************************************************/
  load()
  .then(() => { init(); })
  .then(() => { runCode(); });
});