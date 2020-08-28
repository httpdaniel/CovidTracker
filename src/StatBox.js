import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./styles/StatBox.scss";

function StatBox({ active, isRed, isOrange, title, figures, total, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`statBox ${active && "statBox--selected"} ${
        isRed && "statBox--isRed"
      }`}
    >
      <CardContent>
        {/* Title */}
        <Typography className="statBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* Figures */}
        <div className="figures">
          <Typography color="textSecondary"></Typography>
          <h2
            id="figuresFont"
            className={`statBox__figures ${
              !isRed && "statBox__figures--green"
            }`}
          >
            {figures}
          </h2>
        </div>

        {/* Total */}
        <Typography className="statBox__total" color="textSecondary">
          <p id="totalFont">Total: {total}</p>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatBox;
