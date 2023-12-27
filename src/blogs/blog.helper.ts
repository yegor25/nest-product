import { Blog, blogItemsResponseType } from "./blog.schema";



export const blogHelper = {
    getViewBlog (blog: Blog):blogItemsResponseType{
        const res:blogItemsResponseType = {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
        return res
    }
}