import { createReducer } from "@reduxjs/toolkit";
import { Post } from "../../types/blog.type";
import { initalPostList } from "../../constants/blog";

interface BlogState {
    postList: Post[];
}
const initalState: BlogState = {
    //khởi tạo state
    postList: initalPostList,
};
// Hàm builder callback dùng để xử lý action và cập nhật state
const blogReducer = createReducer(initalState, (builder) => {});

export default blogReducer;
