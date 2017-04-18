//ios下创建iframe
export default (src) => {
  let iframeEl = document.createElement('iframe');
  iframeEl.src = src;
  iframeEl.style.display = 'none';
  document.body.appendChild(iframeEl);
  setTimeout(() => {
    document.body.removeChild(iframeEl);
  }, 2000);
}
