import { PostRepository } from "./post.repository";
import { createdPostDtoType, postDtoResponseType } from "./post.schema";
export declare class PostService {
    protected postRepository: PostRepository;
    constructor(postRepository: PostRepository);
    create(dto: createdPostDtoType): Promise<postDtoResponseType>;
    delete(id: string): Promise<boolean>;
    findPostById(id: string): Promise<postDtoResponseType | null>;
}
