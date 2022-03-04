import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todos from "../components/Todos";
import { addTodo, toggleTodo } from "../modules/todos";

function TodosContainer() {
  // useSelector 에서 꼭 객체 전부를 반환 받을 필요 없음. (메모리 낭비)
  const todos = useSelector((state) => state.todosReducer);
  const dispatch = useDispatch();

  const onCreate = (text) => dispatch(addTodo(text));
  const onToggle = useCallback((id) => dispatch(toggleTodo(id)), [dispatch]); // 최적화를 위해 useCallback 사용

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default TodosContainer;

/*
리덕스 useSelector 최적화

useSelector를 사용해서 리덕스 스토어의 상태를 조회할 땐, 상태가 바뀌지 않으면 리렌더링 하지 않음.
Todos Container의 경우 카운터 값이 바뀔 때 todos 값엔 변화가 없으니 리렌덩 되지 않음.
 -> CounterContainer로 이동
*/
