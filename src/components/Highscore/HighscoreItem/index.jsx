import "./styles.scss";

// Libraries
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const HighscoreItem = ({ index, score }) => {
  const colors = {
    0: "#FEE101",
    1: "#A7A7A7",
    2: "#A77044",
  };

  return (
    <ListItem style={{ paddingRight: 0, paddingLeft: 0 }}>
      <div className={`highscore-item${index < 3 ? " --has-star" : ""}`}>
        <div className="highscore-item__name-container">
          <Typography className="position" variant="body2">
            <i>{index + 1}</i>
          </Typography>
          {index < 3 && (
            <ListItemIcon style={{ marginRight: 15, minWidth: "auto" }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 12.2807V7.59424C1.99713 7.54041 3.89763 6.72303 5.31033 5.31033C6.72303 3.89763 7.54041 1.99713 7.59424 0H12.2682C12.2375 2.49861 11.4459 4.9285 9.99893 6.96575C9.9699 7.01872 9.93633 7.06907 9.8986 7.11624C9.86098 7.17895 9.82156 7.24165 9.78573 7.29182C9.07105 8.23209 8.23209 9.07105 7.29182 9.78573C7.00516 10.0007 6.70418 10.2007 6.3283 10.4386C4.42548 11.6163 2.23765 12.2532 0 12.2807Z"
                  fill={colors[index]}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.321 7.73185C12.3237 7.72767 12.3264 7.72349 12.3291 7.7193L12.3184 7.73185H12.321ZM12.321 7.73185C12.3025 7.76046 12.2842 7.78886 12.2661 7.81705C12.152 7.99428 12.0429 8.16374 11.9156 8.33347L11.8404 8.44634L11.6522 8.70934C10.8088 9.83495 9.80948 10.8348 8.68427 11.6787C8.38364 11.9045 8.04503 12.1424 7.65661 12.3803V20H12.3291V12.4061H19.9255V7.73185H12.321Z"
                  fill={colors[index]}
                />
              </svg>
            </ListItemIcon>
          )}
          <ListItemText
            primary={score.username}
            primaryTypographyProps={{ className: "name" }}
          />
        </div>
        <ListItemText
          primary={score.score}
          primaryTypographyProps={{ className: "score" }}
        />
      </div>
    </ListItem>
  );
};

export default HighscoreItem;
