const percent = /%/g;
const pixel = /px/g;

export default {
  bind(element: HTMLElement) {
    const handleElement = element.querySelector('.el-dialog__header') as HTMLElement;
    const selectorParent = element.querySelector('.el-dialog') as HTMLElement;

    handleElement.style.cssText += 'cursor: move;';
    selectorParent.style.cssText += 'margin-top: 11.5vh; top: 0;';

    handleElement.onmousedown = (event: MouseEvent) => {
      const bodyClientWidth = document.body.clientWidth;
      const bodyClientHeight = document.body.clientHeight;

      const displayX = event.clientX - handleElement.offsetLeft;
      const selectorParentWidth = selectorParent.offsetWidth;
      const minDragParentLeft = selectorParent.offsetLeft;
      const maxDragParentLeft = bodyClientWidth - minDragParentLeft - selectorParentWidth;

      const displayY = event.clientY - handleElement.offsetTop;
      const selectorParentHeight =
        bodyClientHeight > selectorParent.offsetHeight ? selectorParent.offsetHeight : bodyClientHeight;
      const minDragParentTop = selectorParent.offsetTop;
      const maxDragParentTop = bodyClientHeight - selectorParent.offsetTop - selectorParentHeight;

      let parentStyleLeft = 0;
      let parentStyleTop = 0;
      const { left, top } = getComputedStyle(selectorParent, null);

      if (left.includes('%')) {
        parentStyleLeft = +bodyClientWidth * (+left.replace(percent, '') / 100);
        parentStyleTop = +bodyClientHeight * (+top.replace(percent, '') / 100);
      } else {
        parentStyleLeft = +left.replace(pixel, '');
        parentStyleTop = +top.replace(pixel, '');
      }

      document.onselectstart = () => false;

      document.onmousemove = (docEvent: MouseEvent) => {
        let computedLeft = docEvent.clientX - displayX;
        let computedTop = docEvent.clientY - displayY;

        if (-computedLeft > minDragParentLeft) {
          computedLeft = -minDragParentLeft;
        }

        if (computedLeft > maxDragParentLeft) {
          computedLeft = maxDragParentLeft;
        }

        if (-computedTop > minDragParentTop) {
          computedTop = -minDragParentTop;
        }

        if (computedTop > maxDragParentTop) {
          computedTop = maxDragParentTop;
        }

        selectorParent.style.cssText += `
          left: ${computedLeft + parentStyleLeft}px;
          top: ${computedTop + parentStyleTop}px;
        `;
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        document.onselectstart = null;
      };
    };
  },
};
