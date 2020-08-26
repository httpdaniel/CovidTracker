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
        <h2 className="statBox__figures">{figures}</h2>

        {/* Total */}
        <Typography className="statBox__total" color="textSecondary">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatBox;
