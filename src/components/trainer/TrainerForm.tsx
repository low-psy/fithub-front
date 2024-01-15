import React, { useState } from 'react';
import { Form, FormMethod, useActionData } from 'react-router-dom';
import PostInput from '../post/FormText';
import InputComponent from '../post/FormInput';
import TextareaComponent from '../post/FormTextarea';
import SubmitButton from '../post/FormSubmitButton';
import ErrorMessage from '../post/FormError';
import FormSingleImage from '../post/FormSingleImage';

interface TrainerFormProps {
  content?: string;
  images?: string[];
  hashTags?: string[];
  useCase: string;
  id?: number;
  title?: string;
}

const TrainerForm: React.FC<TrainerFormProps> = ({
  title,
  content,
  images,
  hashTags,
  useCase,
  id,
}) => {
  const errors = useActionData() as { message: string };

  let method: FormMethod = 'post';
  let action;
  if (useCase === 'create') {
    method = 'post';
    action = '/newpost';
  } else if (useCase === 'update') {
    method = 'put';
    action = '/profile/mypost';
  }

  return (
    <Form
      method={method}
      action={action}
      className="space-y-12 pb-6 pt-4"
      encType="multipart/form-data"
    >
      {errors ? (
        <ErrorMessage className="rounded-md text-lg font-bold">
          {errors?.message}
        </ErrorMessage>
      ) : null}
      <div>
        <PostInput
          spanText="write title"
          htmlFor="title"
          titleText="트레이닝 제목"
        >
          <InputComponent
            placeholder="제목을 입력하세요"
            name="title"
            type="text"
            id="title"
            value={title}
          />
        </PostInput>
      </div>
      <div>
        <input hidden name="id" value={id} />
        <PostInput
          spanText="write content"
          htmlFor="content"
          titleText="트레이닝 내용"
        >
          <TextareaComponent
            placeholder="내용을 입력해 주세요"
            name="content"
            className="h-48"
            id="content"
            value={content}
          />
        </PostInput>
      </div>
      <div>
        <FormSingleImage value={images}>
          트레이너 프로필 이미지(1개 선택)
        </FormSingleImage>
      </div>
      <div>
        <PostInput
          spanText="write keyword"
          htmlFor="hashtag"
          titleText="해시태그"
        >
          <InputComponent
            placeholder="ex) #해시태그"
            name="hashtag"
            type="text"
            id="hashtag"
            value={hashTags?.join(' ')}
          />
        </PostInput>
      </div>
      <div>
        <PostInput
          spanText="write keyword"
          htmlFor="hashtag"
          titleText="해시태그"
        >
          <InputComponent
            placeholder="ex) #해시태그"
            name="hashtag"
            type="text"
            id="hashtag"
            value={hashTags?.join(' ')}
          />
        </PostInput>
      </div>
      <div>
        <PostInput
          spanText="write keyword"
          htmlFor="hashtag"
          titleText="해시태그"
        >
          <InputComponent
            placeholder="ex) #해시태그"
            name="hashtag"
            type="text"
            id="hashtag"
            value={hashTags?.join(' ')}
          />
        </PostInput>
      </div>
      <SubmitButton className="-mt-4 w-2/3 rounded-full py-5 text-2xl font-bold text-main">
        제출하기
      </SubmitButton>
    </Form>
  );
};

export default TrainerForm;
