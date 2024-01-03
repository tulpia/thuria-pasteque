import {
  TableContainer,
  Box,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Typography,
} from "@mui/material";

// Utils
import circles from "../../utils/circles";

const PointsResume = () => {
  return (
    <Box>
      <Typography style={{ fontSize: 18 }}>
        <strong>Points</strong>
      </Typography>
      <TableContainer style={{ marginTop: 30 }}>
        <Table aria-label="simple table">
          <TableBody>
            {circles.map((circle, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{ borderColor: "#12161A", lineHeight: 1 }}
                  component="th"
                  scope="row"
                >
                  <img
                    src={circle.thumb}
                    style={{
                      height: 28,
                      width: 28,
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  />
                </TableCell>
                <TableCell
                  style={{ borderColor: "#12161A", lineHeight: 1 }}
                  align="right"
                >
                  <Typography style={{ color: "white" }}>
                    {circle.points}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PointsResume;
