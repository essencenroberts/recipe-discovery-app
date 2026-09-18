

// create errpr message prop
interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div 
      role="alert"
      className="rounded-lg bg-red-50 p-4 text-red-700"
    >
      {message}
    </div>
  );
}

export default ErrorMessage;