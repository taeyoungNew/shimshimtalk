import PostLikes from "../database/models/postlikes";
import { PostLikeCancelDto } from "../dtos/postLikeDto";
import {
  PostLikeEntity,
  PostLikeCancelEntity,
  PostLikeCntEntity,
} from "../entity/postLikeEntity";
/**
 * 게시물좋아요 리포지토리
 *
 */
class PostLikeRepository {
  // 해당게시물 좋아요
  public postLike = async (params: PostLikeEntity) => {
    await PostLikes.create({
      userId: params.userId,
      postId: params.postId,
    });
  };
  // 해당게시물 좋아요 취소
  public postLikeCancel = async (params: PostLikeCancelEntity) => {
    await PostLikes.destroy({
      where: {
        userId: params.userId,
        postId: params.postId,
      },
    });
  };
  // 자신의 게시물들이 받은 좋아요 총 갯수
  public postLikeCnt = async (params: PostLikeCntEntity) => {
    return PostLikes.findAll({
      attributes: [],
      where: {
        userId: params.userId,
      },
    });
  };

  public existPostLike = async (params: PostLikeEntity) => {
    return PostLikes.findOne({
      where: {
        userId: params.userId,
        postId: params.postId,
      },
    });
  };
}

export default PostLikeRepository;
