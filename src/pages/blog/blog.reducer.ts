import { createAction, createReducer, current, nanoid } from "@reduxjs/toolkit";
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

export const addPost = createAction(
    "blog/addPost",
    //Prepare callback để tinh chỉnh payload
    /**Mặc định bạn truyền vào gì thì payload sẽ là cái đó,
     * trong trường hợp bạn muốn truyền vào x nhưng payload là x + 2 thì
     * bạn có thể dùng prepare function callback */
    function (post: Omit<Post, "id">) {
        return {
            payload: {
                ...post,
                id: nanoid(),
            },
        };
    }
);
export const deletePost = createAction<string>("blog/deletePost");
export const startEditingPost = createAction<string>("blog/startEditingPost");
export const cancelEditingPost = createAction("blog/cancelEditingPost");
export const finishEditingPost = createAction<Post>("blog/finishEditingPost");
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
        })
        .addCase(cancelEditingPost, (state) => {
            state.editingPost = null;
        })
        .addCase(finishEditingPost, (state, action) => {
            const postId = action.payload.id;
            state.postList.some((post, index) => {
                if (post.id === postId) {
                    state.postList[index] = action.payload;
                    return true; //Dừng lại ngay nếu đã cập nhật
                }
                return false;
            });
            state.editingPost = null;
        })
        .addMatcher(
            (action) => action.type.includes("cancel"), //nếu trả về true thì hàm sau sẽ chạy
            (state) => {
                console.log(current(state));
            }
        )
        // nếu muốn thêm default case khi không match case nào cả
        // thì dùng addDefaultCase
        .addDefaultCase((state) => {
            console.log(state);
        });
});

export default blogReducer;
