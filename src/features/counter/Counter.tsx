import { useSelector, useDispatch } from "react-redux";

import { increment, decrement, reset, incrementByAmount } from "./counterSlic";

import { RootState } from "../../app/store";
import { Box, Button, Container, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

function Counter() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const handleButtonIncrement = () => {
    dispatch(increment());
  };
  const handleButtonDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementAmount = (amount: number) => {
    setIncrementAmount(amount);
  };

  const addAmount = ()=>{
    dispatch(incrementByAmount(incrementAmount));
  }

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  const [incrementAmount, setIncrementAmount] = useState<number>(0);

  return (
    <Container>
      <Text>{count}</Text>
      <Box>
        <Button aria-label="Increment Value" onClick={handleButtonIncrement}>
          +
        </Button>
        <Button aria-label="Decrement Value" onClick={handleButtonDecrement}>
          -
        </Button>
      </Box>
      <Box>
        <Input
          type="number"
          value={incrementAmount}
          onChange={(e) => handleIncrementAmount(Number(e.target.value))}
        />
      </Box>
      <Box>
        <Button onClick={addAmount}>Add amount</Button>
        <Button onClick={resetAll}>Reset Data</Button>
      </Box>
    </Container>
  );
}

export default Counter;
