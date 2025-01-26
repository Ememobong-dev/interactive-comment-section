import Image from "next/image";
import React from "react";
import juliusomoImg from "../../public/images/avatars/image-juliusomo.png";

const ReplyBox = ({replyingTo} : {replyingTo : string}) => {
  return (
    <>
      <div className="bg-white w-full p-8 my-3 rounded-lg">
        <div className="flex justify-between">
          <span>
            <Image src={juliusomoImg} alt="user " width={48} height={48} />
          </span>
          <textarea
            className="rounded-lg w-[85%] focus:border-moderateBlue outline-0  border border-moderateBlue py-5 px-8 bg-white text-grayishBlue"
            rows={3}
            name=""
            id=""
            defaultValue={`@${replyingTo}`}
          ></textarea>
          <div>
            <button className="bg-moderateBlue hover:opacity-50 text-white  rounded-lg px-8 py-3">
              Reply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReplyBox;
