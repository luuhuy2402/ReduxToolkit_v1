import { createAction, createReducer } from "@reduxjs/toolkit";
import { Post } from "../../types/blog.type";
import { initalPostList } from "../../constants/blog";

interface BlogState {
    postList: Post[];
    editingPost: Post | null;
}
const initalState: BlogState = {
    //khởi tạo state
    postList: initalPostList,
    editingPost: null,
};

export const addPost = createAction<Post>("blog/addPost");
export const deletePost = createAction<string>("blog/deletePost");
export const startEditingPost = createAction<string>("blog/startEditingPost");
// Hàm builder callback dùng để xử lý action và cập nhật state
const blogReducer = createReducer(initalState, (builder) => {
    builder
        .addCase(addPost, (state, action) => {
            const post = action.payload;
            state.postList.push(post);
        })
        .addCase(deletePost, (state, action) => {
            const postId = action.payload;
            const foundPostIndex = state.postList.findIndex(
                (post) => post.id === postId
            );
            if (foundPostIndex !== -1) {
                state.postList.splice(foundPostIndex, 1);
            }
        })
        .addCase(startEditingPost, (state, action) => {
            const postId = action.payload;
            const foundPost =
                state.postList.find((post) => post.id === postId) || null;

            state.editingPost = foundPost;
        });
});

export default blogReducer;
