import { UserInitials } from "./UserInitials";
import { Button } from "./Button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentsData, commentsSchema } from "../schemas/commentsShema";
import { CommentsAuth } from "../hooks/commentsHook";
import { useParams } from "react-router-dom";

interface NewCommentsProps {
  name: string | undefined;
  color: string | undefined;
}

export const NewComment = ({
  name = "placeholher",
  color = "teste",
}: NewCommentsProps) => {
  const { id } = useParams();

  const { newCommentsSubmit, setGetId, button, setButton } = CommentsAuth();

  const { register, handleSubmit, formState, reset } = useForm<CommentsData>({
    resolver: zodResolver(commentsSchema),
  });
  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");

    if (!token) {
      setButton(true);
    } else {
      setButton(false);
    }
    setGetId(Number(id));
  }, []);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <div className="sm:w-[59%] h-96 sm:h-[18rem] rounded bg-grey-10 mt-10 sm:mt-8 mb-8 sm:mb-16 py-9 px-6 sm:p-11 flex flex-col gap-3.5">
      <div className="flex items-center gap-2 w-max">
        <UserInitials name={name} color={color} />
        <p className="text-body-2-500">{name}</p>
      </div>
      <div className="flex flex-col gap-[70px] sm:gap-3.5 w-full h-max sm:h-full">
        <form
          className="sm:relative w-full h-32 gap-8"
          onSubmit={handleSubmit(newCommentsSubmit)}>
          <textarea
            placeholder="Deixe um comentário..."
            cols={75}
            rows={5}
            className="resize-none rounded border-grey-7 border-2 focus:outline-0 w-full h-full p-2.5 sm:pr-[8rem] text-grey-2 no-scrollbar"
            {...register("content")}></textarea>
          <Button
            btnSize="btn-medium"
            btnColor={button ? "btn-brand-disable" : "btn-brand-1"}
            attributes="mt-[10px] sm:absolute sm:bottom-3 sm:right-3">
            Comentar
          </Button>
        </form>
      </div>
    </div>
  );
};
