import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"

export default function MovieCard({
  title,
  description,
  poster_path,
  vote_average,
}: {
  title: string
  description: string
  poster_path: string
  vote_average: number
}) {
  return (
    <Card sx={{ maxWidth: 345, margin: "10px", borderRadius: "10px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="500"
          image={`https://image.tmdb.org/t/p/w300/${poster_path}`}
          alt="green iguana"
        />
        <CardContent>
          <div
            className="cardTitle"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "left" }}
            >
              {title}
            </Typography>
            <Typography>{vote_average}</Typography>
          </div>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "justify" }}
          >
            {description}
            {/* Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
