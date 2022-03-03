import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { decrease, increase, setDiff } from "../modules/counter";

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook
  // state 값은 store.getState()와 동일
  const { number, diff } = useSelector((state) => ({
    number: state.counterReducer.number,
    diff: state.counterReducer.diff,
  }));

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
