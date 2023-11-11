// Libraries
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

// Utils
import circles from "../../../utils/circles";

const Points = ({ lastCircle, points, setPoints }) => {
  useEffect(() => {
    if (lastCircle) {
      circles.forEach((circle) => {
        if (circle.radius === lastCircle.circleRadius) {
          setPoints((points) => (points += circle.points));
        }
      });
    }
  }, [lastCircle]);

  return <Typography>{points}</Typography>;
};

export default Points;
