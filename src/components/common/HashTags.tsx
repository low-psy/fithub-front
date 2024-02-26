import React from 'react';

const Hashtags: React.FC<{ hashtags?: string[] }> = ({ hashtags }) => {
  return (
    <div className="flex gap-2">
      {hashtags?.map((hashtag, index) => {
        if (index === 4) {
          return '...';
        }
        if (index > 4) {
          return null;
        }
        return <h3 key={hashtag}>{`#${hashtag}`}</h3>;
      })}
    </div>
  );
};

export default Hashtags;
