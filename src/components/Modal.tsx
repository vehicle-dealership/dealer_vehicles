import { createPortal } from "react-dom";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  toggleModal: () => void;
  blockClosing?: boolean;
  children: ReactNode;
  title: ReactNode;
  attributes?: string;
  widthFull?: boolean;
}

export const Modal = ({
  toggleModal,
  children,
  blockClosing,
  title,
  attributes,
  widthFull = false,
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      if (!event.target) {
        return;
      }

      if (!ref.current.contains(event.target as HTMLElement)) {
        toggleModal();
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [toggleModal]);

  return createPortal(
    <div className="fixed top-0 bg-black/50 w-screen h-screen flex justify-center items-center z-[4]">
      <div
        ref={blockClosing ? null : ref}
        className={`${attributes} ${
          !widthFull && "width-modal"
        } bg-grey-10 px-6 py-5 shadow-lg rounded-lg sm:max-h-[97vh] animate-modal duration-300`}
      >
        <div className="flex-col flex gap-8 ">
          <div className="flex justify-between items-center">
            <h2 className="font-lexend font-medium text-base text-grey-1">
              {title}
            </h2>
            <button onClick={toggleModal} className="btn-close-modal">
              X
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};
