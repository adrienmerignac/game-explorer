import DOMPurify from "dompurify";
const GameDescription: React.FC<{ description: string }> = ({
  description,
}) => (
  <div
    className="game-description"
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
  />
);
export default GameDescription;
