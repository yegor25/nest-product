import { ConfirmationData } from "./confirmationData";
import { SecurityDevices } from "../../securityDevices/securityDevices.entity";
import { Tokens } from "../../tokens/token.entity";
import { Blog } from "../../blogs/blog.entity";
import { Comments } from "../../comments/comment.entity";
import { PostLikes } from "../../postLikes/postLike.entity";
import { Player } from "src/quiz/entities/player.entity";
export declare class Users {
    id: string;
    email: string;
    login: string;
    createdAt: string;
    passwordSalt: string;
    passwordHash: string;
    isActiveAccount: boolean;
    confirmationData: ConfirmationData;
    securityDevices: SecurityDevices[];
    tokens: Tokens[];
    blogs: Blog[];
    comments: Comments[];
    postLikes: PostLikes[];
    players: Player[];
}
