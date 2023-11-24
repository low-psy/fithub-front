import React from 'react';
import PostInput from './PostInput';
import InputComponent from '../../utilities/input/InputComponent';
import TextareaComponent from '../../utilities/input/TextareaComponent';

const PostForm = () => {
  return (
    <form className="space-y-8">
      <div>
        <PostInput spanText="write title" htmlFor="title" titleText="제목">
          <InputComponent
            placeholder="제목을 입력해 주세요"
            name="title"
            type="text"
          />
        </PostInput>
      </div>
      <div>
        <PostInput spanText="write content" htmlFor="content" titleText="내용">
          <TextareaComponent
            placeholder="내용을 입력해 주세요"
            name="content"
            className="h-28"
          />
        </PostInput>
      </div>
      <div>
        <PostInput
          spanText="bring image"
          htmlFor="image"
          titleText="이미지 선택"
        >
          <InputComponent name="content" type="file" accept=".jpeg, .png" />
        </PostInput>
      </div>
      <div>
        <PostInput
          spanText="write keyword"
          htmlFor="keyword"
          titleText="키워드"
        >
          <InputComponent
            placeholder="키워드를 입력해 주세요"
            name="title"
            type="text"
          />
        </PostInput>
      </div>
    </form>
  );
};

export default PostForm;
