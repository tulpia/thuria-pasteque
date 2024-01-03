// Libraries
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

// Utils
import circles from "../../../utils/circles";
import theme from "../../../theme";

const Points = ({ lastCircle, points, setPoints }) => {
  console.log(theme);
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
    <Typography
      style={{
        padding: "15px 30px",
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 10,
        display: "block",
        fontSize: 25,
      }}
    >
      <strong>{points}</strong>
    </Typography>
  );
};

export default Points;
