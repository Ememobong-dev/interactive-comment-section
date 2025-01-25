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
          </div>
        ))}
      </div>
    
    </div>
  );
}
