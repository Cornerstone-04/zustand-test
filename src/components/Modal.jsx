import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

export default function Modal({ action, typing, text, close }) {
  return (
    <div className="fixed bg-[rgba(0,0,0,0.3)] w-full h-full top-0 left-0">
      <form
        onSubmit={action}
        className="bg-white absolute z-10 p-4 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 h-[6rem] w-[20rem] flex justify-center items-center rounded gap-2"
      >
        <input
          type="text"
          onChange={typing}
          value={text}
          className="py-1 px-3 border border-black text-black"
        />
        <button
          //   onClick={action}
          className="bg-gray-light text-black py-1 px-3 font-medium"
        >
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

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  typing: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
