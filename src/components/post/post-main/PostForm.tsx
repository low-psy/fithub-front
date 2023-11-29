import React from 'react';
import { Form, useActionData } from 'react-router-dom';
import PostInput from './PostInput';
import InputComponent from '../../utilities/input/InputComponent';
import TextareaComponent from '../../utilities/input/TextareaComponent';
import SubmitButton from '../../utilities/SubmitButton';
import ErrorMessage from '../../utilities/ErrorMessage';

const PostForm = () => {
  const errors = useActionData() as { message: string };

  return (
    <Form method="post" action="/post" className="space-y-8 pb-6">
      {errors ? (
        <ErrorMessage className="rounded-md text-lg font-bold">
          {errors.message}
        </ErrorMessage>
      ) : null}
      <div>
        <PostInput spanText="write title" htmlFor="title" titleText="제목">
          <InputComponent
            name="title"
            placeholder="제목을 입력해 주세요"
            type="text"
            id="title"
          />
        </PostInput>
      </div>
      <div>
        <PostInput spanText="write content" htmlFor="content" titleText="내용">
          <TextareaComponent
            placeholder="내용을 입력해 주세요"
            name="content"
            className="h-28"
            id="content"
          />
        </PostInput>
      </div>
      <div>
        <PostInput
          spanText="bring image"
          htmlFor="image"
          titleText="이미지 선택"
        >
          <InputComponent
            name="image"
            type="file"
            accept=".jpeg, .png"
            id="image"
          />
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
            name="keyword"
            type="text"
            id="keyword"
          />
        </PostInput>
      </div>
      <SubmitButton className="-mt-4 w-2/3 rounded-full py-5 text-2xl font-bold text-main">
        제출하기
      </SubmitButton>
    </Form>
  );
};

export default PostForm;
