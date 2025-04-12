import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>401</h1>
      <p>Unauthorized</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default Unauthorized;
