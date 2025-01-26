"use client";

import CommentCards from "@/components/CommentCards";
import data from "@/app/data.json";
import ReplyBox from "@/components/ReplyBox";
import { useState } from "react";

export default function Home() {
  const [showReplyArea, setShowReplyArea] = useState<number>();

  const handleReplyButton = (id: number) => {
    setShowReplyArea(id);
  };

  return (
    <div className=" max-w-[1400px]">
      <div className="px-14 py-10">
        <div className="flex flex-col items-center gap-y-5">
          {data.comments.map((comment) => (
            <div key={comment.id}>
              <CommentCards
                numberOfLikes={comment.score}
                userImage={comment.user.image.png}
                userName={comment.user.username}
                createdAt={comment.createdAt}
                comment={comment.content}
                handleReplyButton={() => handleReplyButton(comment.id)}
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
    </div>
  );
}
