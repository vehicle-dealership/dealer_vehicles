import { useForm } from "react-hook-form";
import { updateComment, editCommentSchema } from "../../schemas/commentsShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentsAuth } from "../../hooks/commentsHook";
import { TextArea } from "../TextArea";
import { Button } from "../Button";

export const EditAndDeleteComment = () => {
  const { updateComment, userCurrentComment, deleteComment } = CommentsAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateComment>({
    resolver: zodResolver(editCommentSchema),
  });

  const commentId = userCurrentComment.id;

  return (
    <form
      onSubmit={handleSubmit((data) => {
        updateComment(data, commentId);
      })}
    >
      <TextArea
        label=""
        placeholder="Deixe um comentário..."
        cols={75}
        rows={5}
        register={register("content")}
        defaultValue={userCurrentComment.content}
        error={errors.content?.message}
      />
      <div className="flex w-full place-content-between">
        <Button
          type="button"
          btnSize="btn-big"
          btnColor="btn-negative"
          handleClick={() => deleteComment()}
          attributes="w-[48%]"
        >
          Excluir Comentário
        </Button>
        <Button
          btnSize="btn-big"
          type="submit"
          btnColor={"btn-brand-1"}
          attributes="w-[48%]"
        >
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
};
