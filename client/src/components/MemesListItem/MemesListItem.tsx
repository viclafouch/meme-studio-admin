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
import { Meme } from '../../../../shared/meme.interface'

export type MemesListItemProps = {
  meme: Meme
}

const MemesListItem = ({ meme }: MemesListItemProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {meme.filename}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {meme.width}x{meme.height}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  )
}

export default MemesListItem
