import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../../slices/counterSlice";

const Counter = () => {
  // ✅ Ensure RootState is correctly used in useSelector
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
};

export default Counter;
