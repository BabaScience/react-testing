import OrderStatusSelector from "../components/OrderStatusSelector";

import { useState } from "react";


const PlaygroundPage = () => {
  const [text, setText] = useState<string>("None to display");

  const onChange = (text: string) => {
    setText(text);
  }


  return (
    <>
      <OrderStatusSelector onChange={onChange} />
      <p>{text}</p>
    </>
  )
};

export default PlaygroundPage;
