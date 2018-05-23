/**
 * Created by TY-xie on 2018/5/22.
 */
export function getParentByName(com, name) {
  if (com.$options._componentTag === name) return com
  let target = null
  let parent = com.$parent
  while (parent) {
	if (parent.$options._componentTag === name) {
	  target = parent
	  parent = null
	} else {
	  parent = parent.$parent
	}
  }
  return target
}