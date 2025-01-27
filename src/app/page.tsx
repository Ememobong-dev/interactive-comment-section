"use client";

import CommentCards from "@/components/CommentCards";
import data from "@/app/data.json";
import ReplyBox from "@/components/ReplyBox";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { CommentDataInterface } from "@/interface";
import moment from "moment";

export default function Home() {
  const [showReplyArea, setShowReplyArea] = useState<number>();
  const [deletePostId, setDeletePostId] = useState<number>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataClone, setDataClone] = useState<CommentDataInterface>( JSON.parse(localStorage.getItem("comment-data") || JSON.stringify(data)));

  const [sendReplyInputChange, setSendReplyInputChange] = useState<string>("");
  const [replyInputChange, setReplyInputChange] = useState<string>("");
  const [updateCommentInputChange, setUpdateCommentInputChange] = useState<string>("");
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);



  const handleViewReplyArea = (id: number) => {
    setShowReplyArea(id);
  };  

  const handleSendReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSendReplyInputChange(e.target.value)
  }

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyInputChange(e.target.value)
  }

  const handleUpdateCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateCommentInputChange(e.target.value);
  }

  const sendData = {
    id: Math.floor(Math.random() * (30 - 3) + 3) ,
    createdAt: moment().startOf('hour').fromNow(),
    score: 0,
    user: dataClone.currentUser,
    replies: []
  }

  

  // SEND COMMENT
  const handleSendComment = () => {
    // I need count, img, username, date, comment
    const newCommentObj = {...dataClone};
    newCommentObj.comments.push({...sendData, content: sendReplyInputChange});
    setDataClone( {...newCommentObj} )
    setSendReplyInputChange("");
  }


 // REPLY COMMENT
  const handleReplyComment = (id: number) => {
    const newReplyObj = {...dataClone};
    const findSelectedCommentID = newReplyObj.comments.find( (item) => id === item.id);

    if(findSelectedCommentID) {
      findSelectedCommentID.replies.push({...sendData, replyingTo: findSelectedCommentID.user.username, content: replyInputChange})
      const replyObj = {...newReplyObj, findSelectedCommentID};
      setDataClone({...replyObj});
      setShowReplyArea(-1);
      setReplyInputChange("");
    }
  }


  // DELETE COMMENT
  const handleShowDeleteModal = (id: number) => {
    setDeletePostId(id);
    setShowDeleteModal(true);
    console.log(deletePostId);
    console.log(dataClone);
  };

  const handleDeleteComment = () => {
    const newObj = {...dataClone};
    const filteredNewObj = newObj.comments.filter( (item) => item.id !== deletePostId);
    const filteredData = {...newObj, comments: [...filteredNewObj]}
    setDataClone({...filteredData})
    setShowDeleteModal(false)
  }



  // UPDATE COMMENT

  console.log("I am Data Clone", dataClone) 

  const handleUpdateButton = (id: number) => {
    const newObj = {...dataClone};
    const newContentObj = newObj.comments
    const findSelectedCommentID = newContentObj.find( (item) => item.id === id);

    if(findSelectedCommentID) {
      findSelectedCommentID.content = updateCommentInputChange
      setUpdateCommentInputChange("");
      console.log("I am Data Clone", dataClone) 
    }
    setUpdateBtnClicked(true)
  }

    useEffect(() => {
      localStorage.setItem("comment-data", JSON.stringify(dataClone))
    }, [dataClone])
  







  return (
    <div className=" max-w-[1400px]">
      <div className="px-14 py-10">
        <div className="flex flex-col items-center gap-y-5">
          {dataClone.comments.map((comment) => (
            <div key={comment.id}>
              <CommentCards
                id={comment.id}
                numberOfLikes={comment.score}
                userImage={comment.user.image.png}
                userName={comment.user.username}
                createdAt={comment.createdAt}
                comment={comment.content}
                handleViewReplyArea={() => handleViewReplyArea(comment.id)}
                handleDelete={() => handleShowDeleteModal(comment.id)}
                isAuthorReply={
                  comment.user.username == dataClone.currentUser.username
                }
                handleUpdate={() => handleUpdateButton(comment.id)}
                handleUpdateCommentChange={handleUpdateCommentChange}
                updateCommentValue={updateCommentInputChange}
                updateBtnCLicked = {updateBtnClicked}

              />

              {comment.id === showReplyArea && (
                <ReplyBox 
                handleViewReplyArea ={() => handleReplyComment (comment.id)} 
                replyingTo={comment.user.username} 
                handleSendReplyChange={handleSendReplyChange}
                handleReplyChange={handleReplyChange}
                sendReplyInputChange={sendReplyInputChange}
                replyInputChange={replyInputChange}
                />
                
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
                            replies.user.username == dataClone.currentUser.username
                          }
                          handleViewReplyArea={() =>
                            handleViewReplyArea(replies.id)
                          }
                          handleDelete={() => handleShowDeleteModal(replies.id)}

                          handleUpdate={() => handleUpdateButton(comment.id)}
                          handleUpdateCommentChange={handleUpdateCommentChange}
                          updateCommentValue={updateCommentInputChange}
                          updateBtnCLicked = {updateBtnClicked}


                        />
                        {replies.id === showReplyArea && (
                          <ReplyBox 
                          handleViewReplyArea ={() => handleReplyComment (replies.id)} 
                          replyingTo={replies.user.username} 
                          handleSendReplyChange={handleSendReplyChange}
                          handleReplyChange={handleReplyChange}
                          sendReplyInputChange={sendReplyInputChange}
                          replyInputChange={replyInputChange}
                          />
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
        <ReplyBox 
        handleSendButton ={handleSendComment} 
        replyingTo=""
        handleSendReplyChange={handleSendReplyChange} 
        handleReplyChange={handleReplyChange}        
        sendReplyInputChange={sendReplyInputChange}   
        replyInputChange={replyInputChange}
         />
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
          <h3 className="text-darkBlue font-rubikLight font-bold text-2xl">Delete Comment</h3>
          <p className="text-grayishBlue text-base font-rubikRegular">
            Are you sure you want to delete this comment? This will remove the
            comment and can&apos;t be undone.
          </p>
          <div className="flex gap-5 font-rubikLight font-bold ">
            <button className="py-3 px-8 text-white  rounded-lg bg-grayishBlue" onClick={() => setShowDeleteModal(false)}>
              NO, CANCEL
            </button>
            <button className="py-3 px-8 text-white rounded-lg bg-softRed" onClick={handleDeleteComment}>
              YES, DELETE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
