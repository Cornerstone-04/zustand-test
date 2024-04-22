import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Modal({ action, typing, text, close, errorMessage }) {
  const [placeholder, setPlaceholder] = useState(false);

  useEffect(() => {
    setPlaceholder(errorMessage ? errorMessage : "Enter a task");
  }, [errorMessage]);

  return (
    <div className="fixed bg-[rgba(0,0,0,0.3)] w-full h-full top-0 left-0 backdrop-blur">
      <form
        onSubmit={action}
        className="bg-white absolute z-10 p-4 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 min-h-[6rem] w-[20rem] flex flex-col justify-center items-start rounded gap-2"
      >
        <textarea
          name="todo"
          value={text}
          className={
            errorMessage
              ? "py-1 px-3 border-2 border-red-500 placeholder:text-red-500 placeholder:font-bold transition-all ease-linear"
              : "py-1 px-3 border-2 border-black text-black transition-all ease-linear"
          }
          onChange={typing}
          placeholder={placeholder}
          id=""
          cols="30"
          rows="5"
        ></textarea>
        <button className="bg-green-500 text-white text-sm font-bold py-1 px-3">
          Submit
        </button>
        <FaTimes
          className="text-black font-lg absolute top-1 right-1 cursor-pointer"
          onClick={close}
        />
      </form>
    </div>
  );
}
