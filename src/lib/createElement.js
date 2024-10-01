// TODO: createElement 함수 구현
// 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

import {createVNode} from "./createVNode.js";


export function createElement(vNode) {
  // 여기에 구현하세요
  // console.dir(vNode)
  const {type, props, children} = vNode
  console.dir(type)
  console.dir(props)
  console.dir(children)

  console.log('--------------------------------------')


  if (!vNode) {
    return document.createTextNode('');
  }


  if (typeof vNode.type === "function") {
    const { type, props, children } = vNode.type(vNode.props || {});
    return createElement(createVNode(type, props, children));
  }

  const element = document.createElement(vNode.type);
  applyProps(element, vNode.props)
  return document.createTextNode('hello');
}

function applyProps(element, props) {
  if (!!props) {
    for (const [key,value] of Object.entries(props)) {
      console.log(key)
      console.log(value)

      if (key.startsWith('on') && typeof value === 'function') {
        // prop이 handler일 경우 이벤트 등록
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === 'className') {
        // prop이 class명일 경우 class 등록
        element.className = value;
      } else {
        element.setAttribute(key, value);
      }
    }
  }
}