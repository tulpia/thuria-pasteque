import { useEffect, useState } from "react";

// Utils
import circles from "../../../utils/circles";

const Points = ({ lastCircle }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (lastCircle) {
      circles.forEach((circle) => {
        if (circle.radius === lastCircle.circleRadius) {
          setPoints((points) => (points += circle.points));
        }
      });
    }
  }, [lastCircle]);

  return (
    <p>
      <strong>{points}</strong>
    </p>
  );
};

export default Points;
