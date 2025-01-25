import Image from "next/image";
import React from "react";
import plusIcon from "../../public/images/icon-plus.svg";
import minusIcon from "../../public/images/icon-minus.svg";
import replyIcon from "../../public/images/icon-reply.svg";

type commentType = {
  numberOfLikes: number;
  userImage: string;
  userName: string;
  createdAt: string;
  comment: string;
};

const CommentCards = ({
  numberOfLikes,
  userImage,
  userName,
  createdAt,
  comment,
}: commentType) => {
  return (
    <>
      <div className="bg-white w-full p-8">
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <span>
              <Image src={plusIcon} alt="plus icon" />
            </span>
            <span>
              <p> {numberOfLikes} </p>
            </span>
            <span>
              <Image src={minusIcon} alt="minus icon" />
            </span>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                    <span>
                        <Image src={userImage} width={38} height={38}  alt="user image" />
                    </span>
                    {/* <span> */}
                        <p>{userName}</p>
                    {/* </span> */}
                    <span>
                        <p>{createdAt}</p>
                    </span>
              </div>
              <div>
                <span>
                    <Image src={replyIcon} alt="reply icon" />
                </span>
                <span>
                    <p>Reply</p>
                </span>

              </div>
            </div>
            <div>
               <p> {comment}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCards;
