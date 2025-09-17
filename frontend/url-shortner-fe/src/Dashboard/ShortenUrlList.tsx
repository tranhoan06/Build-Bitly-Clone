import React from 'react';
import ShortenItem from './ShortenItem';

type ShortenUrl = {
  id: string;
  shortUrl: string;
  originalUrl: string;
  clickCount: number;
  createdDate: string;
};


type ShortenUrlListProps = {
  data: ShortenUrl[];
};

const ShortenUrlList: React.FC<ShortenUrlListProps> = ({ data }) => {
  return (
    <div className="my-6 space-y-4">
      {data.map((item) => (
        <ShortenItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ShortenUrlList;
