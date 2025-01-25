import CommentCards from "@/components/CommentCards";
import data from "@/app/data.json";

export default function Home() {

  return (
    <div className="px-14 py-10 max-w-[1400px]">
      <div className="flex flex-col items-center gap-y-5">
        {data.comments.map((comment) => (
          <div key={comment.id}>
            <CommentCards
              numberOfLikes={comment.score}
              userImage={comment.user.image.png}
              userName={comment.user.username}
              createdAt={comment.createdAt}
              comment={comment.content}
            />

            {comment.replies.length ? (
              <div className="flex gap-8 pl-8 my-8">
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
                        isAuthorReply={replies.user.username == data.currentUser.username}
                      />
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
  );
}
