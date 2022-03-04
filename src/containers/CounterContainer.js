import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { decrease, increase, setDiff } from "../modules/counter";

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook
  // state 값은 store.getState()와 동일
  const { number, diff } = useSelector(
    (state) => ({
      number: state.counterReducer.number,
      diff: state.counterReducer.diff,
    }),
    shallowEqual
  );

  //useDispatch는 리덕스 스토어의 dispatch를 사용하게 하는 Hook
  const dispatch = useDispatch();

  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = (diff) => dispatch(setDiff(diff));

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;

/* 

const { number, diff } = useSelector(state => ({
  number: state.counter.number,
  diff: state.counter.diff
}));

주석의 CounterContainer에서는 사실상 useSelector Hook을 통해 매번 렌더링 될 때마다 새로운 객체 { number, diff}를 만드는 것이기 때문에 상태 변화를 확인 할 수 없어 렌더링 낭비.
최적화 하기 위한 2가지 방법

1. useSelector 여러번 사용
  const number = useSelector(state => state.counter.number);
  const diff = useSelector(state => state.counter.diff);

  이리 하면 해당 값들이 하나라도 바뀔 때에만 컴포넌트 리렌더링 함.

2. react-redux의 shallowEqual 함수를 useSelector의 두번째 인자로 전달  (본 파일에 적용시켜 뒀음)
  useSelector의 두번째 기본 파라미터는 equalityFn임. equalityFn은 이전값과 다음값을 비교해서 true가 나오면 리렌더링 x, false가 나오면 리렌더링
  shallowEqual은 react-redux 내장 함수. 객체 안에 가장 겉에 있는 값들 모두 비교.

  가장 겉에 있는 값이란 ex)

  const object = {
  a: {
    x: 3,
    y: 2,
    z: 1
  },
  b: 1,
  c: [{ id: 1 }]
  }

  가장 겉에 있는 값 = object.a, object.b, object.c shallowEqual 에서는 해당 값들만 비교하고, object.a.x나 object.c[0] 값은 비교하지 않음.

*/
