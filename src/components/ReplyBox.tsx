import Image from "next/image";
import React from "react";
import juliusomoImg from "../../public/images/avatars/image-juliusomo.png";

const ReplyBox = ({
  replyingTo,
  handleSendButton,
  handleViewReplyArea,
  handleSendReplyChange,
  handleReplyChange,
  sendReplyInputChange,
  replyInputChange,
}: {
  replyingTo: string;
  handleSendButton?: VoidFunction;
  handleViewReplyArea?: VoidFunction;
  handleSendReplyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleReplyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  sendReplyInputChange?: string;
  replyInputChange: string;
}) => {
  return (
    <>

    
  {/* // TASK LEFT TO DO
  // 1. make onChange for reply and send separate;
  // 2. attach @username on reply box
  // 3. fix the edit layout the button sidee */}
      <div
        className={` ${
          replyingTo ? "bg-white" : "bg-lightGrayishBlue"
        } w-full p-8 my-3 rounded-lg"`}
      >
        <div className="flex justify-between">
          <span>
            <Image src={juliusomoImg} alt="user " width={48} height={48} />
          </span>
          <textarea
            className="rounded-lg w-[85%] focus:border-moderateBlue outline-0  border border-moderateBlue py-5 px-8 bg-white text-black"
            rows={3}
            name=""
            id=""
            // defaultValue={replyingTo ? `@${replyingTo} ` : ""}
            onChange={!replyingTo ? handleSendReplyChange: handleReplyChange}
            value={!replyingTo ? sendReplyInputChange: replyInputChange}
          />
          <div>
            <button
              onClick={!replyingTo ? handleSendButton : handleViewReplyArea}
              className="bg-moderateBlue hover:opacity-50 text-white  rounded-lg px-8 py-3 uppercase"
            >
              {!replyingTo ? "Send" : "Reply"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReplyBox;
