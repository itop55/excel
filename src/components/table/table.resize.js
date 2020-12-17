import {$} from "@core/dom";

export function resizeHandler($root, event) {
  let delta, value;
  const resizeElem = event?.target?.dataset?.resize;
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCords()
  const sideProp = resizeElem === 'col' ? 'bottom' : 'right'

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  })


  document.onmousemove = e => {
    if (resizeElem === 'col') {
      delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({right: -delta + 'px'})
    } else {
      delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({bottom: -delta + 'px'})
    }

  }

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (resizeElem === 'col') {
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => $(el).css({width: `${value}px`}))

      $parent.css({width: `${value}px`})
    } else {
      $parent.css({height: value + 'px'})
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}