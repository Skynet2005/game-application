"use client"
import { Empty } from '@/components/ui/empty';

interface ErrorProps {
  statusCode?: number;
  title?: string;
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ statusCode, title, message }) => {
  return (
    <div>
      {statusCode && <h1>{statusCode}</h1>}
      {title && <h2>{title}</h2>}
      <Empty label={message || "Something went wrong."} />
    </div>
  );
};

export default Error;
