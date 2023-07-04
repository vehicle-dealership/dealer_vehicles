import { z } from "zod";

export const commentsSchema = z.object({
  content: z.string().nonempty("O comentário não pode estar em branco"),
});

export const userSchemaResponsePartial = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  color: z.string(),
});

export const advertSchemaResponsePartial = z.object({ id: z.number() });

export const commentSchema = z.object({
  id: z.number(),
  title: z.string().max(200),
  content: z.string(),
  createdAt: z.string(),
  user: userSchemaResponsePartial,
  advert: advertSchemaResponsePartial,
});

export const commentSchemaMultiple = z.array(commentSchema);

export const editCommentSchema = z.object({
  // title: z.string().max(200),
  content: z.string(),
});

export type updateComment = z.infer<typeof editCommentSchema>;

export type CommentsData = z.infer<typeof commentsSchema>;
export type CommentData = z.infer<typeof commentSchema>;
export type tCommentResponseMultiple = z.infer<typeof commentSchemaMultiple>;
