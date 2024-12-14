interface TableErrorProps {
    message: string;
    onRetry?: () => void;
  }
  
  export default function TableError({ message, onRetry }: TableErrorProps) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-brand-teal hover:text-brand-teal-light"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }