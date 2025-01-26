"use client";

import Image from "next/image";
import React, { useState } from "react";
import plusIcon from "../../public/images/icon-plus.svg";
import minusIcon from "../../public/images/icon-minus.svg";
import replyIcon from "../../public/images/icon-reply.svg";
import deleteIcon from "../../public/images/icon-delete.svg";
import editIcon from "../../public/images/icon-edit.svg";
// import ReplyBox from "./ReplyBox";

type commentType = {
  numberOfLikes: number;
  userImage: string;
  userName: string;
  createdAt: string;
  comment: string;
  replies?: boolean;
  replyingTo?: string;
  isAuthorReply?: boolean;
  handleReplyButton: VoidFunction
};

const CommentCards = ({
  numberOfLikes,
  userImage,
  userName,
  createdAt,
  comment,
  replies,
  replyingTo,
  isAuthorReply,
  handleReplyButton,
}: commentType) => {
  const [likeNum, setLikeNum] = useState(numberOfLikes);


  const handleUpVote = () => {
    setLikeNum((prev) => prev + 1);
  };

  const handleDownVote = () => {
    setLikeNum((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };


  return (
    <>
      <div className="bg-white w-full p-8 rounded-lg">
        <div className="flex items-center gap-8">
          <div className=" flex flex-col bg-lightGray rounded-lg py-3 px-3 items-center gap-3">
            <span className="cursor-pointer" onClick={handleUpVote}>
              <Image src={plusIcon} alt="plus icon" />
            </span>
            <span>
              <p className="text-moderateBlue text-base font-bold">
                {" "}
                {likeNum}{" "}
              </p>
            </span>
            <span className="cursor-pointer" onClick={handleDownVote}>
              <Image src={minusIcon} alt="minus icon" />
            </span>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span>
                  <Image
                    src={userImage}
                    width={38}
                    height={38}
                    alt="user image"
                  />
                </span>

                <span className="text-darkBlue font-bold">
                  <p>{userName}</p>
                </span>

                {isAuthorReply && (
                  <span className="bg-moderateBlue text-white rounded-sm px-3">
                    you
                  </span>
                )}

                <span className="text-grayishBlue">
                  <p>{createdAt}</p>
                </span>
              </div>
              {!isAuthorReply ? (
                <div
                  className="flex gap-2 cursor-pointer hover:opacity-50 items-center"
                  onClick={handleReplyButton}
                >
                  <span>
                    <Image src={replyIcon} alt="reply icon" />
                  </span>
                  <span className="text-moderateBlue font-bold">
                    <p>Reply</p>
                  </span>
                </div>
              ) : (
                <div className="flex gap-8 cursor-pointer items-center">
                  <div className="flex items-center gap-2">
                    <span>
                      <Image src={deleteIcon} alt="reply icon" />
                    </span>
                    <span className="text-softRed font-bold">
                      <p>Delete</p>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      <Image src={editIcon} alt="reply icon" />
                    </span>
                    <span className="text-moderateBlue font-bold">
                      <p>Edit</p>
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div>
              <span className="text-grayishBlue">
                {replies && (
                  <span className="text-moderateBlue font-bold">
                    {" "}
                    @{replyingTo}{" "}
                  </span>
                )}
                {comment}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* {showReplyArea && <ReplyBox replyingTo={userName}  />} */}
    </>
  );
};

export default CommentCards;
