Here is the example `updateVirtualBackgroundList` sometime does not really work perfectly at `v2.16.0`

Demonstration:
https://drive.google.com/file/d/1j-LgExcxVSuCyzp6mZS3U4m987ZqNaNp/view?usp=sharing

<pre>
useEffect(() => {
  (async function () {
    if (!zoomClient) return;

    if (isEmptyVirtualBackground && zoomClient.isSupportVirtualBackground()) {
      setTimeout(() => {
        zoomClient.updateVirtualBackgroundList([]);
      });
    }
  })();
}, [zoomClient, isEmptyVirtualBackground]);

useEffect(() => {
  const mutationObserver = new MutationObserver(function() {
    document.querySelectorAll('#suspension-view-tabpanel-background > .zmwebsdk-MuiBox-root:nth-child(1) img[class^="zmwebsdk"]').forEach((el, index) => {
      if(index !== 0) (el as HTMLElement).style.display = 'none'
  })
  })

  mutationObserver.observe(document.querySelector('body') as HTMLElement, {
    subtree: true,
    childList: true,
    attributes: true
  })

  return () => {
    mutationObserver.disconnect()
  }
}, []);
</pre>