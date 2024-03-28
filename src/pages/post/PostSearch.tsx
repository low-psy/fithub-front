import React from 'react';
import { Form } from 'react-router-dom';
import SearchInput from '../../components/form/SearchInput';

interface PostSearchProps {
  inputChangeHandler: (value: string) => void;
  enteredText: string | undefined;
  clickHandler: (isClick: boolean) => void;
}

const PostSearch: React.FC<PostSearchProps> = ({
  clickHandler,
  enteredText,
  inputChangeHandler,
}) => {
  return (
    <Form method="GET" action="explore">
      <div className="flex h-14 bg-white px-2 shadow-sm drop-shadow-sm">
        <div className=" flex shrink-0 items-center">
          <select name="scope">
            <option value="content" selected>
              내용
            </option>
            <option value="writer">작성자</option>
            <option value="hashTags">해시태그</option>
          </select>
        </div>
        <SearchInput
          onChange={(e) => inputChangeHandler(e.target.value)}
          value={enteredText}
          moduleOnclick={clickHandler}
          placeholder="게시물의 내용, 작성자, 해시태그를 기준으로 검색해 보세요!"
          iconClassName=" text-white rounded-full p-2 bg-accent"
        />
      </div>
    </Form>
  );
};

export default PostSearch;
