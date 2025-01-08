import {
  CreateCommentEntity,
  ModifyCommentEntity,
  FindCommentEntity,
  FindCommentsEntity,
  DeleteCommentEntity,
} from "../entity/commentsEntity";
import Comments from "../database/models/comments";
import { Op } from "sequelize";
class CommentRepository {
  // 댓글작성
  public createComment = async (commentPayment: CreateCommentEntity) => {
    await Comments.create({
      userId: commentPayment.userId,
      postId: commentPayment.postId,
      content: commentPayment.content,
      userNickname: commentPayment.userNickname,
    });
  };
  // 댓글수정
  public modifyComment = async (commentPayment: ModifyCommentEntity) => {
    await Comments.update(
      {
        content: commentPayment.newContent,
      },
      {
        where: {
          id: commentPayment.commentId,
        },
      }
    );
  };
  // 해당댓글조회
  public getComment = async (commentPayment: FindCommentEntity) => {
    return await Comments.findOne({
      where: {
        id: commentPayment.commentId,
      },
    });
  };
  // 해당 게시물의 댓글들을 조회
  // lastId방식으로 10개씩 가져오자
  public getComments = async (commentPayment: FindCommentsEntity) => {
    let where = {};

    if (commentPayment.commentLastId != null) {
      where = {
        id: {
          [Op.lt]: commentPayment.commentLastId,
        },
        postId: commentPayment.postId,
      };
    } else {
      where = {
        postId: commentPayment.postId,
      };
    }

    return await Comments.findAll({
      attributes: ["id", "nickname", "content", "createdAt"],
      limit: 10,
      order: [["createdAt", "desc"]],
      where,
    });
  };
  // 게시물삭제
  public deleteComment = async (commentPayment: DeleteCommentEntity) => {
    await Comments.destroy({
      where: { id: commentPayment.commentId, userId: commentPayment.userId },
    });
  };
}

export default CommentRepository;
