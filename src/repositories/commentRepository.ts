import {
  CreateCommentEntity,
  ModifyCommentEntity,
  GetCommentEntity,
  GetCommentsEntity,
  DeleteCommentEntity,
} from "../entity/commentEntity";
import Comments from "../database/models/comments";
import { Op } from "sequelize";
import logger from "../config/logger";
class CommentRepository {
  // 댓글작성
  public createComment = async (commentPayment: CreateCommentEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "CommentRepository",
      functionName: "createComment",
    });
    return await Comments.create({
      userId: commentPayment.userId,
      postId: commentPayment.postId,
      content: commentPayment.content,
      userNickname: commentPayment.userNickname,
    });
  };
  // 댓글수정
  public modifyComment = async (commentPayment: ModifyCommentEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "CommentRepository",
      functionName: "modifyComment",
    });

    await Comments.update(
      {
        content: commentPayment.comment,
      },
      {
        where: {
          id: commentPayment.commentId,
        },
      }
    );
  };
  // 해당댓글조회
  public getComment = async (commentPayment: GetCommentEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "CommentRepository",
      functionName: "getComment",
    });
    return await Comments.findOne({
      where: {
        id: commentPayment.commentId,
      },
    });
  };
  // 해당 게시물의 댓글들을 조회
  // lastId방식으로 10개씩 가져오자
  public getComments = async (commentPayment: GetCommentsEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "CommentRepository",
      functionName: "getComments",
    });
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
    logger.info("", {
      layer: "Repository",
      className: "CommentRepository",
      functionName: "deleteComment",
    });
    await Comments.destroy({
      where: { id: commentPayment.commentId, userId: commentPayment.userId },
    });
  };

  public existComment = async (params: GetCommentEntity) => {
    let id;
    if ("object" == typeof params) {
      id = params.commentId;
    } else {
      id = params;
    }

    logger.info("", {
      layer: "Repository",
      className: "CommentRepository",
      functionName: "existComment",
    });

    return await Comments.findOne({
      where: {
        id,
      },
    });
  };
}

export default CommentRepository;
