"use client";

import CommentCards from "@/components/CommentCards";
import data from "@/app/data.json";
import ReplyBox from "@/components/ReplyBox";
import { useState } from "react";
import { Modal } from "antd";

export default function Home() {
  const [showReplyArea, setShowReplyArea] = useState<number>();
  const [deletePostId, setPostId] = useState<number>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleReplyButton = (id: number) => {
    setShowReplyArea(id);
  };

  const deleteComment = (id: number) => {
    setPostId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className=" max-w-[1400px]">
      <div className="px-14 py-10">
        <div className="flex flex-col items-center gap-y-5">
          {data.comments.map((comment) => (
            <div key={comment.id}>
              <CommentCards
                id={comment.id}
                numberOfLikes={comment.score}
                userImage={comment.user.image.png}
                userName={comment.user.username}
                createdAt={comment.createdAt}
                comment={comment.content}
                handleReplyButton={() => handleReplyButton(comment.id)}
                handleDelete={() => deleteComment(comment.id)}
              />

              {comment.id === showReplyArea && (
                <ReplyBox replyingTo={comment.user.username} />
              )}

              {comment.replies.length ? (
                <div className="flex gap-12 pl-12 my-8">
                  <div className="border-l-2 border-gray-300 "></div>

                  <div className="flex flex-col gap-y-5">
                    {comment.replies.map((replies) => (
                      <div key={replies.id}>
                        <CommentCards
                          id={replies.id}
                          numberOfLikes={replies.score}
                          userImage={replies.user.image.png}
                          userName={replies.user.username}
                          createdAt={replies.createdAt}
                          comment={replies.content}
                          replyingTo={replies.replyingTo}
                          replies={true}
                          isAuthorReply={
                            replies.user.username == data.currentUser.username
                          }
                          handleReplyButton={() =>
                            handleReplyButton(replies.id)
                          }
                          handleDelete={() => deleteComment(replies.id)}
                        />
                        {replies.id === showReplyArea && (
                          <ReplyBox replyingTo={replies.user.username} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 ">
        <ReplyBox replyingTo="" />
      </div>

      <Modal
        open={showDeleteModal}
        footer={null}
        centered={true}
        onCancel={() => setShowDeleteModal(false)}
        closeIcon={false}
        className="deleteModal"
      >
        <div className="flex flex-col gap-y-4">
          <h3 className="text-darkBlue font-bold text-2xl">Delete Comment</h3>
          <p className="text-grayishBlue">
            Are you sure you want to delete this comment? This will remove the
            comment and can&apos;t be undone.
          </p>
          <div className="flex gap-5">
            <button className="py-3 px-8 text-white rounded-lg bg-grayishBlue">
              NO, CANCEL
            </button>
            <button className="py-3 px-8 text-white rounded-lg bg-softRed">
              YES, DELETE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
