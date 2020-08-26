import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function HighestStatBox({ title, country, total }) {
  return (
    <Card className="highestStatBox">
      <CardContent>
        {/* Title */}
        <Typography className="highestStatBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* Country */}
        <h2 className="highestStatBox__country">{country}</h2>

        {/* Total */}
        <Typography className="highestStatBox__total" color="textSecondary">
          Total: {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HighestStatBox;
