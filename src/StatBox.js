import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function StatBox({ title, figures, total }) {
  return (
    <Card className="statBox">
      <CardContent>
        {/* Title */}
        <Typography className="statBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* Figures */}
        <div className="figures">
          <Typography color="textSecondary">Today:</Typography>
          <h2 className="statBox__figures">{figures}</h2>
        </div>

        {/* Total */}
        <Typography className="statBox__total" color="textSecondary">
          Total: {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatBox;
