
export interface UserInterface {
    image: { png: string; webp: string; }; 
    username: string; 
}

export interface CommentInterface {
    id: number; 
    content: string; 
    createdAt: string; 
    score: number;
    user: UserInterface;
    replies: {
        id: number; 
        content: string; 
        createdAt: string; 
        score: number;
        replyingTo: string;
        user: UserInterface;
    }[]
}

export interface CommentDataInterface {
    currentUser: UserInterface;
    comments: CommentInterface[];
}