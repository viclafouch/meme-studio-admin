import React from 'react'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import { Link } from '@tanstack/react-router'
import { LightMeme } from '@viclafouch/meme-studio-utilities/schemas'

export type MemesListItemProps = {
  meme: LightMeme
}

const MemesListItem = ({ meme }: MemesListItemProps) => {
  return (
    <Card sx={{ maxWidth: 345, textDecoration: 'none' }}>
      {/* @ts-expect-error */}
      <CardActionArea component={Link} to={`/memes/${meme.id}`}>
        <CardMedia
          component="img"
          height="140"
          image={meme.imageUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {meme.width}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {meme.width}x{meme.height}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Partager
        </Button>
        {/* @ts-expect-error */}
        <Button
          size="small"
          color="primary"
          LinkComponent={Link}
          to={`/memes/${meme.id}`}
        >
          Modifier
        </Button>
      </CardActions>
    </Card>
  )
}

export default MemesListItem
