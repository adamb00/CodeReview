interface AlertProps {
   message: string;
   type: string;
}

const Alert = ({ message, type }: AlertProps) => {
   return <div className={`alert alert-${type}`}>{message}</div>;
};

export default Alert;
